const express = require('express');

const { sql } = require('./db');
const cronRoutes = require('./routes/cron');

const app = express();
app.use(express.json({ limit: '20kb' }));

const TASK_STATES = ['', 'to do', 'done'];
const isText = (value, max) =>
  typeof value === 'string' && value.trim().length > 0 && value.length <= max;

// The UI was written against MongoDB, so rows keep the `_id` / `userId` names.
const userColumns = () => sql`id as "_id", name`;
const taskColumns = () => sql`id as "_id", user_id as "userId", description, state`;

// Everything lives under /api: on Vercel the SPA and the API share one origin,
// and in development Vite proxies /api to this server.
const api = express.Router();

// Users
api.get('/users', async (req, res) => {
  res.json(await sql`select ${userColumns()} from users_todo.users order by created_at`);
});

api.post('/users', async (req, res) => {
  if (!isText(req.body?.name, 100)) {
    return res.status(400).json({ message: 'Username is required (max 100 characters).' });
  }
  const [user] = await sql`
    insert into users_todo.users (name) values (${req.body.name.trim()})
    returning ${userColumns()}`;
  res.status(201).json(user);
});

api.get('/users/:userId', async (req, res) => {
  const [user] = await sql`
    select ${userColumns()} from users_todo.users where id = ${req.params.userId}`;
  if (!user) return res.status(404).json({ message: 'User not found.' });
  res.json(user);
});

api.put('/users/:userId', async (req, res) => {
  if (!isText(req.body?.name, 100)) {
    return res.status(400).json({ message: 'Username is required (max 100 characters).' });
  }
  const [user] = await sql`
    update users_todo.users set name = ${req.body.name.trim()}
    where id = ${req.params.userId}
    returning ${userColumns()}`;
  if (!user) return res.status(404).json({ message: 'User not found.' });
  res.json(user);
});

api.delete('/users/:userId', async (req, res) => {
  // Tasks are removed by the foreign key's ON DELETE CASCADE.
  const rows = await sql`delete from users_todo.users where id = ${req.params.userId} returning id`;
  if (rows.length === 0) return res.status(404).json({ message: 'User not found.' });
  res.json({ msg: 'User deleted' });
});

// Tasks
api.get('/tasks/:userId', async (req, res) => {
  res.json(await sql`
    select ${taskColumns()} from users_todo.tasks
    where user_id = ${req.params.userId} order by created_at`);
});

api.post('/tasks', async (req, res) => {
  const { description, userId, state = 'to do' } = req.body ?? {};
  if (!isText(description, 1000) || typeof userId !== 'string' || !TASK_STATES.includes(state)) {
    return res.status(400).json({ message: 'A description (max 1000 characters) and a user are required.' });
  }
  const [user] = await sql`select id from users_todo.users where id = ${userId}`;
  if (!user) return res.status(404).json({ message: 'User not found.' });
  const [task] = await sql`
    insert into users_todo.tasks (user_id, description, state)
    values (${userId}, ${description.trim()}, ${state})
    returning ${taskColumns()}`;
  res.status(201).json(task);
});

api.put('/tasks/:taskId', async (req, res) => {
  const { description, state } = req.body ?? {};
  if (!isText(description, 1000) || !TASK_STATES.includes(state ?? '')) {
    return res.status(400).json({ message: 'Invalid task data.' });
  }
  const [task] = await sql`
    update users_todo.tasks set description = ${description.trim()}, state = ${state ?? ''}
    where id = ${req.params.taskId}
    returning ${taskColumns()}`;
  if (!task) return res.status(404).json({ message: 'Task not found.' });
  res.json(task);
});

api.use('/cron', cronRoutes);
api.use((req, res) => res.status(404).json({ message: 'Not found.' }));
app.use('/api', api);

// Express 5 forwards rejected promises from async handlers here.
// Never send database errors to the browser.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong.' });
});

module.exports = app;
