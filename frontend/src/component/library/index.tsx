import { useState, useEffect } from "react";
import { Book } from "../../interfaces/book";
import { fetchBooks } from "../../services/book/book-service";
import BookCard from "../book-card";
import ShimmerCard from "../shimmer-card";
const Library: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      const books = await fetchBooks();
      setBooks(books);
      setLoading(false);
    };

    loadBooks();
  }, []);

  const handleBookClick = (book: Book) => {
    console.log("Book clicked:", book);
  };

  return (
    <div className="p-6 bg-backgroundLight min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-6">Library</h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      ) : books.length === 0 ? (
        <p className="text-center text-textDark">No books available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onClick={handleBookClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
