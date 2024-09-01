import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BookCard from "../component/book-card";
import { Book } from "../interfaces/book";

describe("BookCard Component", () => {
  const book: Book = {
    id: "1",
    title: "Book 1",
    author: "Author 1",
    imageUrl: "/image1.jpg",
    copies: 0,
    description: "",
  };

  it("should render book card with correct details", () => {
    render(<BookCard book={book} onClick={() => {}} />);

    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Author: Author 1")).toBeInTheDocument();
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", book.imageUrl);
  });

  it("should handle click event", () => {
    const handleClick = vi.fn();
    render(<BookCard book={book} onClick={handleClick} />);

    const bookCard = screen.getByText("Book 1");
    fireEvent.click(bookCard);

    expect(handleClick).toHaveBeenCalledWith(book);
  });
});
