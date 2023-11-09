# Hobbit

[![Netlify Status](https://api.netlify.com/api/v1/badges/054b8791-6392-4eed-baae-0ae67f016a4b/deploy-status)](https://app.netlify.com/sites/hobbit/deploys)
![Heroku](https://heroku-badge.herokuapp.com/?app=hobbit-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![](demo.gif)

Studies show that it takes 21 days to form a habit. Hobbit helps you to create these healthy routines and turn them into hobbies by allowing you to set habit goals, track your progress, and then motivating you with streaks. Users are able to register for a Hobbit account; upon login they are able to access their dashboard where they can add a customised habit, mark as complete for the day/week (depending on chosen frequency) and see their most recent completion streaks.

### Installation

-   Clone or download this repo

### Usage

-   Navigate to the root directory of this repository
-   Ensure docker desktop app is running
-   In your terminal run `bash _scripts/startDev.sh` to start the client, apit and database containers
    -   Access: client on localhost:8080/ and server on localhost:3000/
-   Run `bash _scripts/startTest.sh` to start up the api and database tests
-   Run `bash _scripts/stop.sh` to close the containers
-   Run `bash _scripts/teardown.sh` to teardown the containers completely and remove all artifacts

**_Do not run both dev and test environments at the same time._**

## Technologies

-   Client side: HTML, CSS and JavaScript
    -   Dependencies: html-entities, jest, concurrently, watchify, http-server, jwt-decode
-   Server side: Node.js
    -   Dependencies: cors, express, pg, jest, nodemon, supertest, jwtwebtoken, bcrypt, sql-template-strings

## Process

-   Discussed the plan for our app using the MoSCoW method
-   Used the GitHub project board to split up the required tasks and assign to team members
-   Designed the basic layout of the webpage on Figma
-   Set up the file structure, initialised database and configured the docker containers/script files
-   Implemented basic CRUD functionality which involved querying the database (although delete function not used in the end due to time limitations)
-   Tested the functionalities of the app (client and server side) and debugged any issues we came across
-   Added styling to improve user interface of the app

## Wins & Challenges

### Wins

-   Well designed webpage that is largely responsive on desktop, mobile and tablet devices
-   Use of JWT web tokens allowing users to register for an account and login
-   Password matching function which allows user to see if their password field matches with confirmed password field when registering for an account
-   Core functionalities achieved: users able to specify any habit they want to track and choose the frequency, habits can be marked as completed, users can see their streak count
-   Client deployed on Netlify and server on Heroku. In addition there is successful communication between client and server

### Challenges

-   Integration testing on routes that are protected
-   Issues with deploying to Heroku when API is connected to database
-   Figuring out the best way to implement the streak functionality

## Bugs

-   Sign out button not fixed to the top of habits page (on mobile view)

## Future Features

-   Enforce minimum requirements for passwords (e.g. must be at least 8 characters and contain at least one number or special character)
-   Send back an error message to the user if their credientials are incorrect when trying to login
-   Users have the ability to change their credentials
-   Send email alerts to remind user to complete habit or if there streak is about to expire
-   Allow users to edit or delete a habit
-   Implement a page for statistics or graphs so that users can visualise progress

## Licence

-   MIT

## Collaborators

[@HeyAero](https://github.com/HeyAero), [@roselynle](https://github.com/roselynle), [@emmanuel-sobamowo](https://github.com/emmanuel-sobamowo), [ravil-96](https://github.com/ravil-96), [FaisalY12](https://github.com/FaisalY12)
