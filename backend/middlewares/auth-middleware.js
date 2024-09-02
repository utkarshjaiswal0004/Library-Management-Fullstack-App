const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authenticateJWT = async (req, res, next) => {
  try {
    // Extract the authorization header
    const authHeader = req.headers.authorization;

    // Check if the authorization header is present and correctly formatted
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Token missing or malformed" });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    } else if (err.name === "TokenExpiredError") {
      return res.status(403).json({ error: "Forbidden: Token expired" });
    }

    res
      .status(500)
      .json({ error: "Internal Server Error: Something went wrong" });
  }
};

module.exports = authenticateJWT;
