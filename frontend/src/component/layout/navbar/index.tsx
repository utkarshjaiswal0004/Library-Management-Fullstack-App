// src/components/Navbar.tsx
import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNav } from "../../../context/nav-context";
import AuthButtons from "./auth-buttons";
import NavLinkItem from "./nav-link";
import { getNavLinks } from "../../../utils/nav-links";
import { NavLink } from "../../interfaces/nav-links";
import { UserInfo } from "../../interfaces/user";

const Navbar: React.FC = () => {
  const { activeNav, setActiveNav } = useNav();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 860);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token"),
  );
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined); // User info state
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 860);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));

    if (isLoggedIn) {
      const user = JSON.parse(
        localStorage.getItem("userInfo") || "{}",
      ) as UserInfo;
      setUserInfo(user);
    }
  }, [location, isLoggedIn]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    setUserInfo(undefined);
  }, []);

  const navLinks: NavLink[] = getNavLinks(isLoggedIn, userInfo);

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
            {isMobile && isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>

        <div
          className={`lg:flex lg:space-x-6 lg:items-center ${isMobile && !isMenuOpen ? "hidden" : "block"}`}
        >
          <ul
            className={`flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 ${isMobile && !isMenuOpen ? "hidden" : "block"}`}
          >
            {navLinks.map((link: NavLink) => (
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

          <AuthButtons
            isLoggedIn={isLoggedIn}
            isMobile={isMobile}
            isMenuOpen={isMenuOpen}
            handleLogout={handleLogout}
            toggleMenu={toggleMenu}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
