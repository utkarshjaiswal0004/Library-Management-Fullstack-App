const bcrypt = require("bcrypt");

// Hash password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Compare passwords
const comparePassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
