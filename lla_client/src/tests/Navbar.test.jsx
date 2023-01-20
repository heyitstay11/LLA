import { it, describe, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Navbar Suite", () => {
  const user = userEvent.setup();

  it("Check Home Navigation", async () => {
    render(<App />, { wrapper: BrowserRouter });

    expect(
      screen.getByText(/A Successful Language Learning Experience/i)
    ).toBeDefined();
  });

  it("Check Login Navigation", async () => {
    render(<App />, { wrapper: BrowserRouter });

    expect(
      screen.getByText(/A Successful Language Learning Experience/i)
    ).toBeDefined();

    await user.click(screen.getByText(/LogIn/i));
    expect(
      screen.getByText(/Knowledge of languages is the doorway to wisdom/i)
    ).toBeDefined();
  });

  it("Check Contact Us Navigation", async () => {
    render(<App />, { wrapper: BrowserRouter });

    await user.click(screen.getByText(/Contact/i));
    expect(screen.getByText(/Contact Us/i)).toBeDefined();
  });

  it("Check Courses Navigation", async () => {
    render(<App />, { wrapper: BrowserRouter });

    await user.click(screen.getByText(/Courses/i));
    expect(await screen.findByText(/Featured Courses/i)).toBeDefined();
  });
});
