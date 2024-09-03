import React from "react";
import { NavProvider } from "../../context/nav-context/nav-context";
import Footer from "../../component/footer";
import Navbar from "./navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavProvider>
      <Navbar />
      <main className="container mx-auto mt-20">{children}</main>
      <Footer />
    </NavProvider>
  );
};

export default Layout;
