# Graph Reporting Tool SYSC 4907 Project

## Heroku Deployment

The working application's progress is available at : https://graphing-report-tool.herokuapp.com/

## Objectives

The objective of this Graph Reporting project is to design and develop a web application that 
- collects the data from the instructors 
- enables the addition of data (for instance obtained via survey) 
- manages the data in a database or in the file system 
- collects course material used by the instructors to produce the data - generates the graphs (for instance using https://www.chartjs.org/) 
- generates the set of general reports for each term (Fall, Winter and Summer), for each GA and for each of the Engineering programs available at Carleton University 
- generates customized reports : each department in the faculty of Engineering should be able to produce reports which compare (multiple) GAs from several terms. The end user should be select the GAs, and the terms 
- enables the use to write conclusions and recommendations in the reports 
- exports the report to pdf or docx (https://github.com/PHPOffice/PHPWord) 
The application should have three sections: 
- one section destined to instructors who upload the data and any other relevant information related to the GAs data they collected 
- one section destined to the departments to generate the reports and to write their recommendations 
- one section destined to administrators (generate list of instructors for each term, send notifications to departments, managing the data, backups ...)

## PERN as the Stack

PostgreSQL

Express.js

React native

Node.js Server



<img src="/images/PERN_webstack.png" width="540" height="720">

## Workflow

Visual Studio code as IDE

Github for version control

Azure CI/CD pipeline

Heroku for deployment and database hosts

![webstack image](/images/Workflow.png)

## Development requirements

- Node.js

Head to the root directory and run :

- npm install

For local development:
- npm start
- node server.js

React app will be hosted on localhost:3000

Express will be hosted on localhost:5000


## Endpoints
All endpoints are currently being worked on.
/test 
/home
/instructors
/faculty
/admin
