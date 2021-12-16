import axios from "axios";

export const client = axios.create({
  baseURL: 'http://localhost:4100',
  timeout: 1000,
  headers: {
   // 'Authorization': `Bearer ${token}`,
  }
});
