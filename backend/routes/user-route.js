const express = require("express");
const router = express.Router();
const {
  borrowBook,
  returnBook,
  getBorrowedBooks,
} = require("../controllers/user-controller");

const authenticateJWT = require("../middlewares/auth-middleware");
router.post("/borrow", authenticateJWT, borrowBook);
router.post("/return", authenticateJWT, returnBook);
router.post("/borrowed-books", authenticateJWT, getBorrowedBooks);

module.exports = router;
