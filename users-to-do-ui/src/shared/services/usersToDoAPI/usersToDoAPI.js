import axios from 'axios';

// Same-origin API: Vercel routes /api to the Express service; Vite proxies it in dev.
const baseAxiosInstance = axios.create({
  baseURL: '/api'
});

// Tasks
export const createTask = data => {
  return baseAxiosInstance.post('/tasks', { ...data });
};

export const getTasksByUserId = userId => {
  return baseAxiosInstance.get(`/tasks/${userId}`);
};

export const updateTask = data => {
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
