import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { applyForJob } from "../../services/updateApplicationStatus.service";
import { getWorkerProfile } from "../../services/workerService";
import { useLoading } from "../../hooks/useLoading";

const isProfileComplete = (profile) => {
  if (!profile) return false;

  return (
    Boolean(profile.bio && profile.bio.trim()) &&
    Array.isArray(profile.skills) &&
    profile.skills.length > 0 &&
    Number(profile.experience) >= 0 &&
    Number(profile.hourlyRate) > 0
  );
};

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  console.log("Job ID from URL params:", jobId); // Log the job ID
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const ensureProfile = async () => {
      try {
        const response = await getWorkerProfile();
        if (!isProfileComplete(response?.data)) {
          toast.error(
            "Please complete your worker profile before applying for a job.",
          );
          navigate("/dashboard/profile");
        }
      } catch (error) {
        if (error.response?.status === 404) {
          toast.error(
            "Please complete your worker profile before applying for a job.",
          );
          navigate("/dashboard/profile");
          return;
        }
        console.error("Error checking worker profile:", error);
      }
    };

    ensureProfile();
  }, [navigate]);

  const [formData, setFormData] = useState({
    proposal: "",
    expectedPrice: "",
    estimatedDays: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.proposal.trim()) {
      toast.error("Please enter your proposal");
      return;
    }

    if (!formData.expectedPrice) {
      toast.error("Please enter your expected price");
      return;
    }

    if (!formData.estimatedDays) {
      toast.error("Please enter estimated days");
      return;
    }

    try {
      startLoading();

      const applicationData = {
        proposal: formData.proposal.trim(),
        expectedPrice: Number(formData.expectedPrice),
        estimatedDays: Number(formData.estimatedDays),
      };

      console.log("Submitting application:", applicationData);

      const response = await applyForJob(jobId, applicationData);

      console.log("Application response:", response);

      toast.success(response.message || "Application submitted successfully");

      navigate("/dashboard/my-applications");
    } catch (error) {
      console.error("Error applying for job:", error);

      toast.error(
        error.response?.data?.message || "Failed to submit application",
      );
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Apply for Job</h1>

        <p className="text-gray-500 mt-1">Submit your proposal for this job.</p>
      </div>

      {/* Application Form */}

      <div className="bg-white rounded-xl shadow p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Proposal */}

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Proposal
            </label>

            <textarea
              name="proposal"
              value={formData.proposal}
              onChange={handleChange}
              rows={6}
              placeholder="Explain why you are suitable for this job..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Expected Price */}

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Expected Price
            </label>

            <input
              type="number"
              name="expectedPrice"
              value={formData.expectedPrice}
              onChange={handleChange}
              min="0"
              placeholder="Enter your expected price"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Estimated Days */}

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Estimated Days
            </label>

            <input
              type="number"
              name="estimatedDays"
              value={formData.estimatedDays}
              onChange={handleChange}
              min="1"
              placeholder="How many days will you need?"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate(`/dashboard/job-details/${jobId}`)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Back
            </button>

            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJob;
