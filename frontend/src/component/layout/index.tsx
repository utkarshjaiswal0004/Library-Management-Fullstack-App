import React from "react";
import { NavProvider } from "../../context/nav-context";
import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavProvider>
      <Navbar />
      <main className="mt-20 container mx-auto">{children}</main>
      <Footer />
    </NavProvider>
  );
};

export default Layout;
