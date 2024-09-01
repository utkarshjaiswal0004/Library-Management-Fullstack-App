import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Library from "../pages/library";
import { fetchBooks } from "../services/book/book-service";

// Mock the fetchBooks function
vi.mock("../services/book/book-service", () => ({
  fetchBooks: vi.fn(),
}));

describe("Library Component", () => {

  it("should handle book click", async () => {
    const books = [
      { id: "1", title: "Book 1", author: "Author 1", imageUrl: "/image1.jpg" },
    ];
    (fetchBooks as vi.Mock).mockResolvedValue(books);

    // Mock console.log to test the click event
    const consoleLog = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<Library />);

    // Wait for book card to appear and then simulate a click
    await waitFor(() => {
      const bookCard = screen.getByText("Book 1");
      fireEvent.click(bookCard);
    });

    expect(consoleLog).toHaveBeenCalledWith("Book clicked:", books[0]);
    consoleLog.mockRestore();
  });
});