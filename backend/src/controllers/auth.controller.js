import {
  registerUser,
  loginUser,
  verifyEmailService,
  createLoginSession,
  refreshSession,
  revokeRefreshToken,
} from "../services/auth.service.js";
import {
  clearRefreshTokenCookie,
  getRefreshTokenFromRequest,
  setRefreshTokenCookie,
} from "../utils/refresh-token.js";
export const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, password, and role are required",
      });
    }

    if (!["CUSTOMER", "WORKER"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be CUSTOMER or WORKER",
      });
    }

    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    const isEmailDeliveryError =
      error.code?.startsWith("E") ||
      error.code === "ETIMEDOUT" ||
      error.code === "ESOCKET";

    res.status(isEmailDeliveryError ? 503 : 400).json({
      success: false,
      message: isEmailDeliveryError
        ? "Account created, but verification email could not be sent. Please try again later."
        : error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await verifyEmailService(token);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    const user = await loginUser(email, password);
    if (user) {
      const session = await createLoginSession(user);
      setRefreshTokenCookie(res, session.refreshToken);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: user,
        token: session.accessToken,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const refresh = async (req, res) => {
  try {
    const rawRefreshToken = getRefreshTokenFromRequest(req);
    if (!rawRefreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "Refresh token is missing" });
    }

    const session = await refreshSession(rawRefreshToken);
    setRefreshTokenCookie(res, session.refreshToken);
    return res.status(200).json({
      success: true,
      data: session.user,
      token: session.accessToken,
    });
  } catch (error) {
    clearRefreshTokenCookie(res);
    return res
      .status(error.statusCode || 401)
      .json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  await revokeRefreshToken(getRefreshTokenFromRequest(req));
  clearRefreshTokenCookie(res);
  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};
