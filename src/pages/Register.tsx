import { Link } from "react-router-dom";
import Logo from "../../public/logo.png";
import Button from "../components/form/Button";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-default-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img className="mx-auto h-12 w-auto" src={Logo} alt="Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create a new account</h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">Username</label>
              <input id="name" name="name" type="text" autoComplete="name" required className="relative block w-full px-4 py-2 placeholder-secondary-100 text-primary bg-default-100 rounded-lg sm:text-lg" placeholder="Username" />
            </div>
            <div className="mb-5">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full px-4 py-2 placeholder-secondary-100 text-primary bg-default-100 rounded-lg sm:text-lg" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full px-4 py-2 placeholder-secondary-100 text-primary bg-default-100 rounded-lg sm:text-lg" placeholder="Password" />
            </div>
          </div>
  
          <div>
            <Button type="submit">
              Sign Up
            </Button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-200">
          Already have an account? <Link to="/login" className="font-medium text-emphasis hover:text-emphasis-light cursor-pointer">Log In</Link>
        </div>
      </div>
    </div>
  );
}
