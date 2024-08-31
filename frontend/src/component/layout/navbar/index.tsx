import React from "react";
import { Link } from "react-router-dom";
import { useNav } from "../../../context/nav-context";
const Navbar: React.FC = () => {
  const { activeNav } = useNav();

  return (
    <nav className="fixed w-screen py-4 bg-backgroundDark m-auto items-center top-0 text-textLight justify-center">
      <ul className="flex mx-auto h-[fill-available] items-center justify-center space-x-4">
        <li>
          <Link
            to="/"
            className={`hover:text-blue-500 ${activeNav === "/" ? "text-blue-500 font-bold" : ""}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
