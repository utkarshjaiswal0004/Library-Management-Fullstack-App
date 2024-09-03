import axiosInstance from "../../../utils/axios-interceptor";
import { Book } from "../../../interfaces/book";
import { showSuccessToast, showErrorToast } from "../../toast";
import axios from "axios";

export const borrowBook = async (
  userId: string,
  bookId: string,
): Promise<boolean | undefined> => {
  try {
    const response = await axiosInstance.post("/users/borrow", {
      userId,
      bookId,
    });
    if (response.status === 200) {
      showSuccessToast("Success", "Book borrowed successfully");
      return true;
    } else {
      throw new Error("Failed to borrow book");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(
        "Error",
        error.response.data.message || "Failed to borrow book",
      );
    } else {
      showErrorToast("Error", "Failed to borrow book due to an unknown error");
    }
    throw error;
  }
};

export const returnBook = async (
  userId: string,
  bookId: string,
): Promise<boolean | undefined> => {
  try {
    const response = await axiosInstance.post("/users/return", {
      userId,
      bookId,
    });
    if (response.status === 200) {
      showSuccessToast("Success", "Book returned successfully");
      return true;
    } else {
      throw new Error("Failed to return book");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(
        "Error",
        error.response.data.message || "Failed to return book",
      );
    } else {
      showErrorToast("Error", "Failed to return book due to an unknown error");
    }
    throw error;
  }
};

export const fetchBorrowedBooks = async (userId: string): Promise<Book[]> => {
  try {
    const response = await axiosInstance.post("/users/borrowed-books", {
      userId,
    });

    if (response.status === 200) {
      return response.data as Book[];
    } else {
      throw new Error("Failed to fetch borrowed books");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const errorMessage =
        status === 404
          ? "No borrowed books found"
          : status === 401
            ? "Unauthorized access"
            : "Failed to fetch borrowed books";
      showErrorToast("Error", errorMessage);
    } else {
      showErrorToast(
        "Error",
        "An unknown error occurred while fetching borrowed books",
      );
    }
    throw error;
  }
};
