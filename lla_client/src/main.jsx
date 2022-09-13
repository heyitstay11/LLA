import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { ThemeProvider } from "./context/theme";
import { SocketProvider } from "./context/socket";
axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}/api`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);
