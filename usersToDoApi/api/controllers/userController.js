const mongoose = require('mongoose');
const User = mongoose.model('Users');

const listUsers = (request, response) => {
  User.find({}, (error, data) => {
    if (error) response.send(error);
    response.send(data);
  });
};

const createUser = (request, response) => {
  let user = new User(request.body);
  user.save((error, data) => {
    if (error) response.send(error);
    response.json(data);
  });
};

const getUserById = (request, response) => {
  User.findById(request.params.userId, (error, data) => {
    if (error) response.send(error);
    response.json(data);
  });
};

const updateUser = (request, response) => {
  User.findOneAndUpdate(
    { _id: request.params.userId },
    request.body,
    (error, data) => {
      if (error) response.send(error);
      response.json(data);
    }
  );
};

const removeUser = (request, response) => {
  User.remove({ _id: request.params.userId }, (error, task) => {
    if (error) response.send(error);
    response.json({ msg: 'Used deleted' });
  });
};

module.exports = {
  listUsers,
  createUser,
  getUserById,
  updateUser,
  removeUser
};
