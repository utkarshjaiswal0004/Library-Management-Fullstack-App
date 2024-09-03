import axios from "axios";
import API_URL from "../../../config/config";
import { Book } from "../../../interfaces/book";

export const borrowBook = async (
  userId: string,
  bookId: string,
  accessToken?: string,
): Promise<boolean | undefined> => {
  try {
    const response = await axios.post(
      `${API_URL}users/borrow`,
      {
        userId,
        bookId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (!response.data) {
      throw new Error("Book not found");
    }

    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to fetch book");
    } else {
      throw new Error("Failed to fetch book due to an unknown error");
    }
  }
};

export const returnBook = async (
  userId: string,
  bookId: string,
  accessToken?: string,
): Promise<boolean | undefined> => {
  try {
    const response = await axios.post(
      `${API_URL}users/return`,
      {
        userId,
        bookId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (!response.data) {
      throw new Error("Book not found");
    }

    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to fetch book");
    } else {
      throw new Error("Failed to fetch book due to an unknown error");
    }
  }
};

export const fetchBorrowedBooks = async (
  userId: string,
  accessToken?: string,
): Promise<Book[]> => {
  try {
    const response = await axios.post(
      `${API_URL}users/borrowed-books`,
      { userId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch borrowed books");
    }
    const bookList = response.data as Book[];
    return bookList;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const errorMessage =
        status === 404
          ? "No borrowed books found"
          : status === 401
            ? "Unauthorized access"
            : "Failed to fetch borrowed books";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        "An unknown error occurred while fetching borrowed books",
      );
    }
  }
};
