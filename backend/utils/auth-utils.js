const bcryptjs = require("bcryptjs");

// Hash password
const hashPassword = (password) => {
  return bcryptjs.hashSync(password, 10);
};

// Compare passwords
const comparePassword = (candidatePassword, userPassword) => {
  return bcryptjs.compareSync(candidatePassword, userPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
