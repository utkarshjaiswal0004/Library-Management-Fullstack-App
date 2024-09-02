import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNav } from "../../../context/nav-context";
import { getNavLinks } from "../../../utils/nav-links";
import { NavLink } from "../../../interfaces/nav-links";
import { UserInfo } from "../../../interfaces/user";
import AuthButtons from "./auth-buttons";
import NavLinkItem from "./nav-link";
import { useAuth } from "../../../context/auth-context";

const Navbar: React.FC = () => {
  const { activeNav, setActiveNav } = useNav();
  const { isAuthenticated, logout } = useAuth();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 860);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 860);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo) as UserInfo);
      }
    }
  }, [location, isAuthenticated]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    logout();
    setUserInfo(undefined);
  }, [logout]);

  const navLinks: NavLink[] = getNavLinks(isAuthenticated, userInfo);

  const menuClasses = `flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 ${
    isMobile && !isMenuOpen ? "hidden" : "block"
  }`;

  return (
    <nav className="fixed top-0 z-50 w-full py-4 shadow-lg bg-backgroundDark text-textLight">
      <div className="container flex flex-col items-center justify-between px-4 mx-auto lg:flex-row md:px-6">
        <div className="flex flex-row items-center justify-between w-full lg:w-auto">
          <Link to="/" className="text-lg font-semibold hover:text-secondary">
            HEXAD
          </Link>
          <button
            className="px-4 py-2 bg-gray-600 rounded lg:hidden focus:outline-none focus:ring-2 focus:ring-secondary"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMobile && isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>

        <div className={`lg:flex lg:items-center ${menuClasses}`}>
          <ul className={menuClasses}>
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

          {isAuthenticated ? (
            <button
              className="px-4 py-2 text-white bg-red-600 rounded focus:outline-none"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <AuthButtons
              isMobile={isMobile}
              isMenuOpen={isMenuOpen}
              toggleMenu={toggleMenu}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
