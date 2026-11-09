# Users To-Do App — Working Memory

_Last updated: 2026-11-02_

## Current status

- User and task CRUD endpoints are implemented on `develop`.
- The UI lists users and tasks and calls the API through Axios.
- `master` remains a scaffold with the default CRA screen.
- No tests, CI, or environment configuration.

## Key decisions

- Kept the UI as a single container with a service layer, matching the original scope.
- Used Mongoose references between users and tasks instead of embedding tasks.

## Known limitations and follow-ups

- Legacy toolchain (CRA 3, node-sass 4, Mongoose 5).
- No authentication, validation layer, or cascade deletion.
- Hardcoded Mongo URI and API URL.
- No tests beyond the CRA default.

## Mistakes to avoid

- Running the app from `master` shows the default CRA page.
- Starting the UI without MongoDB leaves lists empty and logs connection errors.
- Assuming the API runs on 3000; `develop` uses 3030.
- Installing with a modern Node version may fail on `node-sass`.

## Next steps

- Merge `develop` into `master` or make `develop` the default branch.
- Move the Mongo URI and API URL into environment variables.
- Upgrade or replace the legacy CRA/node-sass toolchain.
- Add auth and cascade deletion for tasks.

---

Keep this file under ~60 lines. Summarise or delete notes that no longer add value.
