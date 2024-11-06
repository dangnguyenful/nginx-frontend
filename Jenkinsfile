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
		DOCKER_IMAGE = 'dangnguyenful/frontend:latest' 
		DOCKER_REGISTRY_CREDENTIALS_ID = 'docker-registry-credentials' 
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
                    docker.build(DOCKER_IMAGE)
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_REGISTRY_CREDENTIALS_ID) {
                        docker.image(DOCKER_IMAGE).push()
                    }
                }
            }
        }
    }
}