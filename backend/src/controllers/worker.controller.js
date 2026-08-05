import {
  createWorkerProfile,
  getWorkerProfileData,
  updateWorkerProfileData,
  getWorkerProfileById,
  updateWorkerAvailability,
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

export const updateWorkerProfile = async (req, res) => {
  try {
    const updatedProfile = await updateWorkerProfileData(
      req.user.userId,
      req.body,
    );
    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Worker profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Worker profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWorkerById = async (req, res) => {
  try {
    const workerId = req.params.id;

    const worker = await getWorkerProfileById(workerId);

    return res.status(200).json({
      success: true,
      data: worker,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAvailability = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { isAvailable } = req.body;

    const worker = await updateWorkerAvailability(userId, isAvailable);

    return res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      data: worker,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
