import {
  createWorkerProfile,
  getWorkerProfileData,
} from "../services/worker.service.js";
export const registerWorker = async (req, res) => {
  try {
    const profile = await createWorkerProfile(req.user.userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Worker profile created successfully",
      data: profile,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
console.log("checking if getWorkerProfile is imported correctly");
export const getWorkerProfile = async (req, res) => {
  try {
    console.log("User ID:", req.user.userId); // Log the user ID to verify it's being passed correctly
    const profile = await getWorkerProfileData(req.user.userId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Worker profile not found",
      });
    }

    return res.status(200).json({
      success: true,

      message: "Worker profile retrieved successfully",

      data: profile,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
