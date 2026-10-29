pipeline {
  agent any

  environment {
    AWS_REGION  = 'ap-south-1'
    LAMBDA_NAME = 'YOUR_LAMBDA_FUNCTION_NAME'   // the function name, not the URL path
    IMAGE_NAME  = 'frontend-app'
  }

  triggers { pollSCM('H/2 * * * *') }   // checks the repo every ~2 minutes

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Backend: test') {
      steps {
        dir('backend') {
          sh 'npm ci'
          sh 'npm test'
        }
      }
    }

    stage('Frontend: test') {
      steps {
        dir('frontend') {
          sh 'npm ci'
          sh 'npm test --if-present'
        }
      }
    }

    stage('Frontend: Docker build') {
      steps {
        dir('frontend') {
          sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} -t ${IMAGE_NAME}:latest ."
        }
      }
    }

    stage('Deploy Lambda') {
      when { expression { env.GIT_BRANCH?.endsWith('main') } }
      steps {
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {
          sh '''
            cd backend
            npm ci --omit=dev
            zip -qr ../function.zip . -x "test/*"
            cd ..
            aws lambda update-function-code --function-name $LAMBDA_NAME --zip-file fileb://function.zip --region $AWS_REGION
            aws lambda wait function-updated --function-name $LAMBDA_NAME --region $AWS_REGION
          '''
        }
      }
    }

    stage('Deploy frontend container') {
      when { expression { env.GIT_BRANCH?.endsWith('main') } }
      steps {
        sh "docker rm -f frontend || true"
        sh "docker run -d --name frontend -p 8080:80 ${IMAGE_NAME}:latest"
      }
    }
  }

  post {
    failure { echo 'Pipeline failed, check the stage log above' }
  }
}