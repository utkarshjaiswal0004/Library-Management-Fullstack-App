const authService = require("../services/auth-service");

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

module.exports = { login, refreshToken, logout };
