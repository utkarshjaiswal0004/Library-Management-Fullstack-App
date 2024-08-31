import { createBrowserRouter } from "react-router-dom";
import Layout from "../component/layout";
import LandingPage from "../pages/landing-page";
import NotFound from "../component/not-found";

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
    path: "*",
    element: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },
]);

export default routes;
