import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Loading from "./components/Loading";
const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./pages/Login"));
const Maintenance = lazy(() => import("./pages/Maintenance"));
const SignUp = lazy(() => import("./pages/Register"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading height="screen" />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading height="screen" />}>
              <Auth />
            </Suspense>
          }
        />
        <Route
          path="/maintenance"
          element={
            <Suspense fallback={<Loading height="screen" />}>
              <Maintenance />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<Loading height="screen" />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
