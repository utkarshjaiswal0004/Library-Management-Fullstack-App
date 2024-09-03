import React, { useEffect, useState } from "react";
import Button from "../button";
import { useAuth } from "../../context/auth-context";

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
  const { user } = useAuth();
  const [isBorrowed, setIsBorrowed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user?.borrowedBooks) {
      setIsBorrowed(user.borrowedBooks.includes(bookId));
    } else {
      setIsBorrowed(false);
    }
  }, [user, bookId]);

  const handleReturnBook = () => {
    setIsLoading(true);
    console.log("Return Book functionality needs to be implemented");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-center p-8">
      <div className="text-sm font-bold tracking-wide uppercase text-secondary">
        {author}
      </div>
      <h1 className="mt-2 text-4xl font-extrabold leading-tight text-primary">
        {title}
      </h1>
      <p className="mt-4 text-lg text-textDark">{description}</p>
      <div className="flex flex-row items-center mt-6 space-x-4">
        <div
          className={`text-sm font-semibold ${
            isAvailable ? "text-textDark" : "text-accent"
          }`}
        >
          Total Copies: {copies}
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
          <Button disabled={isLoading}>Reserve Book</Button>
        </div>
      ) : null}
    </div>
  );
};

export default BookInfo;
