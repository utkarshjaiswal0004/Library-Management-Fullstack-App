import React from "react";

interface BookImageProps {
  imageUrl?: string;
  title: string;
}

const BookImage: React.FC<BookImageProps> = ({ imageUrl, title }) => {
  return (
    <div className="md:flex-shrink-0">
      <img
        className="object-cover w-full h-full md:w-96"
        src={
          imageUrl ||
          "https://edit.org/images/cat/book-covers-big-2019101610.jpg"
        }
        alt={title}
      />
    </div>
  );
};

export default BookImage;
