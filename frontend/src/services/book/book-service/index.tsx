import { Book } from "../../../interfaces/book";
import { seedBooks } from "../../../seed/book";
import axios from "axios";
import API_URL from "../../../config/config";

export const fetchBooks = async (accessToken?: string): Promise<Book[]> => {
  try {
    const response = await axios.get(`${API_URL}books/get-books`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.data) {
      throw new Error(response.data.message || "Failed to add book");
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to add book");
    } else {
      throw new Error("Failed to add book due to an unknown error");
    }
  }
};

export const fetchBookById = async (
  _id: string,
  accessToken?: string,
): Promise<Book | undefined> => {
  try {
    const response = await axios.get(`${API_URL}books/get-book/${_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.data) {
      throw new Error("Book not found");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to fetch book");
    } else {
      throw new Error("Failed to fetch book due to an unknown error");
    }
  }
};

export const addBook = async (
  book: Book,
  accessToken?: string,
): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}books/add-book`, book, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to add book");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to add book");
    } else {
      throw new Error("Failed to add book due to an unknown error");
    }
  }
};
