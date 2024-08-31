import { Link, useLocation } from "react-router-dom";

interface AuthButtonsProps {
  isLoggedIn: boolean;
  isMobile: boolean;
  isMenuOpen: boolean;
  handleLogout: () => void;
  toggleMenu: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  isLoggedIn,
  isMobile,
  isMenuOpen,
  handleLogout,
  toggleMenu,
}) => {
  const location = useLocation();
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
          onClick={() => {
            handleLogout();
            if (isMobile) toggleMenu(); // Close menu on mobile after clicking logout
          }}
        >
          Logout
        </button>
      ) : (
        <>
          {!isLoginPage && (
            <Link
              to="/login-signup?isLogin=true"
              className="px-4 py-2 bg-secondary text-textLight rounded hover:bg-primary focus:outline-none focus:ring-2 focus:ring-secondary"
              onClick={() => {
                if (isMobile) toggleMenu(); // Close menu on mobile after clicking login
              }}
            >
              Login
            </Link>
          )}
          {!isRegisterPage && (
            <Link
              to="/login-signup?isLogin=false"
              className="px-4 py-2 bg-backgroundLight text-textDark rounded hover:bg-primary hover:text-textLight focus:outline-none focus:ring-2 focus:ring-secondary"
              onClick={() => {
                if (isMobile) toggleMenu(); // Close menu on mobile after clicking register
              }}
            >
              Register
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default AuthButtons;
