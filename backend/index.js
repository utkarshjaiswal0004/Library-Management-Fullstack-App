const express = require("express");
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth-route");
const bookRoutes = require("./routes/book-route");
const userRoutes = require("./routes/user-route");
const authenticateJWT = require("./middlewares/auth-middleware");
const cors = require("cors");

const cookieParser = require("cookie-parser");

require("dotenv").config();

// Connect to the database
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Routes
app.use(authenticateJWT);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
