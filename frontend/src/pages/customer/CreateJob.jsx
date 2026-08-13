import { useState } from "react";
import { createJob } from "../../services/jobService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../hooks/useLoading";
const CreateJob = () => {
  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "PLUMBING",
    location: "",
    budget: "",
    requiredDate: "",
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

    try {
      startLoading();
      const newJob = await createJob(formData);
      toast.success("Job created successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000); // Redirect after 1 second
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-8">Create New Job</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}

        <div>
          <label className="block mb-2 font-medium">Job Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter job title"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Description */}

        <div>
          <label className="block mb-2 font-medium">Description</label>

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the work..."
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Category */}

        <div>
          <label className="block mb-2 font-medium">Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
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

        {/* Budget */}

        <div>
          <label className="block mb-2 font-medium">Budget</label>

          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Enter budget"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Location */}

        <div>
          <label className="block mb-2 font-medium">Location</label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Required Date */}

        <div>
          <label className="block mb-2 font-medium">Required Date</label>

          <input
            type="date"
            name="requiredDate"
            value={formData.requiredDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
