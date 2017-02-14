pipeline {
  agent any
  environment {
    production_env = credentials('production.env')
  }
  stages {
    stage('Provision') {
      steps {
        sh "cp ${env.production_env} .env"
        sh 'chmod 644 .env'
      }
    }
    stage('Build') {
      steps {
        sh 'yarn'
      }
    }
    stage('Migrate') {
      steps {
        sh 'npm run build-env'
        sh 'source bash.env && npm run migrate'
      }
    }
  }
  post {
    failure {
      slackSend channel: '#ops',
        color: 'RED',
        message: "Oops! ${currentBuild.fullDisplayName} failed to migrate: ${env.BUILD_URL}"
    }
    success {
      slackSend channel: '#ops',
        color: 'good',
        message: "THIS JUST IN... ${currentBuild.fullDisplayName} finished migration: ${env.BUILD_URL}"
    }
    always {
      echo 'The End'
      deleteDir()
    }
  }
}
