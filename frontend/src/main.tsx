import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/auth-context";
import "./index.css";
import AppRoutes from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>,
);
