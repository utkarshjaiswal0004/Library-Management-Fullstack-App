import React, { useEffect, useState } from "react";
import Button from "../button";
import { borrowBook, returnBook } from "../../services/user/user-service";
import { deleteBookById } from "../../services/book/book-service";
import { useNavigate } from "react-router-dom";
import "./book-info.css";
import { useAuth } from "../../context/auth-context/use-auth-context";
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
  const { user, updateUserBorrowedBooks } = useAuth();
  const [isBorrowed, setIsBorrowed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCopies, setCurrentCopies] = useState<number>(copies);
  const [isBookAvailable, setIsBookAvailable] = useState<boolean>(isAvailable);

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
      const status = await returnBook(user?._id ?? "", bookId);
      if (status) {
        setCurrentCopies((prevCopies) => {
          const updatedCopies = prevCopies + 1;
          setIsBookAvailable(updatedCopies > 0);
          return updatedCopies;
        });
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
      const status = await borrowBook(user?._id ?? "", bookId);
      if (status) {
        setCurrentCopies((prevCopies) => {
          const updatedCopies = prevCopies - 1;
          setIsBookAvailable(updatedCopies > 0);
          return updatedCopies;
        });

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
      const status = await deleteBookById(bookId);
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
    <div className="flex flex-col justify-center p-8 text-center md:text-left ">
      <div className="text-sm font-bold tracking-wide uppercase text-secondary">
        {author}
      </div>
      <h1 className="mt-2 text-4xl font-extrabold leading-tight text-primary">
        {title}
      </h1>
      <div className="mt-4 text-lg description-container text-textDark">
        {description}
      </div>
      <div className="flex flex-row items-center mx-auto mt-6 space-x-4 md:mx-0">
        <div
          className={`text-sm font-semibold  ${isBookAvailable ? "text-textDark" : "text-accent"}`}
        >
          Total Copies: {currentCopies}
        </div>
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full ${isBookAvailable
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
            }`}
        >
          {isBookAvailable ? "Available" : "Out of Stock"}
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
            className="bg-red-600 hover:bg-slate-800"
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
