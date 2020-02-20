const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  Task = require('./api/models/taskModel'),
  User = require('./api/models/userModel'),
  routes = require('./api/routes');

const app = express();
const port = process.env.PORT || 3030;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/usersToDoApp');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

app.listen(port);

console.log('Users To Do App is loaded and running up on: ', port);
