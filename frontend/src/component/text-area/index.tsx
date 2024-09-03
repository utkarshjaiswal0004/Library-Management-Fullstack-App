import React from "react";

interface TextAreaProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
  rows = 4,
}) => {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    />
  );
};

export default TextArea;
