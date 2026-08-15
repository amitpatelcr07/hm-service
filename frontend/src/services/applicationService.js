import api from "../api/axios";

export const updateApplicationStatus = async (applicationId, status) => {
  console.log(`Updating application ${applicationId} status to ${status}`); // Log the action
  const response = await api.patch(`/applications/${applicationId}/status`, {
    status,
  });
  console.log("Update status response:", response.data); // Log the response data
  return response.data;
};
