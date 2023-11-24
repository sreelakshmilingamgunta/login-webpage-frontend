pipeline {
    agent any

    tools { nodejs 'nodejs'}

    stages {
        stage('Checkout') {
            steps {
                // Checkout source code from GitHub
                git  branch: 'main', credentialsId: 'e752a75c-2aec-40db-a72b-494c11dc6bc2' ,url: 'https://github.com/SwathiIndla/login-webpage-frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Build the React application
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // Perform deployment steps (e.g., copying files to a server)
                // Replace this with your actual deployment steps
                sh 'echo "Deploying the application"'
                // Example: sh 'rsync -avz build/ user@your-server:/var/www/html/'
            }
        }
    }

    post {
        success {
            // Actions to perform on successful pipeline execution
            echo 'Pipeline executed successfully!'
        }
        failure {
            // Actions to perform if the pipeline fails
            echo 'Pipeline failed!'
        }
    }
}