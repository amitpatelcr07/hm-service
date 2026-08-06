import {
  createJobService,
  getAllJobsService,
  getJobByIdService,
  updateJobService,
  deleteJobService,
  updateJobStatusService,
  getMyJobsService,
} from "../services/job.service.js";

export const createJob = async (req, res) => {
  try {
    const customerId = req.user.userId;

    const job = await createJobService(customerId, req.body);

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await getAllJobsService(req.query);

    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      data: jobs,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await getJobByIdService(id);

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const customerId = req.user.userId;

    const updatedJob = await updateJobService(jobId, customerId, req.body);

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const customerId = req.user.userId;

    await deleteJobService(jobId, customerId);

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateJobStatus = async (req, res) => {
  try {
    const jobId = req.params.id;
    const customerId = req.user.userId;

    const { status } = req.body;

    const updatedJob = await updateJobStatusService(jobId, customerId, status);

    return res.status(200).json({
      success: true,
      message: "Job status updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const customerId = req.user.userId;

    const jobs = await getMyJobsService(customerId);

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
