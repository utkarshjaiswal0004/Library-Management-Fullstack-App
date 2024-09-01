import { Book } from "../../../interfaces/book";
import { seedBooks } from "../../../seed/book";

// Simulating a delay to mimic an API call for fetching all books
export const fetchBooks = (): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(seedBooks);
    }, 1000);
  });
};

// Function to fetch a book by its ID
export const fetchBookById = (id: string): Promise<Book | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const book = seedBooks.find((book) => book.id === id);
      resolve(book);
    }, 1000);
  });
};
