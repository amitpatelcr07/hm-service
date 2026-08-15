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
    <div className="min-h-screen flex bg-slate-100">
      {/* Left illustration panel - hidden on mobile */}
      <div className="hidden md:flex md:w-1/2 relative bg-[#0B3D63] overflow-hidden items-end">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 340 460"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect x="0" y="0" width="340" height="460" fill="#0B3D63" />
          <circle cx="290" cy="70" r="120" fill="#0F4A78" opacity="0.6" />
          <circle cx="20" cy="420" r="140" fill="#0F4A78" opacity="0.5" />

          <g transform="translate(70,300)">
            <circle cx="0" cy="-34" r="16" fill="#F0997B" />
            <path d="M-22 40 Q -22 -2 0 -2 Q 22 -2 22 40 Z" fill="#D85A30" />
          </g>
          <g transform="translate(150,320)">
            <circle cx="0" cy="-34" r="16" fill="#FAC775" />
            <path d="M-22 40 Q -22 -2 0 -2 Q 22 -2 22 40 Z" fill="#BA7517" />
          </g>
          <g transform="translate(230,300)">
            <circle cx="0" cy="-34" r="16" fill="#9FE1CB" />
            <path d="M-22 40 Q -22 -2 0 -2 Q 22 -2 22 40 Z" fill="#0F6E56" />
          </g>

          <line
            x1="90"
            y1="260"
            x2="150"
            y2="180"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            opacity="0.5"
          />
          <line
            x1="150"
            y1="180"
            x2="215"
            y2="255"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            opacity="0.5"
          />

          <g transform="translate(105,120)">
            <rect x="0" y="0" width="130" height="56" rx="10" fill="#ffffff" />
            <circle cx="20" cy="28" r="12" fill="#E6F1FB" />
            <path
              d="M15 28 L19 32 L26 23"
              stroke="#185FA5"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="40" y="24" fontSize="11" fontWeight="600" fill="#0C447C">
              Job posted
            </text>
            <text x="40" y="38" fontSize="9" fill="#5F5E5A">
              Plumber needed
            </text>
          </g>

          <g transform="translate(45,190)">
            <rect x="0" y="0" width="120" height="50" rx="10" fill="#ffffff" />
            <circle cx="18" cy="25" r="11" fill="#EAF3DE" />
            <path
              d="M12 25 L16 29 L24 20"
              stroke="#3B6D11"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="36" y="22" fontSize="10" fontWeight="600" fill="#27500A">
              Application sent
            </text>
            <text x="36" y="35" fontSize="9" fill="#5F5E5A">
              2 min ago
            </text>
          </g>

          <g transform="translate(185,205)">
            <rect x="0" y="0" width="115" height="46" rx="10" fill="#ffffff" />
            <circle cx="18" cy="23" r="10" fill="#FAEEDA" />
            <path
              d="M18 16 L21 22 L27 23 L22 27 L24 33 L18 29 L12 33 L14 27 L9 23 L15 22 Z"
              fill="#854F0B"
            />
            <text x="34" y="20" fontSize="10" fontWeight="600" fill="#633806">
              5.0 rating
            </text>
            <text x="34" y="33" fontSize="9" fill="#5F5E5A">
              Top rated worker
            </text>
          </g>
        </svg>

        <div className="relative z-10 p-10 pb-14">
          <h1 className="text-white text-3xl font-bold mb-3">HomeConnect</h1>
          <p className="text-white text-xl font-medium mb-2 leading-snug">
            Join as a customer or worker
          </p>
          <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
            Post jobs and get them done, or find work that fits your skills —
            all in one platform.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 md:hidden">
              HomeConnect
            </h1>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Create account
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
    </div>
  );
};

export default Register;
