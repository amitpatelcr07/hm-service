import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getJobById, updateJob } from "../../services/jobService";

import { useLoading } from "../../hooks/useLoading";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { startLoading, stopLoading } = useLoading();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "PLUMBING",
    location: "",
    budget: "",
    requiredDate: "",
  });

  const [loadingJob, setLoadingJob] = useState(true);

  // Fetch existing job
  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await getJobById(id);

      console.log("Job details:", response);

      const job = response.data;

      setFormData({
        title: job.title || "",
        description: job.description || "",
        category: job.category || "PLUMBING",
        location: job.location || "",
        budget: job.budget || "",
        requiredDate: job.requiredDate ? job.requiredDate.split("T")[0] : "",
      });
    } catch (error) {
      console.error("Error fetching job:", error);

      toast.error(error.response?.data?.message || "Failed to load job");

      navigate("/dashboard/my-jobs");
    } finally {
      setLoadingJob(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update job
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      startLoading();

      const payload = {
        ...formData,
        budget: Number(formData.budget),
      };

      await updateJob(id, payload);

      toast.success("Job updated successfully!");

      navigate("/dashboard/my-jobs");
    } catch (error) {
      console.error("Error updating job:", error);

      toast.error(error.response?.data?.message || "Failed to update job");
    } finally {
      stopLoading();
    }
  };

  // Page loading while fetching job
  if (loadingJob) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-lg text-gray-500">Loading job...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-lg bg-white p-4 shadow sm:p-6 lg:p-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 sm:mb-8 sm:text-3xl">Edit Job</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Job Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the work..."
              rows="5"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="PLUMBING">Plumbing</option>

              <option value="ELECTRICAL">Electrical</option>

              <option value="PAINTING">Painting</option>

              <option value="CARPENTRY">Carpentry</option>

              <option value="CLEANING">Cleaning</option>

              <option value="APPLIANCE_REPAIR">Appliance Repair</option>

              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Location */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Budget */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Budget
            </label>

            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Enter budget"
              min="0"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Required Date */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Required Date
            </label>

            <input
              type="date"
              name="requiredDate"
              value={formData.requiredDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}

          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:gap-4">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 sm:w-auto"
            >
              Update Job
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard/my-jobs")}
              className="w-full rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 hover:bg-gray-300 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
