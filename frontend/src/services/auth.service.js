import api from "../api/axios";

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// export const registerUser = async (userData) => {
//   debugger;
//   const response = await api.post("/auth/register", userData);
//   debugger;
//   return response.data;
// };

export const registerUser = async (userData) => {
  console.log("1. registerUser called");
  console.log("2. userData:", userData);
  console.log("3. API baseURL:", api.defaults.baseURL);
  console.log("4. Full URL:", `${api.defaults.baseURL}/auth/register`);

  try {
    console.log("5. Sending request...");

    const response = await api.post("/auth/register", userData);

    console.log("6. Response received:", response);

    return response.data;
  } catch (error) {
    console.log("7. Axios error");
    console.log("message:", error.message);
    console.log("code:", error.code);
    console.log("response:", error.response);
    console.log("request:", error.request);
    console.log("config:", error.config);

    throw error;
  }
};
