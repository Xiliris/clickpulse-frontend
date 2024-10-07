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
import AddWebsite from "./pages/dashboard/AddWebsite";
import Dashboard from "./pages/dashboard/Dashboard";
import Websites from "./pages/dashboard/Websites";
import Maintenance from "./pages/Maintenance";
import Protected from "./modules/Protected";
import Error from "./pages/error/Error";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/Terms";
import AboutUs from "./pages/Aboutus";
//import PaymentPage from './pages/Payment';
import PricingMore from "./pages/Pricingmore";
import ProtectedWebsite from "./modules/ProtectedWebsite";
//import BillingAddress from './pages/BillingAddress';
import Lightweight from "./pages/Lightweight";
import PrivacyCommitment from "./pages/PrivacyCommitment";
import EasyToUse from "./pages/EasyToUse";
import ConstantlyImproving from "./pages/ConstantlyImproving";
import ResetPassword from "./pages/auth/ResetPassword";
import ChangePassword from "./pages/auth/ChangePassword";

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
        path: "/reset/:token",
        element: <ResetPassword />,
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
        path: "/pricing-more",
        element: <PricingMore />,
      },
      {
        path: `/lightweight`,
        element: <Lightweight />,
      },
      {
        path: `/privacy-commitment`,
        element: <PrivacyCommitment />,
      },
      {
        path: `/easy-to-use`,
        element: <EasyToUse />,
      },
      {
        path: `/constantly-improving`,
        element: <ConstantlyImproving />,
      },
      /*{
        path: `/billing-address`,
        element: (
          <Protected>
            <BillingAddress />
          </Protected>
        ),
      },
      {
        path: "/payment",
        element: (
          <Protected>
            <PaymentPage />
          </Protected>
        ),
      },*/
      {
        path: "/dashboard",
        element: (
          <Protected>
            <Websites />
          </Protected>
        ),
      },

      {
        path: "/change-password",
        element: (
          <Protected>
            <ChangePassword />
          </Protected>
        ),
      },
      {
        path: "/dashboard/add-website",
        element: (
          <Protected>
            <AddWebsite />
          </Protected>
        ),
      },
      {
        path: "/dashboard/:id",
        element: (
          <Protected>
            <ProtectedWebsite>
              <Dashboard />
            </ProtectedWebsite>
          </Protected>
        ),
      },
      {
        path: "401",
        element: (
          <Error
            type={401}
            message={
              "Oops! It looks like you're not authorized to access this section. Please log in or get in touch with our support team if you need assistance.!"
            }
          />
        ),
      },
      {
        path: "*",
        element: (
          <Error
            type={404}
            message={
              "Oops! This page doesn't exist. But don't worry, we'll help you find your way back."
            }
          />
        ),
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
