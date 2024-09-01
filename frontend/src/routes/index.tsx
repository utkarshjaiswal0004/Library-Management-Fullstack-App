import { createBrowserRouter } from "react-router-dom";
import Layout from "../component/layout";
import NotFound from "../component/not-found";
import LibraryPage from "../pages/library";
import BookDetails from "../pages/book-details";
import RegistrationPage from "../pages/registration";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <LibraryPage />
      </Layout>
    ),
  },
  {
    path: "/book/:id",
    element: (
      <Layout>
        <BookDetails />
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

export default routes;
