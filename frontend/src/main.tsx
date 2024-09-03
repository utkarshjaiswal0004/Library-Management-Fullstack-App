import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/auth-context/auth-context";
import "./index.css";
import AppRoutes from "./routes";
import React from "react";

import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>,
);
