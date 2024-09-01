const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book-controller");
const authenticateJWT = require("../middlewares/auth-middleware");
const authorizeAdmin = require("../middlewares/authorize-admin");

// Route to create a book (admin only)
router.post("/", authenticateJWT, authorizeAdmin, bookController.createBook);

// Route to get all books
router.get("/", bookController.getBooks);

module.exports = router;
