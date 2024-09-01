// src/components/Button.tsx
import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 font-semibold text-textLight transition duration-200 ease-in-out rounded-md shadow ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-primary hover:bg-secondary"
      } ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
