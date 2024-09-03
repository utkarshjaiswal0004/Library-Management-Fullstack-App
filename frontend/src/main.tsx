import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/auth-context";
import "./index.css";
import AppRoutes from "./routes";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
);
