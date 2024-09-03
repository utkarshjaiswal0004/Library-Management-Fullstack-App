const userService = require("../services/user-service");

const borrowBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
      return res
        .status(400)
        .json({ error: "User ID and Book ID are required" });
    }
    await userService.borrowBook(userId, bookId);
    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
      return res
        .status(400)
        .json({ error: "User ID and Book ID are required" });
    }
    await userService.returnBook(userId, bookId);
    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  borrowBook,
  returnBook,
};
