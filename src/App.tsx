import { BrowserRouter, Route, Routes } from "react-router-dom";
import Maintenance from "./pages/Maintenance";

import Error from "./pages/error/Error";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Maintenance />} />
        <Route path="*" element={<Error type={404} message={"Page not found!"}></Error>} />
      </Routes>
    </BrowserRouter>
  );
}
