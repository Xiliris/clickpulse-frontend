import { Link } from "react-router-dom";
import Logo from "../../public/logo.png";
import Button from "../components/form/Button";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-default-200">
      <div className="max-w-lg w-full space-y-10">
        <div className="text-center">
          <img className="mx-auto h-24 w-auto" src={Logo} alt="Logo" />
          <h2 className="mt-8 text-center text-4xl font-extrabold text-primary">
            Log in to your account
          </h2>
        </div>
        <form className="mt-10 space-y-8" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-4">
            <div className="mb-5">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-4 py-2 placeholder-secondary-100 text-primary bg-default-100 rounded-lg sm:text-lg"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-4 py-2 placeholder-secondary-100 text-primary bg-default-100 rounded-lg sm:text-lg"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-5 w-5 text-emphasis focus:ring-emphasis border-secondary-100 rounded"
                style={{ accentColor: "#252A34" }}
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm text-gray-200"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-emphasis hover:text-emphasis-light cursor-pointer"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Log In</Button>
          </div>
        </form>
        <div className="text-center text-sm text-primary">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-emphasis hover:text-emphasis-light cursor-pointer"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
