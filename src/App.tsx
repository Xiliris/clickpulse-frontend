import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";

import New from "./pages/dashboard/New";
import Script from "./pages/dashboard/Script";
import Dashboard from "./pages/dashboard/Dashboard";

import Protected from "./modules/Protected";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/dashboard/new"
          element={
            <Protected>
              <New />
            </Protected>
          }
        />
        <Route
          path="/dashboard/script"
          element={
            <Protected>
              <Script />
            </Protected>
          }
        />

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
