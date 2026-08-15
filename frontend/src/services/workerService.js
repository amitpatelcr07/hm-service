import api from "../api/axios";

export const getWorkerProfile = async () => {
  const response = await api.get("/worker/profile");
  return response.data;
};

export const createWorkerProfile = async (profileData) => {
  const response = await api.post("/worker/profile", profileData);
  return response.data;
};

export const updateWorkerProfile = async (profileData) => {
  const response = await api.put("/worker/profile", profileData);
  return response.data;
};
