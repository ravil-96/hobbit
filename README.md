# Hobbit

Hobbit helps you create healthy routines by helping you set habit goals, track your progress, and then motivating you with streaks.

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

## Technologies

-   Client side: HTML, CSS and JavaScript
    -   Dependencies: html-entities, jest, concurrently, watchify, http-server, jwt-decode
-   Server side: Node.js
    -   Dependencies: cors, express, pg, jest, nodemon, supertest, jwtwebtoken, bcrypt, sql-template-strings

## Process

-   Discussed the plan for our app using the MoSCoW method
-   Used the GitHub project board to split up the required tasks
-   Designed the basic layout of the webapge on Figma
-   
-

## Wins & Challenges

### Wins

-   Well designed webpage that is largely responsive on desktop, mobile and tablet devices
-   Users are able to register for an account and login
-   Password matching function which allows user to see if their password field matches with confirmed password field when registering for an account
-   Core functionalities achieved: users able to specify any habit they want to track and choose the frequency, habits can be marked as completed, users can see their streak count
-   Client sucessfully deployed on Netlify and server on Heroku

### Challenges

-   Integration testing on routes that are protected
-   Issues with deploying to Heroku when API is connected to database
-   Figuring out the best way to implement the streak functionality

## Bugs

-   Sign out button not fixed to the top of habits page (on mobile view)

## Future Features

-   Enforce minimum requirements for passwords (e.g. must be at least 8 chracters and contain at least one number or special character)
-   Send back an error message to the user if their credientials are incorrect when trying to login
-   Users have the ability to change their credentials
-   Send email alerts to remind user to complete habit or if there streak is about to expire
-   Allow users to edit or delete a habit
-   Implement a page for statistics or graphs so that users can visualise progress

## Licence

-   MIT

## Collaborators
[@HeyAero](https://github.com/HeyAero), [@roselynle](https://github.com/roselynle), [@emmanuel-sobamowo](https://github.com/emmanuel-sobamowo), [ravil-96](https://github.com/ravil-96), [FaisalY12](https://github.com/FaisalY12)
