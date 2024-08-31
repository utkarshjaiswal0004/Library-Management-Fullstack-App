import React, { useState, useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNav } from "../../../context/nav-context";

// Define the type for navigation link
type NavLink = {
  text: string;
  url: string;
};

// Memoized NavLinkItem component to avoid unnecessary re-renders
const NavLinkItem: React.FC<
  NavLink & {
    setActiveNav: (url: string) => void;
    isMobile: boolean;
    toggleMenu: () => void;
    activeNav: string;
  }
> = memo(({ text, url, setActiveNav, isMobile, toggleMenu, activeNav }) => (
  <li>
    <Link
      to={url}
      className={`block px-4 py-2 hover:text-secondary ${activeNav === url ? "text-secondary font-bold" : ""}`}
      onClick={() => {
        setActiveNav(url);
        if (isMobile) toggleMenu(); // Close menu on mobile after clicking a link
      }}
    >
      {text}
    </Link>
  </li>
));

const Navbar: React.FC = () => {
  const { activeNav, setActiveNav } = useNav();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 860);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token"),
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 860);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navLinks: NavLink[] = isLoggedIn
    ? [
        { text: "Library", url: "/" },
        { text: "Browse Books", url: "/books" },
        { text: "My Borrowed Books", url: "/my-borrowed-books" },
        { text: "Return Books", url: "/return-books" },
        { text: "Admin Dashboard", url: "/admin/dashboard" },
      ]
    : [
        { text: "Library", url: "/" },
        { text: "Browse Books", url: "/books" },
      ];

  const AuthButtons: React.FC = () => {
    const currentPath = location.pathname;
    const isLoginPage =
      currentPath.includes("login-signup") &&
      new URLSearchParams(location.search).get("isLogin") === "true";
    const isRegisterPage =
      currentPath.includes("login-signup") &&
      new URLSearchParams(location.search).get("isLogin") === "false";

    return (
      <div
        className={`flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 mt-4 lg:mt-0 ${isMobile && !isMenuOpen ? "hidden" : "block"}`}
      >
        {isLoggedIn ? (
          <button
            className="px-4 py-2 bg-accent text-textLight rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            {!isLoginPage && (
              <Link
                to="/login-signup?isLogin=true"
                className="px-4 py-2 bg-secondary text-textLight rounded hover:bg-primary focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                Login
              </Link>
            )}
            {!isRegisterPage && (
              <Link
                to="/login-signup?isLogin=false"
                className="px-4 py-2 bg-backgroundLight text-textDark rounded hover:bg-primary hover:text-textLight focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                Register
              </Link>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <nav className="fixed w-full py-4 bg-backgroundDark text-textLight shadow-lg top-0 z-50">
      <div className="container mx-auto flex lg:flex-row flex-col items-center justify-between px-4 md:px-6">
        <div className="flex flex-row w-full lg:w-auto justify-between items-center">
          <Link to="/" className="text-lg font-semibold hover:text-secondary">
            HEXAD
          </Link>
          <button
            className="lg:hidden px-4 py-2 rounded bg-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>

        <div
          className={`lg:flex lg:space-x-6 lg:items-center ${isMobile && !isMenuOpen ? "hidden" : "block"}`}
        >
          <ul
            className={`flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 ${isMobile && !isMenuOpen ? "hidden" : "block"}`}
          >
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.url}
                {...link}
                setActiveNav={setActiveNav}
                isMobile={isMobile}
                toggleMenu={toggleMenu}
                activeNav={activeNav}
              />
            ))}
          </ul>

          <AuthButtons />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
