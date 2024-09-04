# Library Management System

The Library Management System is a robust application built using the MERN stack (MongoDB, Express.js, React.js, Node.js), designed to efficiently manage library operations.

This README.md file includes detailed architectural decisions, thoughts, and assumptions made during the development process to provide better insight into the design and implementation of the system.

## Website credentials and URL

- Admin:
  • Email: admin@gmail.com
  • Password: 123456
  • User:
  • Email: test@gmail.com
  • Password: 123456

You can visit the live version of the Library Management System [here](https://library-management-fullstack-app.vercel.app/)
[Library Management System](https://library-management-fullstack-app.vercel.app/)

## Architectural Approach

This project has been developed with a strong emphasis on clean, maintainable, and testable code. The following principles and methodologies have been central to the design and implementation:

### Clean Code

- Clear and meaningful naming conventions for variables, functions, and classes.
- Functions are designed to perform a single task, making them easier to test and maintain.
- The code is modularized, making it easy to understand, extend, and refactor.

### SOLID Principles

**The system adheres to SOLID principles:**

- Single Responsibility Principle: Each module/class has a single responsibility, making the system easier to manage and understand.
- Open/Closed Principle: The system is designed to be open for extension but closed for modification.
- Liskov Substitution Principle: Objects of a superclass can be replaced with objects of a subclass without affecting the correctness of the program.
- Interface Segregation Principle: No client is forced to depend on methods it does not use.
- Dependency Inversion Principle: High-level modules do not depend on low-level modules but on abstractions.

## KISS (Keep It Simple, Stupid)

- The project embraces the KISS principle, ensuring that the design is as simple as possible. Complexities are avoided unless absolutely necessary, making the system easier to maintain and understand.

### DRY (Don't Repeat Yourself)

- DRY principles have been followed to avoid code duplication. Common functionality is abstracted into reusable components, reducing redundancy and improving maintainability.

### Features

- User Authentication, Authorization and Registration
- Book Management (CRD operations)
- User Role Based Management ( user | admin )
- Borrowing and Returning Books ( at max two book at a time )
- Responsive UI
- Axios interceptor for refreshing tokens
- Lazy loading
- Image optimization

### Installation

1. Clone the repository:

```
  git clone https://github.com/utkarshjaiswal0004/Library-Management-Fullstack-App.git
```

2.  Install dependencies for both the backend and frontend:

```
  cd Library-Management-Fullstack-App/backend
  npm install
```

3.  Set up environment variables:

- Create a .env file in the backend directory and add the following:

```env

MONGO_URI=<YOUR-MONGO-DB-CONNECTION-URL>
JWT_ACCESS_SECRET=<YOUR-CUSTOM-JWT-SECRET>
JWT_REFRESH_SECRET=<YOUR-CUSTOM-JWT-REFRESH-SECRET>
NODE_ENV=development
FRONTEND_URL=<YOUR-FRONTEND-REACT-URL or http://localhost:5173>
PORT=3000

```

4. Start the development servers:

- Backend (from inside backend folder):

  ```
  npm run dev
  ```

### Usage

After installation, you can access the application locally via http://localhost:3000. Use the following credentials for testing (if any):

- Admin:
  • Email: admin@gmail.com
  • Password: 123456
  • User:
  • Email: test@gmail.com
  • Password: 123456

### API Endpoints

Below is a summary of the key API endpoints:

- Authentication

  • POST /api/auth/register - Register a new user.
  • POST /api/auth/login - Login a user.
  • POST /api/auth/refresh-token - Refresh the user token.
  • POST /api/auth/fetchUserFromToken - Fetch user information based on token.
  • POST /api/auth/logout - Logout a user.

- Books

  • POST /api/books/add-book - Add a new book (admin only).
  • GET /api/books/get-books - Retrieve all books.
  • GET /api/books/get-book/:id - Retrieve a specific book by ID.
  • DELETE /api/books/delete-book/:id - Delete a book (admin only).

- Users

  • POST /api/users/borrow - Borrow a book (authenticated user).
  • POST /api/users/return - Return a borrowed book (authenticated user).
  • POST /api/users/borrowed-books - Retrieve all borrowed books by the user (authenticated user).

### Notes

    •	Admin Endpoints: Some endpoints require admin privileges and are protected by middleware to ensure that only authorized users can access them.
    •	Authentication: Certain endpoints require JWT authentication, which is enforced by middleware.
