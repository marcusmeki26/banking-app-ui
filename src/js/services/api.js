import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BE_API_BASE_PATH_V1,
});

export default api;