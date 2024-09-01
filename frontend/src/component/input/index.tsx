import React from "react";

interface InputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  showPasswordToggle?: () => void;
  showPassword?: boolean;
  ariaLabel?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  showPasswordToggle,
  showPassword,
  ariaLabel,
}) => {
  return (
    <div className="relative mb-6">
      <label
        className="block mb-2 text-sm font-bold text-textDark"
        htmlFor={id}
      >
        {id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g, " $1")}
      </label>
      <input
        className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none border-border text-textDark focus:outline-none focus:shadow-outline"
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={showPasswordToggle}
          aria-label={ariaLabel}
          className="absolute inset-y-0 right-0 flex items-center pr-3 top-7"
        >
          <i
            className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} text-gray-500`}
          />
        </button>
      )}
    </div>
  );
};

export default Input;
