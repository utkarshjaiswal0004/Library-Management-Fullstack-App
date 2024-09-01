import { useState, useEffect } from "react";
import { Book } from "../../interfaces/book";
import { seedBooks } from "../../seed/book";

// Shimmer effect CSS
const shimmer = `
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    50% { background-position: 0px 0; }
    100% { background-position: 1000px 0; }
  }
  .shimmer {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 3s infinite;
  }
`;

const Library: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setBooks(seedBooks);
      setLoading(false);
    }, 1000);
  }, []);

  const handleBookClick = (book: Book) => {
    console.log("Book clicked:", book);
  };

  return (
    <div className="p-6 bg-backgroundLight min-h-screen">
      <style>{shimmer}</style>
      <h1 className="text-3xl font-bold text-primary mb-6">Library</h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="w-full h-48 shimmer"></div>
              <div className="p-4">
                <div className="bg-gray-200 h-6 mb-2 shimmer"></div>
                <div className="bg-gray-200 h-4 shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      ) : books.length === 0 ? (
        <p className="text-center text-textDark">No books available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleBookClick(book)}
            >
              <div className="relative">
                <img
                  src={book.imageUrl || "/placeholder-image.jpg"}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  onLoad={() => setLoading(false)}
                />
                {!book.imageUrl && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400">No Image Available</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-primary">
                  {book.title}
                </h2>
                <p className="text-md text-textDark mt-1">
                  Author: {book.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
