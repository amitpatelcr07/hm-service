import api from "../api/axios";

export const getJobs = async () => {
  const response = await api.get("/jobs");
  console.log("Fetched jobs:", response.data); // Log the fetched jobs
  return response.data;
};

export const getMyJobs = async () => {
  const response = await api.get("/jobs/my-jobs");
  console.log("Fetched my jobs:", response.data);
  return response.data;
};

export const createJob = async (jobData) => {
  console.log("Creating a new job with data:", jobData); // Log the action
  const response = await api.post("/jobs", jobData);
  return response.data;
};

export const deleteJob = async (jobId) => {
  console.log(`Deleting job with ID: ${jobId}`);
  const response = await api.delete(`/jobs/${jobId}`);
  return response.data;
};

export const getJobById = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}`);
  return response.data;
};

export const updateJob = async (jobId, updatedData) => {
  console.log(`Updating job with ID: ${jobId} with data:`, updatedData);
  const response = await api.put(`/jobs/${jobId}`, updatedData);
  return response.data;
};

export const updateJobStatus = async (jobId, status) => {
  const response = await api.patch(`/jobs/${jobId}/status`, { status });
  return response.data;
};

export const getJobApplications = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}/applications`);

  return response.data;
};
