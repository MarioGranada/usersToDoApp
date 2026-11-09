# AGENTS.md — Users To-Do App

Compact guide for future OpenCode sessions. It records only the facts an agent is likely to miss or get wrong.

## Quickstart

| Command | Description |
| --- | --- |
| `git checkout develop` | Switch to the implemented branch. |
| `npm install && (cd users-to-do-api && npm install) && (cd users-to-do-ui && npm install)` | Install root, API, and UI dependencies. |
| `mongod` | Start MongoDB locally (or use a service). |
| `npm run dev` | Run the API on 3030 and the UI on 3000. |

## Requirements

- Node.js 14 or 16 recommended; CRA 3, `node-sass` 4, and Mongoose 5 are legacy and may fail on current Node versions.
- npm or Yarn 1.x.
- A running MongoDB instance at `mongodb://localhost/usersToDoApp` (or an updated connection string).
- The `develop` branch checked out; `master` does not contain the implemented UI or the root scripts.

## Environment

- No environment variables are used. MongoDB and the API URL are hardcoded.
- Use Node 14 or 16 if `node-sass` fails to build.
- Never commit real database contents or credentials.

## Architecture

- `users-to-do-api/server.js` — Express bootstrap and Mongo connection.
- `users-to-do-api/api/routes/` — user and task route maps.
- `users-to-do-api/api/controllers/` — request handlers.
- `users-to-do-api/api/models/` — Mongoose schemas.
- `users-to-do-ui/src/containers/HomeContainer/` — page composition.
- `users-to-do-ui/src/shared/services/usersToDoAPI/` — Axios client.

## Commands and build order

- Check out `develop` before doing anything; `master` is a scaffold.
- Start MongoDB before the API, or every request fails to connect.
- Use `npm run dev` at the root on `develop` to run both apps.

## Conventions and gotchas

- The root `package.json` exists only on `develop`.
- The API port is 3030 on `develop` but 3000 on `master`; the UI expects 3030.
- CRA 3 and `node-sass` 4 may need an older Node version.
- The UI is a single container; there is no router or global store to extend casually.
- Deleting a user does not cascade-delete their tasks.

## Memory

- Read `MEMORY.md` first to understand the current status and decisions.
- Before changing behaviour, read `constitution.md` and keep the change aligned with it.
- After a task, update `MEMORY.md` with status, decisions, and mistakes to avoid. Keep it short.
- If a rule becomes permanent, move it into this file instead of leaving it in memory.
- Never store secrets, tokens, or personal data in `MEMORY.md`.
