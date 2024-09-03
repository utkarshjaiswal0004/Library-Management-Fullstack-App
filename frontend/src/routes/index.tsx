import { Suspense, lazy } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import PrivateRoute from "./private-route";
import PublicRoute from "./public-route";

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
  <Suspense fallback={<div>Loading layout...</div>}>
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
          <Suspense fallback={<div>Loading home page...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "library",
        element: (
          <Suspense fallback={<div>Loading library...</div>}>
            <PrivateRoute element={<LibraryPage />} />
          </Suspense>
        ),
      },
      {
        path: "borrowed-books",
        element: (
          <Suspense fallback={<div>Loading borrowed books...</div>}>
            <PrivateRoute element={<BorrowedBooks />} />
          </Suspense>
        ),
      },
      {
        path: "book/:id",
        element: (
          <Suspense fallback={<div>Loading book details...</div>}>
            <PrivateRoute element={<BookDetails />} />
          </Suspense>
        ),
      },
      {
        path: "add-book",
        element: (
          <Suspense fallback={<div>Loading add book page...</div>}>
            <PrivateRoute element={<AddBookPage />} />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<div>Loading registration page...</div>}>
            <PublicRoute redirectTo="/" element={<RegistrationPage />} />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<div>Loading login page...</div>}>
            <PublicRoute redirectTo="/" element={<LoginPage />} />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<div>Loading not found page...</div>}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={routes} />;

export default AppRoutes;
