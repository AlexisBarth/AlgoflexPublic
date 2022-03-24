import axios from "axios";

export const client = axios.create({
  baseURL: 'https://staging-algoflex.herokuapp.com',
  timeout: 1000,
  withCredentials: true,
});
