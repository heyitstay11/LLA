import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { ThemeProvider } from "./context/theme";
axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}/api`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
