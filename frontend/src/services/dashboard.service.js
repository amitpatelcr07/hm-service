import api from "../api/axios";

export const getCustomerDashboard = async () => {
  console.log("Fetching customer dashboard data..."); // Log the action
  const response = await api.get("/jobs");

  return response.data;
};
