import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_URL_BASE,
});

export default api;
