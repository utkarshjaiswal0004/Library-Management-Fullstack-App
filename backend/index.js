const express = require("express");
const app = express();
const connectDB = require("./config/db");
const bookRoutes = require("./routes/book-route");
const userRoutes = require("./routes/user-route");
const authenticateJWT = require("./middlewares/auth-middleware"); // Import your JWT middleware

require("dotenv").config();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(authenticateJWT); // Apply JWT authentication middleware to all routes

// Routes
app.use("/books", bookRoutes);
app.use("/users", userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
