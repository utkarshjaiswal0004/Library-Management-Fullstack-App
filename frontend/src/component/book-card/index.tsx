import { Book } from "../../interfaces/book";

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  return (
    <div
      className="overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer"
      onClick={() => onClick(book)}
    >
      <div className="relative">
        <img
          src={book.imageUrl || "/placeholder-image.jpg"}
          alt={book.title}
          className="object-cover w-full h-48"
          loading="lazy"
        />
        {!book.imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400">No Image Available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-primary">{book.title}</h2>
        <p className="mt-1 text-md text-textDark">Author: {book.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
