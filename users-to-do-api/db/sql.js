// Schema + seed SQL, kept in JS so the Vercel function bundle always includes it
// (no runtime file reads). Both statements are idempotent.

// Idempotent schema + seed. Safe to run repeatedly.
exports.migration = `
create schema if not exists users_todo;

create table if not exists users_todo.users (
  id         text primary key default gen_random_uuid()::text,
  name       text not null,
  created_at timestamptz not null default now()
);

create table if not exists users_todo.tasks (
  id          text primary key default gen_random_uuid()::text,
  user_id     text not null references users_todo.users (id) on delete cascade,
  description text not null,
  state       text not null default 'to do' check (state in ('', 'to do', 'done')),
  created_at  timestamptz not null default now()
);

create index if not exists tasks_user_id_idx on users_todo.tasks (user_id);

-- Only the server (postgres role) talks to this schema; keep the Data API out.
alter table users_todo.users enable row level security;
alter table users_todo.tasks enable row level security;

insert into users_todo.users (id, name, created_at) values
  ('u1', 'Ada Lovelace', '2026-01-01T10:00:00Z'),
  ('u2', 'Grace Hopper', '2026-01-01T10:01:00Z'),
  ('u3', 'Alan Turing',  '2026-01-01T10:02:00Z')
on conflict (id) do nothing;

insert into users_todo.tasks (id, user_id, description, state, created_at) values
  ('t1', 'u1', 'Write the first algorithm for the Analytical Engine', 'done',  '2026-01-01T11:00:00Z'),
  ('t2', 'u1', 'Publish notes on the Analytical Engine',              'to do', '2026-01-01T11:01:00Z'),
  ('t3', 'u2', 'Find the moth in the Mark II',                        'done',  '2026-01-01T11:02:00Z'),
  ('t4', 'u2', 'Draft the first compiler',                            'to do', '2026-01-01T11:03:00Z'),
  ('t5', 'u3', 'Prepare the imitation game',                          'to do', '2026-01-01T11:04:00Z')
on conflict (id) do nothing;
`;

// Empties the demo tables; running `migration` afterwards restores the seed.
exports.reset = `
truncate users_todo.tasks, users_todo.users;
`;
