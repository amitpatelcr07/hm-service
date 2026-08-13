import { useEffect, useState } from "react";
import { getCustomerDashboard } from "../../services/dashboard.service";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      console.log("Fetching customer dashboard data...");

      const response = await getCustomerDashboard();

      console.log("Fetched dashboard data:", response.data.jobs);

      // Store only the jobs array
      setDashboard(response.data.jobs);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  // Calculate jobs based on status
  const openJobs = dashboard.filter((job) => job.status === "OPEN");

  const inprogressJobs = dashboard.filter(
    (job) => job.status === "IN_PROGRESS",
  );

  const completedJobs = dashboard.filter((job) => job.status === "COMPLETED");

  if (loading) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <div className="p-6">
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome Back 👋</h1>

        <p className="text-gray-500 mt-2">
          Manage your jobs and track worker applications.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Jobs */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500">Total Jobs</h2>

          <p className="text-3xl font-bold mt-3">{dashboard.length}</p>
        </div>

        {/* Open Jobs */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500">Open Jobs</h2>

          <p className="text-3xl font-bold mt-3 text-blue-600">
            {openJobs.length}
          </p>
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500">In Progress</h2>

          <p className="text-3xl font-bold mt-3 text-orange-500">
            {inprogressJobs.length}
          </p>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500">Completed</h2>

          <p className="text-3xl font-bold mt-3 text-green-600">
            {completedJobs.length}
          </p>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-white rounded-lg shadow mt-8">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Recent Jobs</h2>
        </div>

        <div className="p-6 overflow-x-auto">
          {dashboard.length === 0 ? (
            <p className="text-gray-500">No jobs found.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Budget</th>
                  <th className="pb-3">Location</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.map((job) => (
                  <tr key={job.id} className="border-b">
                    <td className="py-4">{job.title}</td>

                    <td>
                      <span
                        className={
                          job.status === "OPEN"
                            ? "text-blue-600 font-semibold"
                            : job.status === "IN_PROGRESS"
                              ? "text-orange-500 font-semibold"
                              : job.status === "COMPLETED"
                                ? "text-green-600 font-semibold"
                                : "text-gray-500 font-semibold"
                        }
                      >
                        {job.status}
                      </span>
                    </td>

                    <td>₹{job.budget}</td>

                    <td>{job.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
