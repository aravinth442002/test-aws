import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const s3 = new S3Client({ region: "us-east-1" });
const BUCKET_NAME = "image-storage-vault-us-east-1-01"; // Check your S3 bucket name

function parseMultipart(bodyBuffer, boundary) {
  const delimiter = Buffer.from(`--${boundary}`);
  const crlf = Buffer.from("\r\n\r\n");
  let pos = 0;

  while ((pos = bodyBuffer.indexOf(delimiter, pos)) !== -1) {
    pos += delimiter.length;
    if (bodyBuffer.slice(pos, pos + 2).toString() === "--") break;
    if (bodyBuffer.slice(pos, pos + 2).toString() === "\r\n") pos += 2;

    const headerEnd = bodyBuffer.indexOf(crlf, pos);
    if (headerEnd === -1) break;

    const headerText = bodyBuffer.slice(pos, headerEnd).toString("latin1");
    const contentStart = headerEnd + 4;
    const nextDelimiter = bodyBuffer.indexOf(delimiter, contentStart);
    const contentEnd = nextDelimiter !== -1 ? nextDelimiter - 2 : bodyBuffer.length;

    const filenameMatch = headerText.match(/filename="([^"]+)"/i);
    const contentTypeMatch = headerText.match(/Content-Type:\s*([^\r\n]+)/i);

    if (filenameMatch) {
      return {
        fileName: filenameMatch[1],
        contentType: contentTypeMatch ? contentTypeMatch[1].trim() : "image/jpeg",
        fileBuffer: bodyBuffer.slice(contentStart, contentEnd),
      };
    }
    pos = contentEnd;
  }
  return null;
}

export const handler = async (event) => {
  const method = (
    event.requestContext?.http?.method ||
    event.httpMethod ||
    "GET"
  ).toUpperCase();

  const rawPath = event.rawPath || event.path || "";
  const segments = rawPath.split("/").filter(Boolean);

  const imagesIdx = segments.indexOf("images");
  const hasImagesKeyword = imagesIdx !== -1;

  let imageId = null;
  if (hasImagesKeyword && segments[imagesIdx + 1]) {
    imageId = segments[imagesIdx + 1];
  } else if (!hasImagesKeyword && segments.length > 2) {
    imageId = segments[segments.length - 1];
  }

  const jsonHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "*",
  };

  if (method === "OPTIONS") {
    return { statusCode: 200, headers: jsonHeaders, body: "" };
  }

  // ---------------------------------------------------------------------------
  // 1. POST /images (Upload Image -> returns JSON list/object metadata)
  // ---------------------------------------------------------------------------
  if (method === "POST" && !imageId) {
    try {
      const rawContentType = Object.entries(event.headers || {}).find(
        ([k]) => k.toLowerCase() === "content-type"
      )?.[1] || "";

      let fileBuffer = null;
      let contentType = "image/jpeg";
      let originalName = "uploaded-image";
      let ext = "jpg";

      const rawBodyBuffer = event.isBase64Encoded
        ? Buffer.from(event.body, "base64")
        : Buffer.from(event.body || "", "latin1");

      if (rawContentType.includes("multipart/form-data")) {
        const boundaryMatch = rawContentType.match(/boundary=([^;]+)/i);
        if (!boundaryMatch) {
          return {
            statusCode: 400,
            headers: jsonHeaders,
            body: JSON.stringify({ error: "Missing multipart boundary in Content-Type." }),
          };
        }
        const boundary = boundaryMatch[1].trim().replace(/^["']|["']$/g, "");
        const parsed = parseMultipart(rawBodyBuffer, boundary);

        if (!parsed || !parsed.fileBuffer || parsed.fileBuffer.length === 0) {
          return {
            statusCode: 400,
            headers: jsonHeaders,
            body: JSON.stringify({ error: "No image file detected under field 'file'." }),
          };
        }

        fileBuffer = parsed.fileBuffer;
        contentType = parsed.contentType;
        originalName = parsed.fileName;
        ext = originalName.includes(".") ? originalName.split(".").pop().toLowerCase() : "jpg";
      } else {
        fileBuffer = rawBodyBuffer;
        if (rawContentType.includes("png")) {
          contentType = "image/png";
          ext = "png";
        } else if (rawContentType.includes("webp")) {
          contentType = "image/webp";
          ext = "webp";
        } else {
          contentType = "image/jpeg";
          ext = "jpg";
        }
        originalName = `upload.${ext}`;
      }

      if (!fileBuffer || fileBuffer.length === 0) {
        return {
          statusCode: 400,
          headers: jsonHeaders,
          body: JSON.stringify({ error: "The received image file was empty." }),
        };
      }

      const uniqueId = randomUUID();
      const finalFileName = `${uniqueId}.${ext}`;
      const s3Key = `images/${finalFileName}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: s3Key,
          Body: fileBuffer,
          ContentType: contentType,
          Metadata: {
            "unique-id": uniqueId,
            "original-name": encodeURIComponent(originalName),
          },
        })
      );

      return {
        statusCode: 201,
        headers: jsonHeaders,
        body: JSON.stringify({
          message: "Image stored successfully!",
          id: uniqueId,
          fileName: finalFileName,
          originalName: originalName,
          contentType: contentType,
          s3Key: s3Key,
        }),
      };
    } catch (err) {
      console.error("Upload error:", err);
      return {
        statusCode: 500,
        headers: jsonHeaders,
        body: JSON.stringify({ error: err.message }),
      };
    }
  }

  // ---------------------------------------------------------------------------
  // 2. GET /images (Get All Images -> returns JSON list)
  // ---------------------------------------------------------------------------
  if (method === "GET" && !imageId) {
    try {
      const data = await s3.send(
        new ListObjectsV2Command({
          Bucket: BUCKET_NAME,
          Prefix: "images/",
        })
      );

      const items = (data.Contents || [])
        .filter((obj) => !obj.Key.endsWith("/"))
        .map((obj) => {
          const fileName = obj.Key.replace("images/", "");
          const id = fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
          return {
            id,
            fileName,
            sizeBytes: obj.Size,
            lastModified: obj.LastModified,
          };
        });

      return {
        statusCode: 200,
        headers: jsonHeaders,
        body: JSON.stringify({
          totalImages: items.length,
          images: items,
        }),
      };
    } catch (err) {
      return {
        statusCode: 500,
        headers: jsonHeaders,
        body: JSON.stringify({ error: err.message }),
      };
    }
  }

  // ---------------------------------------------------------------------------
  // 3. GET /images/{id} (Get Image by ID -> returns RAW IMAGE FILE)
  // ---------------------------------------------------------------------------
  if (method === "GET" && imageId) {
    try {
      // Find matching key in S3
      const listData = await s3.send(
        new ListObjectsV2Command({
          Bucket: BUCKET_NAME,
          Prefix: `images/${imageId}`,
        })
      );

      const fileObj = (listData.Contents || []).find((obj) => !obj.Key.endsWith("/"));
      if (!fileObj) {
        return {
          statusCode: 404,
          headers: jsonHeaders,
          body: JSON.stringify({ error: `Image not found with ID '${imageId}'` }),
        };
      }

      // Download file from S3
      const getRes = await s3.send(
        new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: fileObj.Key,
        })
      );

      const byteArray = await getRes.Body.transformToByteArray();
      const base64Data = Buffer.from(byteArray).toString("base64");
      const contentType = getRes.ContentType || "image/jpeg";

      // Return raw image response
      return {
        statusCode: 200,
        isBase64Encoded: true,
        headers: {
          "Content-Type": contentType,
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=86400",
        },
        body: base64Data,
      };
    } catch (err) {
      return {
        statusCode: 500,
        headers: jsonHeaders,
        body: JSON.stringify({ error: err.message }),
      };
    }
  }

  return {
    statusCode: 405,
    headers: jsonHeaders,
    body: JSON.stringify({ error: "Method not allowed" }),
  };
};