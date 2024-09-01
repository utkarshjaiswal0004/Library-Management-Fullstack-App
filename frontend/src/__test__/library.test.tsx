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

  it("should render shimmer effect while loading", async () => {
    // Mock fetchBooks to simulate loading
    (fetchBooks as vi.Mock).mockResolvedValueOnce(new Promise(() => {}));

    render(<Library />);

    // Assert shimmer placeholders are displayed using `waitFor`
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /library/i }),
      ).toBeInTheDocument();
    });

    expect(screen.getByText("Library")).toBeInTheDocument();

    const shimmerElements = screen.getAllByRole("presentation");
    expect(shimmerElements.length).toBeGreaterThan(0);
  });

  it("should render books when data is fetched", async () => {
    const books = [
      { id: "1", title: "Book 1", author: "Author 1", imageUrl: "/image1.jpg" },
      { id: "2", title: "Book 2", author: "Author 2", imageUrl: "/image2.jpg" },
    ];

    // Mock fetchBooks to return test data
    (fetchBooks as vi.Mock).mockResolvedValue(books);

    render(<Library />);

    // Wait for books to be displayed
    await waitFor(() => {
      expect(screen.getByText("Book 1")).toBeInTheDocument();
      expect(screen.getByText("Author: Author 1")).toBeInTheDocument();
      expect(screen.getByText("Book 2")).toBeInTheDocument();
      expect(screen.getByText("Author: Author 2")).toBeInTheDocument();
    });
  });
});
