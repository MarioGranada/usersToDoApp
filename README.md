# Users To-Do App

A users and tasks application. The UI lists users, lets you add, rename, and remove them, and expands each user into a task list where tasks can be created and moved between "to do" and "done". The API exposes user CRUD plus task create, list-by-user, and update endpoints over Express, backed by a `users_todo` schema in a hosted Supabase Postgres database (originally MongoDB). The UI and the API deploy together as one Vercel project.

## Live demo

| | |
| --- | --- |
| **Live site** | https://users-to-do-app.vercel.app |
| **Repository** | https://github.com/MarioGranada/usersToDoApp |
| **Portfolio summary** | Users and tasks manager in React and Material-UI with expandable per-user task lists, backed by an Express REST API and Supabase Postgres, deployed as one Vercel project. |

The demo is public: anyone can change users and tasks. The data is reset to three sample users with their tasks every night (04:00 UTC).

## Features

- User list with add, rename, and remove (removing a user deletes their tasks).
- Expandable user rows that load that user's tasks on demand.
- Task creation and editing of description and state (`to do` / `done`).
- Material-UI components and SCSS styles.
- Axios service layer for all API calls.
- Input validation on every API mutation.

## Tech stack

| Layer | Technology |
| --- | --- |
| UI | React 16 + Vite 8 |
| UI library | Material-UI 4 + Sass |
| HTTP client | Axios |
| API | Express 5 (Vercel Function in production) |
| Database | Supabase Postgres via postgres.js |
| Hosting | Vercel Services (UI + API in one project), nightly Vercel Cron |
| Tests | Vitest + Testing Library |

## Project structure

```text
usersToDoApp/
├── vercel.json                # Services (users-to-do-ui, users-to-do-api), /api routing, nightly cron
├── package.json               # Convenience scripts (dev:api, dev:ui)
├── users-to-do-api/
│   ├── app.js                 # Express app; every route under /api
│   ├── server.js              # Local dev server (port 3030)
│   ├── db/                    # postgres.js client, schema + seed SQL, reset helper
│   ├── routes/cron.js         # GET /api/cron/reset (needs CRON_SECRET)
│   └── scripts/db.js          # npm run db:migrate | db:reset
└── users-to-do-ui/
    ├── src/
    │   ├── containers/HomeContainer/
    │   ├── shared/components/ # Header, Footer, UserList, TasksList
    │   ├── shared/services/usersToDoAPI/   # Axios client (baseURL /api)
    │   ├── App.jsx
    │   └── App.test.jsx
    └── vite.config.mjs        # Dev proxy: /api -> localhost:3030
```

## Getting started

### Requirements

- Node.js 22 LTS.
- npm (API) and Yarn 1.x (UI); lockfiles are committed for both.
- The Vercel CLI, linked to the project, to pull the database URL (`vercel link`, then `vercel env pull .env.local` in the repo root).
- Two terminals: one for the API and one for the UI.

### 1. Install dependencies

```bash
npm ci --prefix users-to-do-api
yarn --cwd users-to-do-ui install --frozen-lockfile
```

### 2. Configure the database

```bash
vercel env pull .env.local                    # POSTGRES_URL, POSTGRES_URL_NON_POOLING, CRON_SECRET
npm run db:migrate --prefix users-to-do-api   # idempotent: creates the schema and sample data
```

`.env.local` is gitignored. Any Postgres works locally: set `POSTGRES_URL` to it instead.

### 3. Run locally

```bash
npm run dev:api   # API on http://localhost:3030/api
npm run dev:ui    # UI on http://localhost:3001
```

Vite proxies `/api` to the API, so the UI uses the same relative URLs as in production.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev --prefix users-to-do-api` | API with `--watch` on port 3030. |
| `npm run db:migrate --prefix users-to-do-api` | Apply the schema and seed (idempotent). |
| `npm run db:reset --prefix users-to-do-api` | Delete all users and tasks and restore the seed. |
| `yarn --cwd users-to-do-ui dev` | Vite dev server on port 3001. |
| `yarn --cwd users-to-do-ui build` | Production build into `users-to-do-ui/dist`. |
| `yarn --cwd users-to-do-ui test` | Vitest (one run). |
| `yarn --cwd users-to-do-ui lint` | ESLint. |

## How it works

`users-to-do-api/app.js` mounts every route under `/api`:

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/users` | List users. |
| POST | `/api/users` | Create a user (`name`). |
| GET / PUT / DELETE | `/api/users/:userId` | Read, rename, or delete a user (tasks cascade). |
| GET | `/api/tasks/:userId` | List a user's tasks. |
| POST | `/api/tasks` | Create a task (`description`, `userId`, optional `state`). |
| PUT | `/api/tasks/:taskId` | Update a task's description and state. |

Rows are returned with `_id` and `userId` keys, the names the UI was written against when the API used MongoDB. Server errors return a generic message; database errors are only logged on the server.

`App.jsx` composes the header, `HomeContainer`, and footer; `HomeContainer` renders `UserList`, and each `UserItem` expands to a `TaskList` for that user. There is no router or Redux; the app is a single container with props and service calls, as the source comments explain.

## Deployment

- **Live:** https://users-to-do-app.vercel.app
- One Vercel project with two [Services](https://vercel.com/docs/services) defined in `vercel.json`: the UI (Vite static build) and the API (Express as a Vercel Function). `/api/*` routes to the API, everything else to the UI.
- Pushing to `master` deploys production.
- The database comes from the Supabase integration on Vercel, which injects `POSTGRES_URL` into every environment. `CRON_SECRET` protects the reset endpoint.
- A daily Vercel Cron calls `/api/cron/reset` at 04:00 UTC to restore the sample users and tasks.

## Notes and limitations

- There is no authentication: every visitor shares and can change the same data until the nightly reset.
- The UI updates its lists from the values it sent, so after a rename the user moves to the end of the list until reload.
- Material-UI 4 is in maintenance mode; React stays on 16 (classic JSX transform).

---

**Author:** Mario Granada
