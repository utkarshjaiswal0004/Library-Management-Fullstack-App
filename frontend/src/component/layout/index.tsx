// src/components/layout/Layout.tsx
import React from "react";
import { NavProvider } from "../../context/nav-context";
import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </NavProvider>
  );
};

export default Layout;
