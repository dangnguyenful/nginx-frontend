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
						docker build -t frontend:latest .
					'''
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    sh '''
						
					'''
                }
            }
        }
    }
}