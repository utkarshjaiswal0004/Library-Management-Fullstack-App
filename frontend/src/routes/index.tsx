import { Suspense, lazy } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import PrivateRoute from "./private-route";
import PublicRoute from "./public-route";
import Loading from "../component/loading";

const LibraryPage = lazy(() => import("../pages/library"));
const BookDetails = lazy(() => import("../pages/book-details"));
const RegistrationPage = lazy(() => import("../pages/registration"));
const Layout = lazy(() => import("../pages/layout"));
const NotFound = lazy(() => import("../component/not-found"));
const LoginPage = lazy(() => import("../pages/login"));
const AddBookPage = lazy(() => import("../pages/add-book"));
const BorrowedBooks = lazy(() => import("../pages/borrowed-books"));
const HomePage = lazy(() => import("../pages/home-page"));

const LayoutWrapper = () => (
  <Suspense fallback={<Loading />}>
    <Layout>
      <Outlet />
    </Layout>
  </Suspense>
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "library",
        element: (
          <Suspense fallback={<Loading />}>
            <PrivateRoute element={<LibraryPage />} />
          </Suspense>
        ),
      },
      {
        path: "borrowed-books",
        element: (
          <Suspense fallback={<Loading />}>
            <PrivateRoute element={<BorrowedBooks />} />
          </Suspense>
        ),
      },
      {
        path: "book/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <PrivateRoute element={<BookDetails />} />
          </Suspense>
        ),
      },
      {
        path: "add-book",
        element: (
          <Suspense fallback={<Loading />}>
            <PrivateRoute element={<AddBookPage />} />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loading />}>
            <PublicRoute redirectTo="/" element={<RegistrationPage />} />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Loading />}>
            <PublicRoute redirectTo="/" element={<LoginPage />} />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={routes} />;

export default AppRoutes;
