import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../../interfaces/book";
import { fetchBookById } from "../../services/book/book-service";
import BookImage from "../../component/book-image";
import BookInfo from "../../component/book-info";
import { useAuth } from "../../context/auth-context";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | undefined>();
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();

  useEffect(() => {
    const loadBook = async () => {
      if (id) {
        try {
          const bookData = await fetchBookById(id, accessToken ?? "");
          console.log(bookData);
          setBook(bookData);
        } catch (error) {
          console.error("Failed to fetch book:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadBook();
  }, [id, accessToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-backgroundLight">
        <div className="text-lg font-semibold text-primary">Loading...</div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-backgroundLight">
        <div className="text-lg font-semibold text-accent">Book not found</div>
      </div>
    );
  }

  const isAvailable = book.copies > 0;

  return (
    <div className="flex items-center justify-center p-6 bg-backgroundLight">
      <div className="w-full max-w-5xl overflow-hidden bg-white rounded-lg shadow-lg md:flex">
        <BookImage imageUrl={book.imageUrl} title={book.title} />
        <BookInfo
          bookId={book._id ?? ""}
          author={book.author}
          title={book.title}
          description={book.description}
          copies={book.copies}
          isAvailable={isAvailable}
        />
      </div>
    </div>
  );
};

export default BookDetails;
