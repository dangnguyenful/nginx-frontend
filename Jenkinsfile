pipeline {
    agent {
		node {
            label 'build-slave'
        }
	}
	triggers {
		githubPush() 
	}
	environment { 
        DOCKER_REGISTRY = 'dangnguyenful'
		DOCKER_REGISTRY_CREDENTIALS_ID = 'docker-id' 
	}
    stages {
        stage('Checkout') {
            parallel {
                stage('Checkout FE') {
                    steps {
                        dir('FE') {
                            git branch: 'main', url: 'https://github.com/dangnguyenful/nginx-frontend.git'
                        }
                    }
                }
                stage('Checkout BE') {
                    steps {
                        dir('BE') {
                            git branch: 'main', url: 'https://github.com/dangnguyenful/nginx-backend.git'
                        }
                    }
                }
            }
        }
		stage('Login to Docker Registry') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_REGISTRY_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
						sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
                    }
                }
            }
        }
        stage('Build') {
            parallel {
                stage('Build FE') {
                    steps {
                        dir('FE') {
                            sh '''
                                npm install
                                npm run build
                            '''
                        }
                    }
                }
                stage('Build BE') {
                    steps {
                        dir('BE') {
                            sh '''
                                chmod +x ./mvnw
                                ./mvnw dependency:go-offline
                                ./mvnw package
                            '''
                        }
                    }
                }
            }
        } 
		stage('Build Docker Image') {
            parallel {
                stage('Build Docker Image FE') {
                    steps {
                        dir('FE') {
                            sh '''
                                commit_id=$(git rev-parse --short HEAD)
                                docker build -t frontend:$commit_id .
                                docker tag frontend:$commit_id dangnguyenful/frontend:$commit_id
                            '''
                        }
                    }
                }
                stage('Build Docker Image BE') {
                    steps {
                        dir('BE') {
                            sh '''
                                commit_id=$(git rev-parse --short HEAD)
                                docker build -t backend:$commit_id .
                                docker tag backend:$commit_id dangnguyenful/backend:$commit_id
                            '''
                        }
                    }
                }
            }
        }
        stage('Push Docker Image') {
            parallel {
                stage('Build FE') {
                    steps {
                        dir('FE') {
                            sh '''
                                commit_id=$(git rev-parse HEAD)
                                docker push dangnguyenful/frontend:$commit_id
                            '''
                        }
                    }
                }
                stage('Build BE') {
                    steps {
                        dir('BE') {
                            sh '''
                                commit_id=$(git rev-parse HEAD)
                                docker push dangnguyenful/backend:$commit_id
                            '''
                        }
                    }
                }
            }
        }
    }
}
