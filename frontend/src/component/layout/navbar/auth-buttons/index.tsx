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
  const isLoginPage = currentPath === "/login";
  const isRegisterPage = currentPath === "/register";

  return (
    <div
      className={`flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 mt-4 lg:mt-0 ${isMobile && !isMenuOpen ? "hidden" : "block"}`}
    >
      {isLoggedIn ? (
        <button
          className="px-4 py-2 rounded bg-accent text-textLight hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-accent"
          onClick={() => {
            handleLogout();
            if (isMobile) toggleMenu();
          }}
        >
          Logout
        </button>
      ) : (
        <>
          {!isLoginPage && (
            <Link
              to="/login"
              className="px-4 py-2 rounded bg-secondary text-textLight hover:bg-primary focus:outline-none focus:ring-2 focus:ring-secondary"
              onClick={() => {
                if (isMobile) toggleMenu();
              }}
            >
              Login
            </Link>
          )}
          {!isRegisterPage && (
            <Link
              to="/register"
              className="px-4 py-2 rounded bg-backgroundLight text-textDark hover:bg-primary hover:text-textLight focus:outline-none focus:ring-2 focus:ring-secondary"
              onClick={() => {
                if (isMobile) toggleMenu();
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
