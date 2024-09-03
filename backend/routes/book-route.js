const express = require("express");
const router = express.Router();
const {
  createBook,
  getBooks,
  getBookById,
} = require("../controllers/book-controller");
const authenticateJWT = require("../middlewares/auth-middleware");
const authorizeAdmin = require("../middlewares/authorize-admin");

// Route to create a book (admin only)
router.post("/add-book", authenticateJWT, authorizeAdmin, createBook);

router.get("/get-books", authenticateJWT, getBooks);

router.get("/get-book/:id", authenticateJWT, getBookById);

module.exports = router;
