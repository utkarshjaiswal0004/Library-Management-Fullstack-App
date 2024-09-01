import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../../interfaces/book";
import { fetchBookById } from "../../services/book/book-service";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      if (id) {
        const bookData = await fetchBookById(id);
        setBook(bookData);
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

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
        <div className="text-lg font-semibold text-red-500">Book not found</div>
      </div>
    );
  }

  const isAvailable = book.copies > 0;

  return (
    <div className="flex items-center justify-center min-h-screen p-6 pt-0 bg-backgroundLight">
      <div className="w-full max-w-5xl overflow-hidden bg-white rounded-lg shadow-lg md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="object-cover w-full h-full md:w-96"
            src={book.imageUrl || "/placeholder-image.jpg"}
            alt={book.title}
          />
        </div>
        <div className="flex flex-col justify-center p-8">
          <div className="text-sm font-bold tracking-wide text-indigo-600 uppercase">
            {book.author}
          </div>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight text-primary">
            {book.title}
          </h1>
          <p className="mt-4 text-lg text-gray-700">{book.description}</p>
          <div className="flex flex-row items-center mt-6 space-x-4">
            <div
              className={`text-sm font-semibold ${isAvailable ? "text-gray-600" : "text-red-600"}`}
            >
              Total Copies: {book.copies}
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
          <div className="mt-6">
            <button className="px-8 py-3 font-semibold text-white transition duration-200 ease-in-out bg-indigo-600 rounded-md shadow hover:bg-indigo-500">
              Reserve Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
