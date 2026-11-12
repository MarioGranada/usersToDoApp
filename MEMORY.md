# Users To-Do App — Working Memory

_Last updated: 2026-11-12_

## Current status

- `develop` (the real UI) merged into the Vite `master` on 2026-11-12; `master` is now the app.
- Live on Vercel: https://users-to-do-app.vercel.app (pushes to `master` deploy production).
- One Vercel project with Services: the Vite UI + the Express 5 API under `/api`.
- Users and tasks live in the `users_todo` schema of the shared Supabase Postgres (`portfolio-db`); MongoDB is gone.
- Nightly Vercel Cron (04:00 UTC) calls `/api/cron/reset` to restore 3 sample users and 5 tasks.
- Add/rename/remove user and add/edit task verified in headless Chrome against production; 1 Vitest test passes.

## Key decisions

- Kept the UI as a single container with a service layer, matching the original scope.
- Postgres with a foreign key (cascade delete) instead of Mongoose references.
- The API keeps the `_id` / `userId` names so the UI needed no data-shape changes.
- Same-origin `/api` (Vite proxy locally): CORS and the hardcoded `localhost:3030` are gone.
- `node-sass` → `sass`, MUI `ExpansionPanel` → `Accordion`, axios 1.x; React stays on 16.

## Known limitations and follow-ups

- No authentication; the public demo is shared until the nightly reset.
- After a rename the UI moves the user to the end of the list until reload.

## Mistakes to avoid

- Mounting API routes without the `/api` prefix: Vercel forwards the original path.
- Using Testing Library v10+ APIs (`waitFor`, `getByRole({ name })`) with the v9 dependency.
- Printing `.env.local` values or committing them.

## Next steps

- Add API tests and more UI tests (tasks flow).
- Consider upgrading React/MUI together.

---

Keep this file under ~60 lines. Summarise or delete notes that no longer add value.
