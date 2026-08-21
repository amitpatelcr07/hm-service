import axios from "axios";
import { getAuthToken } from "../utils/authStorage";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "https://hm-service.onrender.com"
).replace(/\/$/, "");

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
