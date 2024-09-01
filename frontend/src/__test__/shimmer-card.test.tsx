// src/__tests__/ShimmerCard.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ShimmerCard from "../component/shimmer-card";

describe("ShimmerCard Component", () => {
  it("should render shimmer effect placeholders", () => {
    render(<ShimmerCard />);

    const shimmerElements = screen.getAllByRole("presentation");
    expect(shimmerElements.length).toBe(1);
  });
});
