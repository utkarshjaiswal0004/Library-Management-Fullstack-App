import React from "react";
const Footer: React.FC = () => {
  return (
    <footer className="fixed w-screen py-4 bg-backgroundDark m-auto items-center bottom-0 text-textLight justify-center">
      <p className="flex mx-auto h-[fill-available] items-center justify-center text-center px-4 text-sm">
        &copy; 2024 Library Management System. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
