import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getWorkerProfile,
  updateWorkerProfile,
} from "../../services/workerService";
import { useLoading } from "../../hooks/useLoading";

const initialForm = {
  bio: "",
  skills: "",
  experience: "",
  hourlyRate: "",
};

export default function Profile() {
  const { startLoading, stopLoading } = useLoading();
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getWorkerProfile();
      const profile = response.data || {};

      setFormData({
        bio: profile.bio || "",
        skills: Array.isArray(profile.skills) ? profile.skills.join(", ") : "",
        experience: profile.experience ?? "",
        hourlyRate: profile.hourlyRate ?? "",
      });
    } catch (error) {
      console.error("Error fetching worker profile:", error);
      if (error.response?.status !== 404) {
        toast.error(error.response?.data?.message || "Failed to load profile");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      startLoading();

      const payload = {
        bio: formData.bio.trim(),
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        experience: Number(formData.experience),
        hourlyRate: Number(formData.hourlyRate),
      };

      const response = await updateWorkerProfile(payload);
      toast.success(response.message || "Worker profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      stopLoading();
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Worker Profile</h1>
        <p className="mt-1 text-gray-500">
          Complete your profile before applying for jobs.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Tell customers about your experience"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Electrical, Plumbing, Painting"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Experience (years)
            </label>
            <input
              type="number"
              min="0"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Hourly Rate
            </label>
            <input
              type="number"
              min="0"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
