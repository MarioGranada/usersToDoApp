const taskController = require('../controllers/taskController');

const taskRoutes = app => {
  app.route('/tasks/').post(taskController.createTaskByUserId);

  app.route('/tasks/:userId').get(taskController.listTasksByUserId);

  app.route('/tasks/:taskId').put(taskController.updateTaskByUserId);
};

module.exports = taskRoutes;
