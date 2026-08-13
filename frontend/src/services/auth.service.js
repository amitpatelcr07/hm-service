import api from "../api/axios";

export const loginUser = async (credentials) => {
  console.log("Logging in with credentials:", credentials); // Log the credentials
  const response = await api.post("/auth/login", credentials);
  console.log("Login response:", response.data); // Log the response data
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};
