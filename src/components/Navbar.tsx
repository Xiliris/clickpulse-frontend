import { CookiesProvider, useCookies } from "react-cookie";
import Button from "./form/Button";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [cookies] = useCookies(["token"]);

  return (
    <CookiesProvider>
      <nav className="flex flex-row justify-between items-center w-[80vw] py-5 fixed left-0 right-0 mx-auto z-50">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-12 cursor-pointer" />
        </Link>

        {cookies.token ? (
          <Link to="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </nav>
    </CookiesProvider>
  );
}
