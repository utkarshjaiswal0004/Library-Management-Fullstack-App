const bookService = require("../services/book-service");

const createBook = async (req, res) => {
  try {
    await bookService.createBook(req.body);
    res.status(201).json({ message: "Book created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await bookService.getBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books: " + error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book: " + error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await bookService.deleteBookById(id);
    if (result) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete book: " + error.message });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  deleteBook,
};
