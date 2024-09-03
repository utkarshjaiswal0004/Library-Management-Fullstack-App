const User = require("../models/user-model");
const Book = require("../models/book-model");

const borrowBook = async (userId, bookId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (user.borrowedBooks.length >= 2) {
    throw new Error("Borrowing limit reached");
  }

  const book = await Book.findById(bookId);
  if (!book) throw new Error("Book not found");
  if (book.copies <= 0) throw new Error("Book not available");

  user.borrowedBooks.push(bookId);
  book.copies -= 1;

  if (book.copies === 0) {
    await book.remove();
  } else {
    await book.save();
  }

  await user.save();
};

const returnBook = async (userId, bookId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const index = user.borrowedBooks.indexOf(bookId);
  if (index > -1) {
    user.borrowedBooks.splice(index, 1);
    const book = await Book.findById(bookId);
    if (book) {
      book.copies += 1;
      await book.save();
    }
    await user.save();
  } else {
    throw new Error("Book not in borrowed list");
  }
};

const fetchBorrowedBooks = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const borrowedBookIds = user.borrowedBooks;
    const borrowedBooks = await Book.find({ _id: { $in: borrowedBookIds } });

    return borrowedBooks;
  } catch (error) {
    throw new Error(`Error fetching borrowed books: ${error.message}`);
  }
};

module.exports = {
  borrowBook,
  returnBook,
  fetchBorrowedBooks,
};
