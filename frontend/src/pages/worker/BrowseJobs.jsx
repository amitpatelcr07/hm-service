import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getJobs } from "../../services/jobService";
import { useNavigate } from "react-router-dom";
const BrowseJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getJobs();

      console.log("Browse Jobs response:", response);

      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);

      toast.error(error.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-gray-500 text-lg">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">Browse Jobs</h1>

        <p className="text-gray-500 mt-1">
          Find jobs that match your skills and apply.
        </p>
      </div>

      {/* Empty State */}

      {jobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No Jobs Available
          </h2>

          <p className="text-gray-500 mt-2">
            There are currently no jobs available.
          </p>
        </div>
      ) : (
        /* Jobs Grid */

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition flex flex-col h-full min-h-[380px]"
            >
              {/* Job Title */}

              <div className="flex justify-between items-start gap-4">
                <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>

                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  {job.status}
                </span>
              </div>

              {/* Description */}

              <p className="text-gray-600 mt-4 line-clamp-3 min-h-[72px]">
                {job.description}
              </p>

              {/* Job Information */}

              <div className="mt-5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>

                  <span className="font-medium text-gray-800">
                    {job.category}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>

                  <span className="font-medium text-gray-800">
                    {job.location}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Budget</span>

                  <span className="font-semibold text-blue-600">
                    ₹{job.budget}
                  </span>
                </div>

                {job.requiredDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Required Date</span>

                    <span className="font-medium text-gray-800">
                      {new Date(job.requiredDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* View Job */}

              <div className="mt-auto pt-6">
                <button
                  type="button"
                  onClick={() => navigate(`/dashboard/job-details/${job.id}`)}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
                >
                  View Job
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseJobs;
