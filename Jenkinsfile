pipeline {
    agent any

    tools { nodejs 'node26' }   // must match the Name in Manage Jenkins → Tools

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
        timeout(time: 20, unit: 'MINUTES')
        timestamps()
    }

    environment {
        IMAGE_NAME = 'ss-cabs-frontend'
        APP_PORT   = '3010'
        CI         = 'true'
        AWS_REGION = 'us-east-1'
        API_URL    = ' https://hie94mw2ae.execute-api.us-east-1.amazonaws.com/default/imageHandlerFunctionTwo/{proxy+}'
    }

    triggers { pollSCM('H/1 * * * *') }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git log -1 --pretty=format:"%h %s (%an)"'
                sh 'node -v && npm -v && docker --version'
            }
        }

        stage('Backend: install') {
            steps { dir('backend') { sh 'npm ci' } }
        }

        stage('Backend: test') {
            steps { dir('backend') { sh 'npm test' } }
        }

        stage('Frontend: install') {
            steps { dir('frontend') { sh 'npm ci' } }
        }

        stage('Frontend: lint') {
            steps { dir('frontend') { sh 'npm run lint' } }
        }

        stage('Frontend: build') {
            steps { dir('frontend') { sh 'npm run build' } }
        }

        stage('Frontend: Docker build') {
            steps {
                dir('frontend') {
                    sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Deploy') {
            when { expression { env.GIT_BRANCH == 'origin/main' } }
            steps {
                sh '''
                    docker rm -f ${IMAGE_NAME} || true
                    docker run -d --name ${IMAGE_NAME} --restart unless-stopped \
                      -p 127.0.0.1:${APP_PORT}:80 ${IMAGE_NAME}:${BUILD_NUMBER}
                    sleep 5
                    curl -fsS http://127.0.0.1:${APP_PORT}/ > /dev/null
                '''
            }
        }

        stage('Deploy Lambda') {
            when { expression { env.GIT_BRANCH == 'origin/main' } }
         steps {
        dir('backend') {
            sh '''
                rm -f function.zip
                npm ci --omit=dev
                zip -qr function.zip . -x "*.test.js" "test/*" "*.zip"
            '''
            withCredentials([usernamePassword(credentialsId: 'aws-lambda-deployer',
                             usernameVariable: 'AWS_ACCESS_KEY_ID',
                             passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                sh '''
                    export AWS_DEFAULT_REGION=${AWS_REGION}
                    aws lambda update-function-code \
                      --function-name imageHandlerFunction \
                      --zip-file fileb://function.zip --publish
                    aws lambda wait function-updated --function-name imageHandlerFunction
                '''
            }
            sh 'curl -fsS -X OPTIONS "${API_URL}" -o /dev/null'   // smoke test (CORS preflight)
        }
    }
}
    }

    post {
        success { echo "Build ${BUILD_NUMBER} of ${IMAGE_NAME} succeeded for ${env.GIT_COMMIT?.take(7)}" }
        failure { echo 'Pipeline failed, check the stage log above' }
        cleanup { sh 'docker image prune -f --filter "until=24h" || true' }
    }
}