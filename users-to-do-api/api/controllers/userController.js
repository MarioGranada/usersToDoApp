const mongoose = require('mongoose');
const User = mongoose.model('Users');

const listUsers = (request, response) => {
  console.log('[Listing Users]', request.params, request.body);
  User.find({}, (error, data) => {
    if (error) response.send(error);
    response.send(data);
  });
};

const createUser = (request, response) => {
  console.log('[Creating User]', request.params, request.body);
  let user = new User(request.body);
  user.save((error, data) => {
    if (error) response.send(error);
    response.json(data);
  });
};

const getUserById = (request, response) => {
  console.log('[Getting User]', request.params, request.body);
  User.findById(request.params.userId, (error, data) => {
    if (error) response.send(error);
    response.json(data);
  });
};

const updateUser = (request, response) => {
  console.log('[Updating User]', request.params, request.body);
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
  console.log('[Removing User]', request.params, request.body);
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
