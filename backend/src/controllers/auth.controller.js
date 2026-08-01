import { registerUser, loginUser } from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";
export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
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
    console.log("Email:", email, "Password:", password);
    const user = await loginUser(email, password);
    console.log("User found:", user);
    if (user) {
      const token = generateToken(user);
      console.log("Generated token:", token);
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: user,
        token,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
