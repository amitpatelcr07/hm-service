import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../../services/auth.service";
import { useLoading } from "../../hooks/useLoading";

const Register = () => {
  const navigate = useNavigate();

  const { startLoading, stopLoading } = useLoading();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "CUSTOMER",
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

      const response = await registerUser(formData);

      console.log("Registration response:", response);

      toast.success(response.message || "Registration successful!");

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Header */}

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">HomeConnect</h1>

          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            Create Account
          </h2>

          <p className="text-gray-500 mt-2">
            Join HomeConnect as a customer or worker
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              minLength={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              I want to register as
            </label>

            <div className="grid grid-cols-2 gap-4">
              {/* Customer */}

              <label
                className={`border rounded-lg p-4 cursor-pointer text-center transition ${
                  formData.role === "CUSTOMER"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="CUSTOMER"
                  checked={formData.role === "CUSTOMER"}
                  onChange={handleChange}
                  className="sr-only"
                />

                <div className="font-semibold text-gray-800">Customer</div>

                <p className="text-xs text-gray-500 mt-1">
                  Create and manage jobs
                </p>
              </label>

              {/* Worker */}

              <label
                className={`border rounded-lg p-4 cursor-pointer text-center transition ${
                  formData.role === "WORKER"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="WORKER"
                  checked={formData.role === "WORKER"}
                  onChange={handleChange}
                  className="sr-only"
                />

                <div className="font-semibold text-gray-800">Worker</div>

                <p className="text-xs text-gray-500 mt-1">
                  Find and apply for jobs
                </p>
              </label>
            </div>
          </div>

          {/* Submit */}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Create Account
          </button>
        </form>

        {/* Login */}

        <div className="text-center mt-6">
          <p className="text-gray-500">Already have an account?</p>

          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
