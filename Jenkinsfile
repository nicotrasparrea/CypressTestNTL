pipeline{

    agent any

    parameters{
        // string(name: 'SPEC', defaultValue: "/**", description: "Enter the script path you want to execute")
        choice(name: 'BROWSER', choices: ['chrome', 'edge', 'firefox'], description: "Choose the browser in which you want to run the tests")
    }

// org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:
// WorkflowScript: 11: Invalid option type "ansiColor"
    // options{ 
    //     ansiColor('xterm')
    // }

    stages{
        stage('Bulding'){
            steps{
                echo "Building the application"

                echo "Deleting previous reports"
                bat "npm run allure:clear"
            }
        }
        stage('Testing'){
            steps{
                bat "npm i"
                // bat "npx cypress run --browser ${BROWSER} --spec ${SPEC} --env allure=true,allureReuseAfterSpec=true"
                                bat "npx cypress run --browser ${BROWSER} --env allure=true,allureReuseAfterSpec=true"
            }
        }
        stage('Deploying'){
            steps{
                echo "Deploying the application"
            }
        }
    }

    post {
        always {
            bat "npm run allure:report"
            publisHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'allure-report', reportFiles: 'index.html', reportName: 'HTML report', reportTitles: ''])
        }
    }
}