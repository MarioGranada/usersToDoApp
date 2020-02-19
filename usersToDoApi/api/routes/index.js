const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');

const combinedRoutes = app => {
  userRoutes(app);
  taskRoutes(app);
};

module.exports = combinedRoutes;
