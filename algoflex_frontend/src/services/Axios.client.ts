import axios from "axios";

export const client = axios.create({
  baseURL: 'https://staging-algoflex.herokuapp.com',
  timeout: 1000 * 10,
});

client.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  return config;
}, (error) => {
  return Promise.reject(error);
});
