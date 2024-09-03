import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import LibraryPage from "../pages/library";
import BookDetails from "../pages/book-details";
import RegistrationPage from "../pages/registration";
import Layout from "../component/layout";
import NotFound from "../component/not-found";
import PrivateRoute from "./private-route";
import PublicRoute from "./public-route";
import LoginPage from "../pages/login";
import AddBookPage from "../pages/add-book";
import BorrowedBooks from "../pages/borrowed-books";
import HomePage from "../pages/home-page";

const LayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "library",
        element: <PrivateRoute element={<LibraryPage />} />,
      },
      {
        path: "borrowed-books",
        element: <PrivateRoute element={<BorrowedBooks />} />,
      },

      {
        path: "book/:id",
        element: <PrivateRoute element={<BookDetails />} />,
      },
      {
        path: "add-book",
        element: <PrivateRoute element={<AddBookPage />} />,
      },
      {
        path: "register",
        element: <PublicRoute redirectTo="/" element={<RegistrationPage />} />,
      },
      {
        path: "login",
        element: <PublicRoute redirectTo="/" element={<LoginPage />} />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={routes} />;

export default AppRoutes;
