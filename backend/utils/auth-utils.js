const bcrypt = require("bcrypt");

// Hash password before saving user
const hashPassword = async (user) => {
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
};

// Compare passwords
const comparePassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
