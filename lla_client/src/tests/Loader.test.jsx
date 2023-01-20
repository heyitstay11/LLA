import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loading from "../pages/Loading";

describe("Loader Suite", () => {
  it("Default Loader", () => {
    render(<Loading />);
    expect(screen.getByText(/Loading/)).toBeDefined();
  });
  it("Custom Message Loader", () => {
    render(<Loading msg="Please Wait ..." />);
    expect(screen.getByText(/Please Wait/i)).toBeDefined();
  });
});
