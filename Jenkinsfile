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
						commit_id=$(git rev-parse HEAD)
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
						docker push dangnguyenful/frontend:$commit_id
					'''
                }
            }
        }
    }
}