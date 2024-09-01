const mongoose = require("mongoose");
const { hashPassword, comparePassword } = require("../utils/auth-utils");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/token-utils");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

// Hash password before saving user
UserSchema.pre("save", async function (next) {
  await hashPassword(this);
  next();
});

// Compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return comparePassword(candidatePassword, this.password);
};

// Generate JWT tokens
UserSchema.methods.generateAccessToken = function () {
  return generateAccessToken(this);
};

UserSchema.methods.generateRefreshToken = function () {
  return generateRefreshToken(this);
};

module.exports = mongoose.model("User", UserSchema);
