import { it, describe, expect, vi } from "vitest";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Landing on a 404", () => {
  const user = userEvent.setup();
  it("Opens 404", () => {
    render(
      <MemoryRouter initialEntries={["/abcd"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("404")).toBeDefined();
  });

  it("Shows Error Messsage", () => {
    render(
      <MemoryRouter initialEntries={["/abcd"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Sorry, we couldn't find this page/)).toBeDefined();
  });

  it("Render Back Button", () => {
    render(
      <MemoryRouter initialEntries={["/abcd"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Back to homepage/i)).toBeDefined();
  });

  it("Clicking Back Button Redirects to Home", async () => {
    render(
      <MemoryRouter initialEntries={["/abcd"]}>
        <App />
      </MemoryRouter>
    );
    const backBtn = screen.getByText(/Back to homepage/i);
    expect(backBtn).toBeDefined();
    await user.click(backBtn);
    expect(screen.getByText(/A Successful Language/i)).toBeDefined();
  });
});
