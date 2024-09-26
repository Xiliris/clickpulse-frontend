import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Register';
import Verify from './pages/auth/Verify';
import Reset from './pages/auth/Reset';
import Logout from './pages/auth/Logout';

import New from './pages/dashboard/New';
import Script from './pages/dashboard/Script';
import Dashboard from './pages/dashboard/Dashboard';
import Websites from './pages/dashboard/Websites';

import Maintenance from './pages/Maintenance';
import Protected from './modules/Protected';
import Error from './pages/error/Error';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Websites />
            </Protected>
          }
        />
        <Route
          path="/dashboard/:id"
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

        <Route
          path="*"
          element={
            <Error type={404} message={'Page not found!'}></Error>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
