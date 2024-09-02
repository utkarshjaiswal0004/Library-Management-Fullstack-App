import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LibraryPage from "../pages/library";
import BookDetails from "../pages/book-details";
import RegistrationPage from "../pages/registration";
import Layout from "../component/layout";
import NotFound from "../component/not-found";
import PrivateRoute from "../component/private-route";

const routes = createBrowserRouter([
  {
    path: "/",
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
        <RegistrationPage />
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

// Export RouterProvider to use in index.tsx
const AppRoutes = () => <RouterProvider router={routes} />;

export default AppRoutes;
