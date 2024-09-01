import React from "react";
import Button from "../button";

interface BookInfoProps {
  author: string;
  title: string;
  description: string;
  copies: number;
  isAvailable: boolean;
}

const BookInfo: React.FC<BookInfoProps> = ({
  author,
  title,
  description,
  copies,
  isAvailable,
}) => {
  return (
    <div className="flex flex-col justify-center p-8">
      <div className="text-sm font-bold tracking-wide uppercase text-secondary">
        {author}
      </div>
      <h1 className="mt-2 text-4xl font-extrabold leading-tight text-primary">
        {title}
      </h1>
      <p className="mt-4 text-lg text-textDark">{description}</p>
      <div className="flex flex-row items-center mt-6 space-x-4">
        <div
          className={`text-sm font-semibold ${
            isAvailable ? "text-textDark" : "text-accent"
          }`}
        >
          Total Copies: {copies}
        </div>
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full ${
            isAvailable
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {isAvailable ? "Available" : "Out of Stock"}
        </span>
      </div>
      {isAvailable && (
        <div className="mt-6">
          <Button>Reserve Book</Button>
        </div>
      )}
    </div>
  );
};

export default BookInfo;
