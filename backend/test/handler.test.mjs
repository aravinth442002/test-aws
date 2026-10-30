import test from "node:test";
import assert from "node:assert/strict";

import { handler } from "../index.mjs";

const event = (method, path = "/") => ({
  requestContext: { http: { method } },
  rawPath: path,
  headers: {},
  body: null,
});

test("OPTIONS preflight returns 200 with CORS headers", async () => {
  const res = await handler(event("OPTIONS"));

  assert.equal(res.statusCode, 200);
  assert.equal(res.headers["Access-Control-Allow-Origin"], "*");
});

test("unsupported method returns 405", async () => {
  const res = await handler(event("DELETE"));

  assert.equal(res.statusCode, 405);
  assert.match(res.body, /Method not allowed/);
});

test("POST with a non-multipart body and no data returns 400", async () => {
  const res = await handler({ ...event("POST"), body: "" });

  assert.equal(res.statusCode, 400);
  assert.match(res.body, /empty/i);
});
