const mongoose = require('mongoose');
const Task = mongoose.model('Tasks');

const listTasksByUserId = (request, response) => {
  Task.find({ userId: request.params.userId }, (error, data) => {
    if (error) response.send(error);
    response.json(data);
  });
};

const createTaskByUserId = (request, response) => {
  // userId, taskData; Send user id in body
  let task = new Task(request.body);
  task.save((error, data) => {
    if (error) response.send(error);
    response.json(data);
  });
};

const updateTaskByUserId = (request, response) => {
  Task.findOneAndUpdate(
    { _id: request.params.taskId },
    request.body,
    (error, data) => {
      if (error) response.send(error);
      response.json(data);
    }
  );
};

module.exports = {
  listTasksByUserId,
  createTaskByUserId,
  updateTaskByUserId
};
