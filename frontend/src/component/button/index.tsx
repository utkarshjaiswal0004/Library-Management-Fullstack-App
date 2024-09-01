import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-semibold text-textLight transition duration-200 ease-in-out rounded-md shadow ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-primary hover:bg-secondary"
      } ${className}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
