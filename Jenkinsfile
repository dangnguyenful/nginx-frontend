pipeline {
    agent {
		node {
            label 'react-slave'
        }
	}
	triggers {
		githubPush() 
	}
	environment {
		DOCKER_REGISTRY_CREDENTIALS_ID = 'docker-id' 
		TAG = 'latest'
	}
    stages {
		stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/dangnguyenful/nginx-frontend.git'
            }
        }
        stage('Build') {
            steps {
                sh '''
					npm install
					npm run build
				'''
            }
        }
		stage('Build Docker Image') {
            steps {
                script {
                    sh '''
						commit_id=$(git rev-parse HEAD)
						env.TAG = $commit_id
						docker build -t frontend:$commit_id .
						docker tag frontend:$commit_id dangnguyenful/frontend:$commit_id
					'''
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    sh '''
						docker.withRegistry('https://index.docker.io/v1/', DOCKER_REGISTRY_CREDENTIALS_ID) {
							docker.image("dangnguyenful/frontend:${TAG}").push()
						}
					'''
                }
            }
        }
    }
}