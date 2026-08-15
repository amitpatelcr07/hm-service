import api from "../api/axios";

export const applyForJob = async (jobId, applicationData) => {
  console.log(`Applying for job ${jobId} with data:`, applicationData); // Log the action
  const response = await api.post(`/jobs/${jobId}/apply`, applicationData);
  console.log("Apply for job response:", response.data); // Log the response data
  return response.data;
};

export const getMyApplications = async () => {
  const response = await api.get("/applications/my-applications");
  return response.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const response = await api.patch(`/applications/${applicationId}/status`, {
    status,
  });

  return response.data;
};
