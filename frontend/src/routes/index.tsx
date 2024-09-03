import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LibraryPage from "../pages/library";
import BookDetails from "../pages/book-details";
import RegistrationPage from "../pages/registration";
import Layout from "../component/layout";
import NotFound from "../component/not-found";
import PrivateRoute from "./private-route";
import PublicRoute from "./public-route";
import LoginPage from "../pages/login";
import AddBookPage from "../pages/add-book";

const routes = createBrowserRouter([
  {
    path: "/library",
    element: (
      <PrivateRoute
        element={
          <Layout>
            <LibraryPage />
          </Layout>
        }
      />
    ),
  },
  {
    path: "/book/:id",
    element: (
      <PrivateRoute
        element={
          <Layout>
            <BookDetails />
          </Layout>
        }
      />
    ),
  },
  {
    path: "/add-book",
    element: (
      <PrivateRoute
        element={
          <Layout>
            <AddBookPage />
          </Layout>
        }
      />
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute
        redirectTo="/"
        element={
          <Layout>
            <RegistrationPage />
          </Layout>
        }
      />
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute
        redirectTo="/"
        element={
          <Layout>
            <LoginPage />
          </Layout>
        }
      />
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },
]);

const AppRoutes = () => <RouterProvider router={routes} />;

export default AppRoutes;
