import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMyApplications } from "../../services/updateApplicationStatus.service";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-700",
  ACCEPTED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const statusLabels = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await getMyApplications();
      setApplications(response.data || []);
    } catch (error) {
      console.error("Error fetching my applications:", error);
      toast.error(
        error.response?.data?.message || "Failed to load your applications",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-gray-600">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Applications</h1>
        <p className="mt-1 text-gray-500">
          Track the status of each job you applied for.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700">
            No Applications Found
          </h2>
          <p className="mt-2 text-gray-500">
            You haven't applied for any jobs yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {application.job?.title || "Job"}
                  </h2>
                  <p className="mt-1 text-gray-500">
                    {application.job?.category} • {application.job?.location}
                  </p>
                </div>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                    statusColors[application.status] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {statusLabels[application.status] || application.status}
                </span>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Budget
                  </p>
                  <p className="mt-2 text-lg font-semibold text-gray-800">
                    ₹{application.job?.budget || 0}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Expected Price
                  </p>
                  <p className="mt-2 text-lg font-semibold text-gray-800">
                    ₹{application.expectedPrice}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Estimated Days
                  </p>
                  <p className="mt-2 text-lg font-semibold text-gray-800">
                    {application.estimatedDays} days
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Job Status
                  </p>
                  <p className="mt-2 text-lg font-semibold text-gray-800">
                    {application.job?.status || "UNKNOWN"}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Proposal
                </p>
                <p className="mt-2 text-gray-700">
                  {application.proposal || "No proposal provided."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;
