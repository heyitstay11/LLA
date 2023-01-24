import Login from "../pages/Login";
import App from "../App";
import { ToastContainer } from "react-toastify";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { it, describe, expect, vi } from "vitest";
import axios from "axios";
axios.post = vi.fn();

describe("Login Page", () => {
  it("Header on Page", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/Knowledge of languages is the doorway to wisdom/i)
    ).toBeDefined();
  });

  it("Quote on Page", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/f you talk to a man in a language he understands/i)
    ).toBeDefined();
  });

  it("Quote Name on Page", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText(/Nelson Mandela/i)).toBeDefined();
  });

  it("Login Form Header", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText(/Log in/i)).toBeDefined();
  });

  it("Email Label", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText(/email/i)).toBeDefined();
  });

  it("Email Input", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByLabelText("Email")).toBeDefined();
  });

  it("Password Label", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText("Password")).toBeDefined();
  });
});

describe("Login Page Functionality", () => {
  it("Email Input", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "a@mail.com" } });
    expect(emailInput.value).toBe("a@mail.com");
  });

  it("Password Input", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    expect(passwordInput.value).toBe("123456");
  });

  it("Submit Button", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const submitButton = screen.getByRole("button");
    expect(submitButton.value).toBeDefined();
  });

  it("Submit with no Email", async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <ToastContainer />
        <App />
      </MemoryRouter>
    );
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    expect(passwordInput.value).toBe("123456");
    const submitButton = screen.getByText("Submit");
    expect(submitButton.value).toBeDefined();
    fireEvent.click(submitButton);
    expect(await screen.findByText(/Please Enter Email/i)).toBeDefined();
  });

  it("Proper Submission", async () => {
    axios.post.mockResolvedValue({
      data: {
        token: "12345",
        name: "Abc",
        email: "a@mail.com",
      },
    });
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <ToastContainer />
        <App />
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "a@mail.com" } });
    expect(emailInput.value).toBe("a@mail.com");
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    expect(passwordInput.value).toBe("123456");
    const submitButton = screen.getByText("Submit");
    expect(submitButton.value).toBeDefined();
    fireEvent.click(submitButton);
    expect(axios.post).toBeCalledTimes(1);
  });
});
