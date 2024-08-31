import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to the Library Management System</h1>
        <p>
          Your gateway to managing and exploring a vast collection of books.
        </p>
      </header>
      <section>
        <h2>Features</h2>
        <ul>
          <li>Browse and search for books</li>
          <li>Borrow and return books</li>
          <li>Manage your borrowed books</li>
        </ul>
      </section>
      <footer>
        <p>&copy; 2024 Library Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
