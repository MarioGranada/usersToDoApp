// Local development server. On Vercel, the "backend" service serves app.js.
const app = require('./app');

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Users To Do API listening on http://localhost:${port}/api`));
