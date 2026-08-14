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
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-lg sm:p-8">
        <h1 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
          HomeConnect
        </h1>

        <p className="text-gray-500 text-center mb-8">Login to your account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
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
  );
}

export default Login;
