const userController = require('../controllers/userController');

const userRoutes = app => {
  app
    .route('/users')
    .get(userController.listUsers)
    .post(userController.createUser);

  app
    .route('/users/:userId')
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.removeUser);
};

module.exports = userRoutes;
