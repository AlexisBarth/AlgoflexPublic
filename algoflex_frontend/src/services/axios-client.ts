import axios from "axios";

const token = localStorage.getItem('token');

export const client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: {
    'Authorization': `Bearer ${token}`,
  }
});
