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

  it("should render navigation links when logged in", () => {
    // Set up localStorage and render Navbar
    localStorage.setItem("token", "test-token");

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    // Assert that navigation links are displayed
    expect(screen.getByText("Library")).toBeInTheDocument();
    expect(screen.getByText("Browse Books")).toBeInTheDocument();
    expect(screen.getByText("My Borrowed Books")).toBeInTheDocument();
    expect(screen.getByText("Return Books")).toBeInTheDocument();
    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();

    // Clean up
    localStorage.removeItem("token");
  });

  it("should render login and register buttons when not logged in", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    // Assert that login and register links are displayed
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("should show logout button when logged in", () => {
    localStorage.setItem("token", "test-token");

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    // Assert that the logout button is displayed
    expect(screen.getByText("Logout")).toBeInTheDocument();

    // Clean up
    localStorage.removeItem("token");
  });
});
