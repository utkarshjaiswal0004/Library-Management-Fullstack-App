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
    res.status(500).json({ error: "Failed to borrow book: " + error.message });
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
    res.status(500).json({ error: "Failed to return book: " + error.message });
  }
};

const getBorrowedBooks = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const books = await userService.fetchBorrowedBooks(userId);
    return res.status(200).json(books);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch borrowed books: " + error.message });
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getBorrowedBooks,
};
