// src/routes/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../component/layout";
import LandingPage from "../pages/landing-page";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <LandingPage />
      </Layout>
    ),
  },
]);

export default routes;
