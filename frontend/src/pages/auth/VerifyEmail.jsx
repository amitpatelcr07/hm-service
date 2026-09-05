import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { useRef } from "react";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const verificationStarted = useRef(false);

  useEffect(() => {
    if (verificationStarted.current) {
      return;
    }

    verificationStarted.current = true;

    const verifyEmail = async () => {
      try {
        const response = await api.get(`/auth/verify-email/${token}`);

        console.log(response.data);

        setVerified(true);
      } catch (error) {
        console.error(error);

        setError(error.response?.data?.message || "Email verification failed");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Verifying your email...
          </h1>

          <p className="text-gray-500 mt-2">
            Please wait while we verify your account.
          </p>
        </div>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-green-600 text-5xl mb-4">✓</div>

          <h1 className="text-3xl font-bold text-gray-800">Email Verified!</h1>

          <p className="text-gray-500 mt-3">
            Your HomeConnect account has been successfully verified.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-red-500 text-5xl mb-4">✕</div>

        <h1 className="text-3xl font-bold text-gray-800">
          Verification Failed
        </h1>

        <p className="text-gray-500 mt-3">{error}</p>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
