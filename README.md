# Users To-Do App

A MERN-style users and tasks application. The API exposes user CRUD plus task create, list-by-user, and update endpoints over Express and Mongoose; the UI lists users, creates tasks for a selected user, and updates task state.

The `master` branch is a scaffold: its UI is still the default Create React App screen. The implemented application lives on the `develop` branch, which the repository README calls the main branch. Check out `develop` before running the app.

## Features

- User list, create, read, update, and delete endpoints.
- Task creation, listing by user, and update endpoints.
- React UI with a header, user list, task list, and footer.
- Material UI components and SCSS styles.
- Axios service layer for all API calls.
- Concurrent root script for API and UI during development.
- Mongoose models for users and tasks with references.
- Nodemon-based API development server.

## Tech stack

| Layer | Technology |
| --- | --- |
| UI | React 16 (Create React App 3) |
| UI library | Material UI 4 + node-sass |
| HTTP client | Axios |
| API | Express 4 |
| Database | MongoDB + Mongoose 5 |
| Tooling | nodemon + concurrently |

## Project structure

```text
usersToDoApp/                  # master = scaffold; origin/develop = implementation
├── package.json               # Only on develop: client, server, dev scripts
├── users-to-do-api/
│   ├── server.js              # Express app (port 3030 on develop)
│   ├── api/
│   │   ├── controllers/       # userController, taskController
│   │   ├── models/            # userModel, taskModel
│   │   └── routes/            # index, userRoutes, taskRoutes
│   └── package.json
└── users-to-do-ui/
    ├── src/
    │   ├── containers/HomeContainer/
    │   ├── shared/components/ # Header, Footer, UserList, TasksList
    │   ├── shared/services/usersToDoAPI/
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Getting started

### Requirements

- Node.js 14 or 16 recommended; CRA 3, `node-sass` 4, and Mongoose 5 are legacy and may fail on current Node versions.
- npm or Yarn 1.x.
- A running MongoDB instance at `mongodb://localhost/usersToDoApp` (or an updated connection string).
- The `develop` branch checked out; `master` does not contain the implemented UI or the root scripts.

### 1. Install dependencies

```bash
git checkout develop        # or: git checkout -b develop origin/develop
npm install                 # root: concurrently
cd users-to-do-api && npm install
cd ../users-to-do-ui && npm install
```

### 2. Run locally

**Start both apps from the root (develop)**

```bash
npm run dev
```

Runs the API on port 3030 and the CRA UI on port 3000.

**Or start them separately**

```bash
cd users-to-do-api && npm start
```

Open http://localhost:3030.

Run `cd users-to-do-ui && npm start` in a second terminal for the UI at http://localhost:3000.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run API and UI together (develop root only). |
| `npm run server` | Start the API through the root script (develop only). |
| `npm run client` | Start the UI through the root script (develop only). |
| `cd users-to-do-api && npm start` | Start nodemon and the Express API. |
| `cd users-to-do-ui && npm start` | Start CRA on port 3000. |
| `cd users-to-do-ui && npm run build` | Create a production UI build. |
| `cd users-to-do-ui && npm test` | Run the CRA test runner. |

## How it works

`users-to-do-api/server.js` connects Mongoose to `mongodb://localhost/usersToDoApp`, applies CORS and body parsing, registers the combined routes, and listens on `process.env.PORT || 3030` on `develop` (3000 on `master`).

`api/routes/userRoutes.js` maps `/users` CRUD to `userController`; `api/routes/taskRoutes.js` maps task creation, listing by user, and update to `taskController`.

`userModel` stores a name and an array of task references; `taskModel` stores a description, a user reference, and a `state` array constrained to `to do` or `done`.

The UI’s `shared/services/usersToDoAPI/usersToDoAPI.js` creates an Axios instance with `baseURL: "http://localhost:3030/"` and exports one function per endpoint.

`App.js` composes the header, `HomeContainer`, and footer; `HomeContainer` renders `UserList`, and each `UserItem` expands to a `TaskList` for that user. There is no router or Redux; the app is a single container with props and service calls, as the source comments explain.

## Deployment

- Target: GitHub Actions can build the CRA UI and publish `build/` to GitHub Pages.
- The API needs a Node host and MongoDB Atlas, or replacement with Supabase. Local MongoDB is not reachable from a deployed frontend.
- Move the Mongo connection string and the Axios `baseURL` into environment variables before deploying.
- The UI is a CRA SPA; a static host needs SPA fallback only if routing is added later.

## Notes and limitations

- `master` is not the implemented app: the UI is the default CRA screen and there is no root `package.json`. Use `origin/develop`.
- The API port differs by branch: 3030 on `develop`, 3000 on `master`. The UI service points at 3030.
- `node-sass` 4 and CRA 3 are legacy and often fail to install on modern Node versions.
- Mongoose 5 connection options in `develop` are deprecated in newer MongoDB drivers.
- There are no environment variables; the Mongo URI and API URL are hardcoded.
- The UI has only the default CRA test.

---

**Author:** Mario Granada
