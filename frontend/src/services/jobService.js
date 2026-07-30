import api from "../api/axios";

export const getJobs = async () => {
  return api.get("/jobs");
};

export const createJob = async (jobData) => {
  return api.post("/jobs", jobData);
};
