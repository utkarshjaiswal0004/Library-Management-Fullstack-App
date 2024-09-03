const express = require("express");
const router = express.Router();
const { borrowBook, returnBook } = require("../controllers/user-controller");

const authenticateJWT = require("../middlewares/auth-middleware");
router.post("/borrow", authenticateJWT, borrowBook);
router.post("/return", authenticateJWT, returnBook);

module.exports = router;
