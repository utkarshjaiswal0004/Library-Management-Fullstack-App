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
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await authService.loginUser(
      email,
      password
    );
    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token provided" });
    }

    const newAccessToken = await authService.refreshToken(refreshToken);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token provided" });
    }

    await authService.logoutUser(refreshToken);
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

module.exports = { register, login, refreshToken, logout };
