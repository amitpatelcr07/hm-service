import {
  createJobService,
  getAllJobsService,
  getJobByIdService,
  updateJobService,
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
