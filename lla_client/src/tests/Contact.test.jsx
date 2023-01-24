import { it, describe, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import Contact from "../pages/Contactus";
describe("Contact Page", () => {
  it("Contact Form Header", () => {
    render(<Contact />);
    expect(screen.getByText(/Contact Us/)).toBeDefined();
  });

  it("Address", () => {
    render(<Contact />);
    expect(screen.getByText(/Floor 2 , OfficeHub/)).toBeDefined();
  });

  it("Email", () => {
    render(<Contact />);
    expect(screen.getByText(/lingomax@gmail.com/)).toBeDefined();
  });

  it("Phone", () => {
    render(<Contact />);
    expect(screen.getByText(/123-456-7890/)).toBeDefined();
  });

  it("Name Label", () => {
    render(<Contact />);
    expect(screen.getByText(/Name/)).toBeDefined();
  });

  it("Name Input", () => {
    render(<Contact />);
    expect(screen.getByLabelText(/Name/)).toBeDefined();
  });

  it("Email Label", () => {
    render(<Contact />);
    expect(screen.getByLabelText(/Email/)).toBeDefined();
  });

  it("Message Label", () => {
    render(<Contact />);
    expect(screen.getByLabelText(/Message/)).toBeDefined();
  });

  it("Submit Button", () => {
    render(<Contact />);
    expect(screen.getByText(/Submit/)).toBeDefined();
  });
});
