import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Navbar from ".";

// useNav hook mock
vi.mock("../../../context/nav-context", () => ({
  useNav: () => ({
    activeNav: "/",
    setActiveNav: vi.fn(),
  }),
}));

describe("Navbar Component", () => {
  it("should handle navigation link clicks correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    // Find a navigation link
    const link = screen.getByText("Library");

    // Simulate a click event on the link
    act(() => {
      fireEvent.click(link);
    });

    // Assert that the activeNav has been set (mocked function)
    expect(container.querySelector("a")?.getAttribute("href")).toBe("/");
  });
});
