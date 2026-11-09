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
| UI | React 16 (Create React App 3) | The project was built with the CRA toolchain of its era. |
| UI library | Material UI 4 + node-sass | Component library and SCSS styling used by the original implementation. |
| HTTP client | Axios | A small service layer wraps all API calls. |
| API | Express 4 | User and task routes with controllers. |
| Database | MongoDB + Mongoose 5 | Documents for users and tasks with references. |
| Tooling | nodemon + concurrently | API reloads and both apps run from one root command. |

**Rule of thumb:** a new dependency must solve a concrete problem that the current stack cannot solve cleanly. Justify it in the change that introduces it.

## Core Premises

### 1. Scope

A full-stack CRUD exercise from an earlier portfolio period. It demonstrates Express routing, Mongoose models, and a service-layer React UI. It is not a production task manager: there is no auth, validation layer, or durable deployment.

### 2. Environment Isolation

- This project has no runtime secrets. Do not introduce `.env` files unless a real secret or environment-specific URL appears.
- If configuration is added, use environment variables and document them in the README.
- Never commit keys, tokens, database URLs, or credentials.

### 3. Architecture

- Keep API request logic in the UI service layer and database logic in controllers/models.
- Routes compose controllers; controllers do not build routes.
- The UI stays a single container unless routing or shared state is genuinely needed.

### 4. Data and State

- MongoDB is the source of truth for users and tasks.
- Tasks reference users by ObjectId; the API does not enforce cascade deletion.
- The UI refetches after mutations rather than keeping a client cache.

### 5. Styling and UX

- SCSS files live next to their components; Material UI provides the component primitives.
- Keep the header/footer and list layouts consistent with the existing shared components.
- Do not add a second styling system.

### 6. Quality Gates

- `cd users-to-do-ui && npm run build` is the main gate.
- Manually test user CRUD, task creation, task listing by user, and task state updates.
- Confirm the UI handles an API-down or MongoDB-down state without a blank screen.

### 7. Deployment

- UI: static CRA build for GitHub Pages.
- API: a Node host plus MongoDB Atlas, or a Supabase replacement.
- Move the Mongo URI and API base URL into environment variables before deploying.

## What to Avoid

- Working on `master` and expecting the implemented app.
- Committing a local MongoDB URI or credentials.
- Upgrading CRA or `node-sass` casually; the project depends on legacy versions.
- Assuming task deletion cascades from users.
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
