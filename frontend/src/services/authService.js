import api from "../api/axios";

export const loginUser = async (credentials) => {
  return api.post("/auth/login", credentials);
};

export const registerUser = async (userData) => {
  return api.post("/auth/register", userData);
};
