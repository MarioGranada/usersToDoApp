const mongoose = require('mongoose');
const Task = mongoose.model('Tasks');

const listTasksByUserId = (request, response) => {
  console.log('[Listing Tasks]', request.params, request.body);
  Task.find({ userId: request.params.userId }, (error, data) => {
    if (error) response.send(error);
    response.json(data);
  });
};

const createTaskByUserId = (request, response) => {
  console.log('[Creating Task]', request.params, request.body);
  let task = new Task(request.body);
  task.save((error, data) => {
    if (error) response.send(error);
    response.json(data);
  });
};

const updateTask = (request, response) => {
  console.log('[Updating Task]', request.params, request.body);
  Task.findOneAndUpdate(
    { _id: request.params.taskId },
    request.body,
    {
      new: true
    },
    (error, data) => {
      if (error) response.send(error);
      response.json(data);
    }
  );
};

module.exports = {
  listTasksByUserId,
  createTaskByUserId,
  updateTask
};
