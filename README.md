# [Cyber Security Base 2023](https://cybersecuritybase.mooc.fi/module-3.1)
## Project description
***"In the first course project, your task is to create a web application that has at least five different flaws from the [OWASP](https://owasp.org/www-project-top-ten/) top ten list as well as their fixes. The application should have a backend."***

The project is written in Typescript where the backend is created using Express.js and the client is created with React.js.

## Getting started
You can start the app with command: ```docker-compose up```.  
**Note:** Ensure that Docker is installed on your system.

## Client
You can open the React UI by going to ```localhost:3000``` in your browser.

## Server
The server will start on ```localhost:8080``` and the next endpoints are available:  

| HTTP Method | Endpoint | Description |
|-------------|----------|-------------|
| GET         | /api/users      | Get all users  |
| POST        | /api/users      | Create a new user  |
| GET         | /api/users/:id  | Get a specific user |  
| GET         | /api/comments   | Get all comments  |
| POST        | /api/comments   | Create new comment  |
| DELETE      | /api/comments   | Delete all comments |  
| GET         | /api/auth/me    | Find user by JWT token  |
| GET         | /api/auth/admin | Get sensitive admin data  |
| POST        | /api/auth/login | Login / Generate JWT token  |
