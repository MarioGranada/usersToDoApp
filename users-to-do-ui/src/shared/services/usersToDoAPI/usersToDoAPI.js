import axios from 'axios';

const baseAxiosInstance = axios.create({
  baseURL: 'http://localhost:3030/'
});

// Tasks
export const createTask = data => {
  return baseAxiosInstance.post('/tasks', { ...data });
};

export const getTasksByUserId = userId => {
  return baseAxiosInstance.get(`/tasks/${userId}`);
};

export const updateTask = data => {
  console.log('data in API update', data._id);
  return baseAxiosInstance.put(`/tasks/${data._id}`, { ...data });
};

// Users
export const createUser = data => {
  return baseAxiosInstance.post('/users', { ...data });
};

export const listUsers = () => {
  return baseAxiosInstance.get('/users');
};

export const getUserById = userId => {
  return baseAxiosInstance.get(`/users/${userId}`);
};

export const updateUser = data => {
  return baseAxiosInstance.put(`/users/${data._id}`, { ...data });
};

export const removeUser = userId => {
  return baseAxiosInstance.delete(`/users/${userId}`);
};
