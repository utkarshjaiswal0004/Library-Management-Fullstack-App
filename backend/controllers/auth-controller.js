const authService = require("../services/auth-service");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await authService.registerUser(name, email, password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred during registration: " + error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { user, accessToken, refreshToken } = await authService.loginUser(
      email,
      password
    );

    // Setting the refresh token in HTTP-only cookie for saver access
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user, accessToken });
  } catch (error) {
    res.status(401).json({ error: "Invalid credentials: " + error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).json({ error: "Access token is required" });
    }

    const newAccessToken = await authService.refreshToken(refreshToken);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res
      .status(403)
      .json({ error: "Invalid or expired refresh token: " + error.message });
  }
};

const fetchUserFromToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ error: "Access token is required" });
    }

    const accessToken = authHeader.split(" ")[1];
    const user = await authService.fetchUserFromToken(accessToken);
    res.status(200).json({ user });
  } catch (error) {
    res
      .status(403)
      .json({ error: "Invalid or expired access token: " + error.message });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not provided" });
    }

    // Clearing the refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(204).json({ message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred during logout: " + error.message });
  }
};
module.exports = { register, login, refreshToken, fetchUserFromToken, logout };
