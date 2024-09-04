import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../component/button";
import { useAuth } from "../../context/auth-context/use-auth-context";

const HomePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate("/library");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="container flex flex-col items-center px-3 py-6 mx-auto md:px-6 md:mt-20 md:flex-row md:space-x-8">
        <div className="w-full px-4 py-4 text-center md:text-left md:w-1/2">
          <h1 className="mb-4 text-2xl font-bold text-textDark md:text-5xl">
            Library Management System
          </h1>
          <p className="mb-2 text-lg text-gray-700 md:mb-6 md:text-xl">
            {isAuthenticated ? (
              <span>Welcome back, <span className="text-secondary">{user?.name}</span> !</span>
            ) : (
              "This is a comprehensive library management system where users can borrow up to two books and have only one copy of each book at a time. Admins have the privilege to manage the library's collection by adding and removing books as needed."
            )}
          </p>
          <Button className="mt-4 md:mt-auto" onClick={handleButtonClick}>
            {isAuthenticated ? "Go to Library" : "Login"}
          </Button>
        </div>

        <div className="w-full md:w-1/2">
          <img
            src="/library.png"
            alt="Library"
            className="w-full h-auto rounded-lg mt-14 md:mt-0"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
