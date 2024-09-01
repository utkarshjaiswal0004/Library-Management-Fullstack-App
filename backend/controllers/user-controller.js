const userService = require("../services/user-service");

const borrowBook = async (req, res) => {
  try {
    await userService.borrowBook(req.params.userId, req.params.bookId);
    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const returnBook = async (req, res) => {
  try {
    await userService.returnBook(req.params.userId, req.params.bookId);
    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  borrowBook,
  returnBook,
};
