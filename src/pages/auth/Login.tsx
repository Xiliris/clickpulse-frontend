import { FC, useRef, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInstance from "../../modules/axiosInstance";

import Header from "../../components/Header";
import Input from "../../components/form/Input";
import PasswordInput from "../../components/form/PasswordInput";
import Button from "../../components/form/Button";
import Logo from "../../assets/logo.svg";
import Background from "../../assets/background.svg";
import Spinner from "../../components/Spinner";

const Auth: FC = () => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function login() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email && !password) {
      setErrorMessage("Please fill in both fields");
      return;
    } else if (!email) {
      setErrorMessage("Please fill in your email.");
      return;
    } else if (!password) {
      setErrorMessage("Please fill in your password.");
      return;
    }

    axiosInstance
      .post("/auth/login", { email, password })
      .then((res) => {
        setCookie("token", res.data.token, { path: "/" });
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          setErrorMessage(err.response.data);
        } else {
          console.log(err.message);
        }
        setLoading(false);
      });
  }

  return (
    <CookiesProvider>
      <Header title="Login" />
      <main className="h-screen relative flex items-center justify-center bg-default-200">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5 rotate-12 scale-[1.45]"
          style={{ backgroundImage: `url(${Background})` }}
        ></div>
        <div className="max-w-lg w-[90vw] space-y-10 bg-default-300 p-10 rounded-md z-10 relative overflow-hidden">
          <Link to="/" className="text-emphasis cursor-pointer block text-xl">
            <i className="fa-solid fa-arrow-left cursor-pointer"></i>
          </Link>
          <div className="text-center">
            <img className="mx-auto h-16 w-auto" src={Logo} alt="Logo" />
            <h2 className="mt-4 text-center text-2xl font-extrabold text-primary">
              Log in to your account
            </h2>
          </div>

          <form
            className="mt-10 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              login();
            }}
          >
            {loading && (
              <Spinner className="justify-center absolute bg-default-300 top-0 left-0 z-30 scale-150" />
            )}
            <input type="hidden" name="remember" value="true" />
            <Input
              name="email"
              type="email"
              placeholder="Email address"
              ref={emailRef}
              onChange={() => setErrorMessage("")}
            />
            <PasswordInput
              name="password"
              placeholder="Password"
              ref={passwordRef}
              onChange={() => setErrorMessage("")}
            />
            <div className="text-sm flex justify-between">
              <Link
                to="/reset"
                className="text-base text-emphasis hover:text-emphasis-light cursor-pointer"
              >
                Forgot your password?
              </Link>
            </div>

            {errorMessage && <p className="text-red-400">{errorMessage}</p>}

            <div className="justify-between flex pt-4">
              <Link to="/signup" className="text-secondary-100 cursor-pointer">
                <button
                  type="button"
                  className="lg:text-lg px-6 py-2 rounded-md inline-flex items-center text-center text-xl duration-200 ease-in-out prevent-select bg-default-200 border-2 border-secondary-200 cursor-pointer"
                >
                  Register
                </button>
              </Link>
              <Button type="submit" className="text-center lg:text-lg">
                <span className="px-2 cursor-pointer">Log In</span>
              </Button>
            </div>
          </form>
        </div>
      </main>
    </CookiesProvider>
  );
};

export default Auth;
