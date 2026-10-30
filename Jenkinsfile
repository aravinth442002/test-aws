pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    environment {
        IMAGE_NAME = 'ss-cabs-frontend'
    }

    // Jenkins checks GitHub every ~3 minutes and starts a build when main changes.
    triggers { pollSCM('H/3 * * * *') }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git log -1 --pretty=format:"%h %s (%an)"'
            }
        }

        stage('Backend: install') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Backend: test') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
        }

        stage('Frontend: install') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Frontend: lint') {
            steps {
                dir('frontend') {
                    sh 'npm run lint'
                }
            }
        }

        stage('Frontend: build') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
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
    }

    post {
        success {
            echo "Build ${BUILD_NUMBER} of ${IMAGE_NAME} succeeded for ${GIT_COMMIT?.take(7)}"
        }
        failure {
            echo 'Pipeline failed, check the stage log above'
        }
        cleanup {
            sh 'docker image prune -f --filter "until=24h" || true'
        }
    }
}
