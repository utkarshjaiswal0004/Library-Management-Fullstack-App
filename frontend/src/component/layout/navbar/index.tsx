import React from "react";
import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
  return (
    <nav className="fixed w-screen py-4 bg-backgroundDark m-auto items-center top-0 text-textLight justify-center">
      <ul className="flex mx-auto h-[fill-available] items-center justify-center">
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
