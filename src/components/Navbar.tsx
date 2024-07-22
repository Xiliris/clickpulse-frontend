import Button from "./form/Button";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex flex-row justify-between items-center w-[70vw] py-5 fixed left-0 right-0 mx-auto z-50">
      <img src={Logo} alt="Logo" className="w-12 cursor-pointer" />
      <Link to="/login">
        <Button>Join</Button>
      </Link>
    </nav>
  );
}
