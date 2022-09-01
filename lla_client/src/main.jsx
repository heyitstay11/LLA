import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
