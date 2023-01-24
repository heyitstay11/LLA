import { it, describe, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { Navbar } from "../components";
import { AuthContext } from "../context/auth";
import axios from "axios";
vi.mock("axios");
axios.get = vi.fn();

describe("Navbar Suite", () => {
  const user = userEvent.setup();
  axios.get.mockResolvedValue({
    data: [
      {
        _id: {
          $oid: "63a86b9284a1c7ce94711eb6",
        },
        title: "First Course",
        details: "Lorem ipsum dolor sit amet",
        proficiency: "Intermediate",
        price: "400",
        thumbnail:
          "https://res.cloudinary.com/dtrzqfnui/image/upload/v1671981028/dgdkyf8b3kcku4suhqg8.png",
        learnings: [";lw;w", "\\d'\\"],
        __v: 0,
      },
    ],
  });

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

    await user.click(screen.getByText("Courses"));
    expect(axios.get).toBeCalledTimes(1);
    expect(await screen.findByText(/Featured Courses/i)).toBeDefined();
    expect(await screen.findByText(/First Course/i)).toBeDefined();
  });

  it("Check Courses Card", async () => {
    render(<App />, { wrapper: BrowserRouter });

    await user.click(screen.getByText("Courses"));
    expect(axios.get).toBeCalledTimes(2);
    await waitFor(() => {
      expect(screen.findByText(/First Course/i)).toBeDefined();
    });
  });
});

describe("Authenticated Navbar", () => {
  it("Dashboard Link", () => {
    render(
      <AuthContext.Provider
        value={{
          auth: {
            token: "1234",
            email: "a@mail.com",
            name: "A_tester",
          },
        }}
      >
        <Navbar />
      </AuthContext.Provider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByText(/Dashboard/)).toBeDefined();
  });
});
