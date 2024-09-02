const User = require("../models/user-model");
const { hashPassword } = require("../utils/auth-utils");
const jwt = require("jsonwebtoken");

const registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = hashPassword(password);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  return newUser;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid email or password");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return { user, accessToken, refreshToken };
};

const refreshToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = user.generateAccessToken();
  return newAccessToken;
};

const fetchUserFromToken = async (accessToken) => {
  const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
  fetchUserFromToken,
};
