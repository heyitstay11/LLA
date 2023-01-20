import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../components";
import { BrowserRouter } from "react-router-dom";

describe("Footer Suite", () => {
  it("Brand Name", () => {
    render(<Footer />, { wrapper: BrowserRouter });
    expect(screen.getAllByText(/LingoMax/)).toBeDefined();
  });

  it("Privacy  Policy", () => {
    render(<Footer />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Privacy/i)).toBeDefined();
  });

  it("Twitter Link", () => {
    const { container } = render(<Footer />, { wrapper: BrowserRouter });
    const twitterLink = container.querySelector(`[title="Twitter"]`);
    expect(twitterLink).toBeDefined();
  });

  it("Instagram Link", () => {
    const { container } = render(<Footer />, { wrapper: BrowserRouter });
    const twitterLink = container.querySelector(`[title="Instagram"]`);
    expect(twitterLink).toBeDefined();
  });

  it("LinkedIn Link", () => {
    const { container } = render(<Footer />, { wrapper: BrowserRouter });
    const twitterLink = container.querySelector(`[title="LinkedIn"]`);
    expect(twitterLink).toBeDefined();
  });
});
