import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LibraryPage from "../pages/library";
import BookDetails from "../pages/book-details";
import RegistrationPage from "../pages/registration";
import Layout from "../component/layout";
import NotFound from "../component/not-found";
import PrivateRoute from "./private-route";
import PublicRoute from "./public-route"; // Import PublicRoute
import LoginPage from "../pages/login";

const routes = createBrowserRouter([
  {
    path: "/library",
    element: (
      <Layout>
        <PrivateRoute element={<LibraryPage />} />
      </Layout>
    ),
  },
  {
    path: "/book/:id",
    element: (
      <Layout>
        <PrivateRoute element={<BookDetails />} />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <PublicRoute element={<RegistrationPage />} redirectTo="/" />
      </Layout>
    ),
  },

  {
    path: "/login",
    element: (
      <Layout>
        <PublicRoute element={<LoginPage />} redirectTo="/" />
      </Layout>
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
