import axios from "axios";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "../utils/authSession";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let refreshPromise = null;

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${API_BASE_URL}/api/auth/refresh`, null, { withCredentials: true })
      .then((response) => {
        setAccessToken(response.data.token);
        return response.data.token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshRequest = originalRequest?.url?.includes("/auth/refresh");

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      isRefreshRequest ||
      !getAccessToken()
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    try {
      const token = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return api(originalRequest);
    } catch (refreshError) {
      clearAccessToken();
      window.location.replace("/login");
      return Promise.reject(refreshError);
    }
  },
);

export default api;
