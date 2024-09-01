import { Book } from "../../../interfaces/book";
import { seedBooks } from "../../../seed/book";

export const fetchBooks = (): Promise<Book[]> => {
  // Simulating a delay to mimic an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(seedBooks);
    }, 1000);
  });
};
