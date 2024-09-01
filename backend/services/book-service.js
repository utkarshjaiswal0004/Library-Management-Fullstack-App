const Book = require("../models/book-model");

const createBook = async (bookData) => {
  const book = new Book(bookData);
  await book.save();
};

const getBooks = async () => {
  return Book.find();
};

module.exports = {
  createBook,
  getBooks,
};
