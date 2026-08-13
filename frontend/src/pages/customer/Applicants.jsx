import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getJobApplications } from "../../services/jobService";

const Applicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const fetchApplications = async () => {
    try {
      const response = await getJobApplications(jobId);

      console.log("Applications response:", response.data);

      setApplications(response.data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);

      toast.error(error.response?.data?.message || "Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-gray-500 text-lg">Loading applicants...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Applicants</h1>

          <p className="text-gray-500 mt-1">
            Workers who applied for this job.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard/my-jobs")}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Back to My Jobs
        </button>
      </div>

      {/* Empty State */}

      {applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No Applicants Yet
          </h2>

          <p className="text-gray-500 mt-2">
            No workers have applied for this job yet.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left">Worker</th>

                <th className="px-6 py-4 text-left">Proposal</th>

                <th className="px-6 py-4 text-left">Expected Price</th>

                <th className="px-6 py-4 text-left">Estimated Days</th>

                <th className="px-6 py-4 text-left">Status</th>

                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr key={application.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">
                    {application.workerProfile?.user?.fullName ||
                      "Unknown Worker"}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {application.proposal || "No proposal"}
                  </td>

                  <td className="px-6 py-4">₹{application.expectedPrice}</td>

                  <td className="px-6 py-4">
                    {application.estimatedDays || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                      {application.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Accept
                      </button>

                      <button
                        type="button"
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Reject
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

export default Applicants;
