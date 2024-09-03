import React, { useEffect, useState } from "react";
import Button from "../button";
import { useAuth } from "../../context/auth-context";
import { borrowBook, returnBook } from "../../services/user/user-service";
import { deleteBookById } from "../../services/book/book-service";
import { useNavigate } from "react-router-dom";
import "./book-info.css";
interface BookInfoProps {
  bookId: string;
  author: string;
  title: string;
  description: string;
  copies: number;
  isAvailable: boolean;
}

const BookInfo: React.FC<BookInfoProps> = ({
  bookId,
  author,
  title,
  description,
  copies,
  isAvailable,
}) => {
  const { user, accessToken, updateUserBorrowedBooks } = useAuth();
  const [isBorrowed, setIsBorrowed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCopies, setCurrentCopies] = useState<number>(copies);

  const navigate = useNavigate();

  useEffect(() => {
    setIsBorrowed(user?.borrowedBooks?.includes(bookId) ?? false);
  }, [user, bookId]);

  useEffect(() => {
    setCurrentCopies(copies);
  }, [copies]);

  const handleReturnBook = async () => {
    setIsLoading(true);
    try {
      const status = await returnBook(
        user?._id ?? "",
        bookId,
        accessToken ?? "",
      );
      if (status) {
        setCurrentCopies((prevCopies) => prevCopies + 1);
        updateUserBorrowedBooks(bookId, true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBorrowBook = async () => {
    setIsLoading(true);
    try {
      const status = await borrowBook(
        user?._id ?? "",
        bookId,
        accessToken ?? "",
      );
      if (status) {
        setCurrentCopies((prevCopies) => prevCopies - 1);
        updateUserBorrowedBooks(bookId, false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBook = async () => {
    setIsLoading(true);
    try {
      const status = await deleteBookById(bookId, accessToken ?? "");
      if (status) {
        if (user?.borrowedBooks?.includes(bookId)) {
          updateUserBorrowedBooks(bookId, false);
        }
        navigate("/library");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center p-8">
      <div className="text-sm font-bold tracking-wide uppercase text-secondary">
        {author}
      </div>
      <h1 className="mt-2 text-4xl font-extrabold leading-tight text-primary">
        {title}
      </h1>
      <div className="mt-4 text-lg description-container text-textDark">
        {description}
      </div>
      <div className="flex flex-row items-center mt-6 space-x-4">
        <div
          className={`text-sm font-semibold ${isAvailable ? "text-textDark" : "text-accent"}`}
        >
          Total Copies: {currentCopies}
        </div>
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full ${
            isAvailable
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {isAvailable ? "Available" : "Out of Stock"}
        </span>
      </div>
      {isBorrowed ? (
        <div className="mt-6">
          <Button
            disabled={isLoading}
            className="hover:bg-primary bg-secondary"
            onClick={handleReturnBook}
          >
            Return Book
          </Button>
        </div>
      ) : isAvailable ? (
        <div className="mt-6">
          <Button
            disabled={isLoading}
            className="hover:bg-primary bg-success"
            onClick={handleBorrowBook}
          >
            Borrow Book
          </Button>
        </div>
      ) : null}
      {user?.role === "admin" && (
        <div className="mt-6">
          <Button
            disabled={isLoading}
            className="hover:bg-backgroundDark bg-accent"
            onClick={deleteBook}
          >
            Delete Book
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookInfo;
