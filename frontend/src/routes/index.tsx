import { createBrowserRouter } from "react-router-dom";
import Layout from "../component/layout";
import LandingPage from "../pages/library";
import NotFound from "../component/not-found";
import BookDetails from "../pages/book-details";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <LandingPage />
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
    path: "*",
    element: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },
]);

export default routes;
