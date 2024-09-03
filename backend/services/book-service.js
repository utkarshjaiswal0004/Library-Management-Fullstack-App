const Book = require("../models/book-model");

const createBook = async (bookData) => {
  const existingBook = await Book.findOne({
    title: bookData.title,
    author: bookData.author,
  });

  if (existingBook) {
    throw new Error("A book with the same title and author already exists.");
  }

  const book = new Book(bookData);
  await book.save();
};

const getBooks = async () => {
  return Book.find();
};

const getBookById = async (bookId) => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new Error("Book not found");
  }
  return book;
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
};
