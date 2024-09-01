const express = require("express");
const router = express.Router();
const { borrowBook, returnBook } = require("../controllers/user-controller");

router.post("/borrow", borrowBook);
router.post("/return", returnBook);

module.exports = router;
