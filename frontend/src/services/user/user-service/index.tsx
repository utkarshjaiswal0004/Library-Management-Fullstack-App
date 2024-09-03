import { Book } from "../../../interfaces/book";
import axios from "axios";
import API_URL from "../../../config/config";

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
