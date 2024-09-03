import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../../interfaces/book";
import BookCard from "../../component/book-card";
import Button from "../../component/button";
import ShimmerCard from "../../component/shimmer-card";
import {
  fetchBorrowedBooks,
  returnBook,
} from "../../services/user/user-service";
import { useAuth } from "../../context/auth-context/use-auth-context";

const BorrowedBooks: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);
  const { user, updateUserBorrowedBooks } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadBorrowedBooks = async () => {
      if (user) {
        const books = await fetchBorrowedBooks(user._id);
        setBorrowedBooks(books);
        setLoading(false);
      }
    };

    loadBorrowedBooks();
  }, [user]);

  const handleReturnBook = async (bookId: string) => {
    const status = await returnBook(user?._id ?? "", bookId);
    if (status) {
      updateUserBorrowedBooks(bookId, true);
      setBorrowedBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== bookId),
      );
    }
  };

  const handleBookClick = (book: Book) => {
    navigate(`/book/${book._id}`);
  };

  return (
    <div className="min-h-screen p-6 bg-backgroundLight">
      <h1 className="mb-6 text-3xl font-bold text-primary">Borrowed Books</h1>
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      ) : borrowedBooks.length === 0 ? (
        <p className="text-center text-textDark">No borrowed books</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {borrowedBooks.map((book) => (
            <div key={book._id} className="flex flex-col">
              <BookCard book={book} onClick={() => handleBookClick(book)} />
              <Button
                className=" bg-secondary hover:bg-primary"
                onClick={() => handleReturnBook(book?._id ?? "")}
              >
                Return Book
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;
