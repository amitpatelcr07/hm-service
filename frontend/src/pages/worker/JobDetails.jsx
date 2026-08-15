import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getJobById } from "../../services/jobService";
import { getWorkerProfile } from "../../services/workerService";
import { useAuth } from "../../hooks/useAuth";

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

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileReady, setProfileReady] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  useEffect(() => {
    if (user?.role === "WORKER") {
      checkWorkerProfile();
    }
  }, [user]);

  const fetchJob = async () => {
    try {
      const response = await getJobById(id);

      console.log("Job details response:", response);

      setJob(response.data);
    } catch (error) {
      console.error("Error fetching job:", error);

      toast.error(
        error.response?.data?.message || "Failed to load job details",
      );

      navigate("/dashboard/browse-jobs");
    } finally {
      setLoading(false);
    }
  };

  const checkWorkerProfile = async () => {
    try {
      const response = await getWorkerProfile();
      setProfileReady(isProfileComplete(response?.data));
    } catch (error) {
      if (error.response?.status === 404) {
        setProfileReady(false);
        return;
      }
      console.error("Error checking worker profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-gray-500 text-lg">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="bg-white rounded-lg shadow p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Job not found</h2>

        <button
          type="button"
          onClick={() => navigate("/dashboard/browse-jobs")}
          className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Job Details</h1>

          <p className="text-gray-500 mt-1">Review the job before applying.</p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard/browse-jobs")}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Back to Jobs
        </button>
      </div>

      {/* Job Card */}

      <div className="bg-white rounded-xl shadow p-8">
        {/* Title + Status */}

        <div className="flex justify-between items-start gap-4 border-b pb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{job.title}</h2>

            <p className="text-gray-500 mt-2">
              Posted on {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>

          <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700">
            {job.status}
          </span>
        </div>

        {/* Description */}

        <div className="py-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Description
          </h3>

          <p className="text-gray-600 leading-7">{job.description}</p>
        </div>

        {/* Job Information */}

        <div className="py-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Job Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Category</p>

              <p className="font-semibold text-gray-800 mt-1">{job.category}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Location</p>

              <p className="font-semibold text-gray-800 mt-1">{job.location}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Budget</p>

              <p className="font-semibold text-blue-600 text-lg mt-1">
                ₹{job.budget}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Required Date</p>

              <p className="font-semibold text-gray-800 mt-1">
                {job.requiredDate
                  ? new Date(job.requiredDate).toLocaleDateString()
                  : "Flexible"}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Information */}

        {job.customer && (
          <div className="py-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Customer
            </h3>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold text-gray-800">
                {job.customer.fullName}
              </p>

              {job.customer.email && (
                <p className="text-gray-500 mt-1">{job.customer.email}</p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}

        <div className="pt-6 flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/browse-jobs")}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Back
          </button>

          <button
            type="button"
            onClick={() => navigate(`/dashboard/apply-job/${job.id}`)}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Apply for Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
