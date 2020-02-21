User To Do App
==============

### Important disclaimer
Main code is at `develop` branch which is intended to be merged into `master` at a given tag/version point as per any real product project scenario.

## Requirements

* MongoDB instance up and running. For any reference please follow [MongoDB environment set up](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/).

* Node v13.8.0 or similar

* NPM 6.13.7 or yarn

## Running steps

In the root folder, please run:

### npm install
Installs root dependencies that are required in order to run both server and client apps.

#### cd users-to-do-api && npm install
Navigates through server app and installs all its dependencies

#### cd users-to-do-ui && npm install
Navigates through client app and installs all its dependencies

### npm run dev
Runs both server and client concurrently at the same time. No need to navigate through respective folders and start them up.

Alternatively, you can run in the this order:

#### cd users-to-do-api && npm start 
Navigates through server app and starts it up

#### cd users-to-do-ui && npm start 
Navigates through client app and starts it up

API app runs in the development mode at:<br />
[http://localhost:3030](http://localhost:3030).

There are serveral tools such as postman and jmeter which you can use in order to test up and do some playground with the given endpoints at the server. Feel free to use the tool of your preference.

UI app runs in the development mode at:<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Both app will reload if you make edits in any of them.<br />

## Addittional Available Scripts for the UI

### `yarn test`
Launches the test runner.

### `yarn test --u --watch`
Launches the test runner in watch mode.

## API Endpoints Overview

| Prefix        | Verb   | URI Pattern                              | Controller#Action            |
----------------|--------|------------------------------------------|------------------------------|
| users         | GET    | /users(.:format)                         | userController#listUsers     |
|               | POST   | /users(.:format)                         | userController#createUser    |
|               | GET    | /users/:id(.:format)                     | users#getUserById            |
|               | PUT    | /users/:id(.:format)                     | users#updateUser             |
|               | DELETE | /users/:id(.:format)                     | users#removeUser             |
| tasks         | POST   | /tasks/(.:format)                        | tasks#createTaskByUserId     |
|               | GET    | /tasks/:userId(.:format)                 | tasks#listTasksByUserId      |
|               | PUT    | /tasks/:taskId(.:format)                 | tasks#updateTask             |

**Author:** Mario Granada
