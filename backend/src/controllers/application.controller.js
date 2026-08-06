import {
  applyForJobService,
  getMyApplicationsService,
  getJobApplicationsService,
  updateApplicationStatusService,
  getApplicationByIdService,
} from "../services/application.service.js";
export const applyForJob = async (req, res) => {
  console.log("applyForJob called with req.params.id:", req.params.id);
  try {
    const jobId = req.params.id;

    const userId = req.user.userId;

    const application = await applyForJobService(jobId, userId, req.body);

    return res.status(201).json({
      success: true,

      message: "Application submitted successfully",

      data: application,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,

      message: error.message,
    });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const userId = req.user.userId;

    const applications = await getMyApplicationsService(userId);

    return res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getJobApplications = async (req, res) => {
  try {
    const jobId = req.params.id;
    const customerId = req.user.userId;

    const applications = await getJobApplicationsService(jobId, customerId);

    return res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const customerId = req.user.userId;
    const { status } = req.body;

    const application = await updateApplicationStatusService(
      applicationId,
      customerId,
      status,
    );

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: application,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const applicationId = req.params.id;

    const userId = req.user.userId;

    const role = req.user.role;

    const application = await getApplicationByIdService(
      applicationId,
      userId,
      role,
    );

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
