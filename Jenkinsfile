pipeline {
  agent any

  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/wajiha787/MERN-TODO-app.git'
      }
    }

    stage('Build & Run') {
      steps {
        sh 'docker compose down || true'
        sh 'docker compose up --build -d'
      }
    }
  }
}
