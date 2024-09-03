import axios from "axios";
import { Book } from "../../../interfaces/book";
import axiosInstance from "../../../utils/axios-interceptor";
import { showSuccessToast, showErrorToast } from "../../toast";

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await axiosInstance.get("/books/get-books");
    if (!response.data) {
      throw new Error("Failed to fetch books");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(
        "Error",
        error.response.data.message || "Failed to fetch books",
      );
    } else {
      showErrorToast("Error", "Failed to fetch books due to an unknown error");
    }
    throw error;
  }
};

export const fetchBookById = async (_id: string): Promise<Book | undefined> => {
  try {
    const response = await axiosInstance.get(`/books/get-book/${_id}`);
    if (!response.data) {
      throw new Error("Book not found");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(
        "Error",
        error.response.data.message || "Failed to fetch book",
      );
    } else {
      showErrorToast("Error", "Failed to fetch book due to an unknown error");
    }
    throw error;
  }
};

export const addBook = async (book: Book): Promise<void> => {
  try {
    const response = await axiosInstance.post("/books/add-book", book);
    if (!response.data) {
      throw new Error("Failed to add book");
    }
    showSuccessToast("Success", "Book added successfully");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(
        "Error",
        error.response.data.message || "Failed to add book",
      );
    } else {
      showErrorToast("Error", "Failed to add book due to an unknown error");
    }
    throw error;
  }
};

export const deleteBookById = async (bookId: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.delete(`/books/delete-book/${bookId}`);
    if (response.status !== 200) {
      throw new Error("Failed to delete book");
    }
    showSuccessToast("Success", "Book deleted successfully");
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(
        "Error",
        error.response.data.message || "Failed to delete book",
      );
    } else {
      showErrorToast("Error", "Failed to delete book due to an unknown error");
    }
    throw error;
  }
};
