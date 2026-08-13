import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getJobs, deleteJob } from "../../services/jobService";
import { useLoading } from "../../hooks/useLoading";
import { useNavigate } from "react-router-dom";
const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const { startLoading, stopLoading } = useLoading();
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getJobs();

      console.log("My Jobs response:", response);

      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);

      toast.error(error.response?.data?.message || "Failed to load jobs");
    } finally {
      stopLoading();
    }
  };

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmed) {
      return;
    }

    try {
      startLoading();

      await deleteJob(jobId);

      toast.success("Job deleted successfully");

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job");
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Jobs</h1>

        <p className="text-gray-500 mt-1">Manage the jobs you have created.</p>
      </div>

      {/* Empty State */}

      {jobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-700">No Jobs Found</h2>

          <p className="text-gray-500 mt-2">
            You haven't created any jobs yet.
          </p>
        </div>
      ) : (
        /* Jobs Table */

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Job Title
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Location
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Budget
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {job.title}
                  </td>

                  <td className="px-6 py-4 text-gray-600">{job.category}</td>

                  <td className="px-6 py-4 text-gray-600">{job.location}</td>

                  <td className="px-6 py-4 font-medium">₹{job.budget}</td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                      {job.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/dashboard/applicants/${job.id}`)
                        }
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Applicants
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/dashboard/edit-job/${job.id}`)
                        }
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        loadingText="Deleting..."
                        onClick={() => handleDelete(job.id)}
                        type="button"
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
