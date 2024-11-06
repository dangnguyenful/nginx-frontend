pipeline {
    agent any
	triggers {
		githubPush() 
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
					apt-get update && apt-get install -y nodejs npm
					npm install
					npm run build
				'''
            }
        }
    }
}