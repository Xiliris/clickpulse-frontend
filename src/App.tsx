import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
  Outlet,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Reset from "./pages/auth/Reset";
import Logout from "./pages/auth/Logout";
import New from "./pages/dashboard/New";
import Script from "./pages/dashboard/Script";
import Dashboard from "./pages/dashboard/Dashboard";
import Websites from "./pages/dashboard/Websites";
import Maintenance from "./pages/Maintenance";
import Protected from "./modules/Protected";
import Error from "./pages/error/Error";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/Terms";
import AboutUs from "./pages/Aboutus";
import PaymentPage from "./pages/Payment";
import PricingMore from './pages/Pricingmore';

const AppLayout = () => (
  <>
    <ScrollRestoration />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
      {
        path: "/reset",
        element: <Reset />,
      },
      {
        path: "/maintenance",
        element: <Maintenance />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms",
        element: <TermsOfService />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/pricingmore",
        element: <PricingMore />
      },
      {
        path: "/payment",
        element: (
          <Protected>
            <PaymentPage />
          </Protected>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Protected>
            <Websites />
          </Protected>
        ),
      },
      {
        path: "/dashboard/new",
        element: (
          <Protected>
            <New />
          </Protected>
        ),
      },
      {
        path: "/dashboard/script",
        element: (
          <Protected>
            <Script />
          </Protected>
        ),
      },
      {
        path: "/dashboard/:id",
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: "*",
        element: <Error type={404} message={"Page not found!"} />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
