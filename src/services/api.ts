import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.19:3333', // dev
});

export default api;
