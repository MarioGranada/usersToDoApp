# AGENTS.md — Users To-Do App

Compact guide for future OpenCode sessions. It records only the facts an agent is likely to miss or get wrong.

## Quickstart

| Command | Description |
| --- | --- |
| `vercel env pull .env.local` | Pull `POSTGRES_URL` and `CRON_SECRET` into the gitignored root `.env.local`. |
| `npm ci --prefix users-to-do-api && npm run db:migrate --prefix users-to-do-api` | Install the API and apply the idempotent schema + seed. |
| `npm run dev:api` | Run the API on port 3030 (routes under `/api`). |
| `yarn --cwd users-to-do-ui install --frozen-lockfile && npm run dev:ui` | Run the UI on port 3001; Vite proxies `/api`. |
| `yarn --cwd users-to-do-ui test && yarn --cwd users-to-do-ui lint && yarn --cwd users-to-do-ui build` | The gates. |

## Requirements

- Node.js 22 LTS (`users-to-do-api/package.json` pins `22.x` for the Vercel Function).
- npm for the API, Yarn 1.x for the UI (lockfiles committed).

## Environment

- `POSTGRES_URL` (transaction pooler) and `POSTGRES_URL_NON_POOLING` come from the Supabase integration on Vercel. `CRON_SECRET` protects `/api/cron/reset`. Locally they live in the root `.env.local` (gitignored); API scripts load it with `--env-file-if-exists=../.env.local`.
- The UI calls the same-origin `/api`; there is no API URL variable.
- Never commit `.env*` files (except `.env.example`), `.vercel/`, database URLs, or credentials.

## Architecture

- `vercel.json` — Vercel Services: `frontend` (root `users-to-do-ui`, Vite) and `backend` (root `users-to-do-api`, Express); `/api/*` → API; nightly cron.
- `users-to-do-api/app.js` — every route (users, tasks, cron) under `/api`; exported for Vercel, `server.js` only listens locally.
- `users-to-do-api/db/sql.js` — schema + seed and reset SQL (in JS so the function bundle includes it); `db/seed.js` applies them.
- `users-to-do-ui/src/containers/HomeContainer/` — page composition.
- `users-to-do-ui/src/shared/services/usersToDoAPI/` — Axios client (`baseURL: '/api'`).

## Conventions and gotchas

- `master` holds the real app since 2026-11-12 (the old `develop` branch was merged into the Vite migration).
- API rows use `_id` and `userId` (legacy MongoDB names the UI depends on); keep them.
- Deleting a user cascades to their tasks (foreign key).
- React 16.12 has no `react/jsx-runtime`: the Vite React plugin uses `jsxRuntime: 'classic'`, and every JSX file imports React.
- Testing Library is v9: no `waitFor`, no `name` option on `getByRole`; use `findBy*` and text queries.
- Every API route lives under `/api`, because Vercel passes the original path to the backend service.
- Do not read files at runtime in the API; keep `prepare: false` in `db/index.js`.
- The database is shared with other portfolio apps; only touch the `users_todo` schema.

## Memory

- Read `MEMORY.md` first to understand the current status and decisions.
- Before changing behaviour, read `constitution.md` and keep the change aligned with it.
- After a task, update `MEMORY.md` with status, decisions, and mistakes to avoid. Keep it short.
- If a rule becomes permanent, move it into this file instead of leaving it in memory.
- Never store secrets, tokens, or personal data in `MEMORY.md`.
