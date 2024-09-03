import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../../interfaces/book";
import { fetchBooks } from "../../services/book/book-service";
import BookCard from "../../component/book-card";
import ShimmerCard from "../../component/shimmer-card";
import { useAuth } from "../../context/auth-context";

const Library: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [libraryBooks, setLibraryBooks] = useState<Book[]>();

  useEffect(() => {
    const loadBooks = async () => {
      const books = await fetchBooks(accessToken ?? "");
      setLibraryBooks(books);
      setLoading(false);
    };

    loadBooks();
  }, [accessToken, setLibraryBooks]);

  const handleBookClick = (book: Book) => {
    navigate(`/book/${book._id}`);
  };

  return (
    <div className="min-h-screen p-6 bg-backgroundLight">
      <h1 className="mb-6 text-3xl font-bold text-primary">Library</h1>
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      ) : libraryBooks?.length === 0 ? (
        <p className="text-center text-textDark">No books available</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {libraryBooks?.map((book) => (
            <BookCard key={book._id} book={book} onClick={handleBookClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
