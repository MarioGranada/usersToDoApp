# Project Constitution — Users To-Do App

This document defines the non-negotiable foundations for this repository. Read it before adding or changing features.

## Guiding Principles

- **Simplicity first** — prefer the smallest solution that solves the problem. If a change needs a long explanation, it is probably over-engineered.
- **No hardcoded secrets or endpoints** — configuration belongs in environment variables; visual design tokens belong in styles, not in `.env` files.
- **Traceability** — every value, dependency, and route should make its origin and purpose obvious.
- **Debuggability** — fail loudly and visibly; avoid silent fallbacks that hide broken data.
- **Official patterns** — use the documented API of each framework and library before inventing a workaround.
- **Portfolio clarity** — this repository is part of a public portfolio. Code should read as clean, intentional, and easy for a reviewer to follow.

## Technology Stack Foundations

| Layer | Choice | Rationale |
| --- | --- | --- |
| UI | React 16 + Vite 8 | Migrated from CRA 3; React stays on 16 with the classic JSX transform. |
| UI library | Material UI 4 + Sass (dart-sass) | Component library and SCSS styling used by the original implementation. |
| HTTP client | Axios | A small service layer wraps all API calls. |
| API | Express 5 | User and task routes; runs as a Vercel Function. |
| Database | Supabase Postgres (postgres.js) | Durable storage on serverless hosting; one schema (`users_todo`) in the shared portfolio database. Replaced MongoDB. |
| Hosting | Vercel Services + Cron | UI and API ship together on one origin; nightly demo reset. |
| Tests | Vitest + Testing Library | Replaced the CRA test runner. |

**Rule of thumb:** a new dependency must solve a concrete problem that the current stack cannot solve cleanly. Justify it in the change that introduces it.

## Core Premises

### 1. Scope

A full-stack CRUD exercise from an earlier portfolio period. It demonstrates Express routing, a relational data model, and a service-layer React UI. It is not a production task manager: there is no auth. The public demo is kept clean by a nightly reset.

### 2. Environment Isolation

- Runtime configuration comes from environment variables: `POSTGRES_URL` / `POSTGRES_URL_NON_POOLING` (Supabase integration) and `CRON_SECRET`. Locally they live in the gitignored root `.env.local` (`vercel env pull .env.local`).
- Document every variable in the README and `AGENTS.md`.
- Never commit keys, tokens, database URLs, or credentials, and never log them or send database errors to the browser.

### 3. Architecture

- Keep API request logic in the UI service layer and SQL in the API (`app.js`, `db/`).
- Every API route lives under `/api`; the UI calls the same origin.
- The API never reads files at runtime; SQL lives in `users-to-do-api/db/sql.js`.
- The reset endpoint refuses any request without `Authorization: Bearer $CRON_SECRET`.
- The UI stays a single container unless routing or shared state is genuinely needed.

### 4. Data and State

- The `users_todo` schema is the source of truth for users and tasks. Schema and seed changes stay idempotent (`npm run db:migrate --prefix users-to-do-api`).
- Tasks reference users with a foreign key; deleting a user cascades to their tasks.
- API rows keep the `_id` / `userId` names the UI expects.
- Only touch the `users_todo` schema; the database is shared with other portfolio apps.

### 5. Styling and UX

- SCSS files live next to their components; Material UI provides the component primitives.
- Keep the header/footer and list layouts consistent with the existing shared components.
- Do not add a second styling system.

### 6. Quality Gates

- `yarn --cwd users-to-do-ui build`, `test` and `lint` are the gates.
- Manually test user CRUD, task creation, task listing by user, and task state updates.
- Confirm the UI handles an API-down or database-down state without a blank screen.

### 7. Deployment

- One Vercel project (Services in `vercel.json`): the UI serves the Vite build, the API runs Express. Pushing to `master` deploys production.
- The nightly cron `/api/cron/reset` restores the sample users and tasks.
- Delete any test data written to production after verifying.

## What to Avoid

- Committing database URLs, `.env*` files, or credentials.
- Upgrading React or Material-UI casually; the UI depends on React 16 and MUI 4.
- Writing to local files from the API (not durable or writable on Vercel).
- Adding a router or Redux without a concrete need.

## Checklist Before Adding Anything New

- Does this solve a real problem for this project, or am I adding scope for its own sake?
- Is every new value configuration-driven rather than hardcoded?
- Does the change follow the existing folder and naming patterns?
- Is there a clear failure path when data, the network, or the environment is unavailable?
- Have I run the available lint/build/test command and fixed what it reports?
- Did I update `README.md` and `MEMORY.md` if behaviour or setup changed?

## Philosophy Statement

This repository exists to show thoughtful front-end engineering: clear structure, readable code, and deliberate trade-offs. The goal is not to use every tool available, but to make every file explain itself. Simplicity is the feature.
