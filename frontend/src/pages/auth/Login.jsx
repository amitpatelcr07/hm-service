import { useState } from "react";
import { loginUser } from "../../services/auth.service";
import toast from "react-hot-toast";
import { saveAuthToken, saveUser } from "../../utils/authStorage";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      login(response.token, response.data);

      toast.success(response.message);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
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

          {/* People */}
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

          {/* Connectors */}
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

          {/* Floating cards */}
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
            Post a job. Find the right worker.
          </p>
          <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
            Customers post work, verified workers apply — track everything in
            one place.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <h1 className="mb-2 text-center text-2xl font-bold sm:text-3xl md:hidden text-blue-600">
            HomeConnect
          </h1>

          <p className="text-gray-500 text-center mb-8">
            Login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium text-gray-700">Password</label>
                <NavLink
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </NavLink>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className="font-semibold text-blue-600 hover:underline"
              >
                Register
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
