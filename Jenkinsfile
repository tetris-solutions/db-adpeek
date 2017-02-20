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
      when { environment name: 'DB_OP', value: 'migrate' }
      steps {
        sh 'npm run migrate'
      }
    }
    stage('Seed') {
      when { environment name: 'DB_OP', value: 'seed' }
      steps {
        sh 'npm run seed'
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
