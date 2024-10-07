import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import Background from "../../assets/background.svg";

import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import PasswordInput from "../../components/form/PasswordInput";

import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import axiosInstance from "../../modules/axiosInstance";

import validatePassword from "../../utils/form/validatePassword";
import validateUsername from "../../utils/form/validateUsername";
import validateEmail from "../../utils/form/validateEmail";

export default function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function submit() {
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    for (const error of [usernameError, emailError, passwordError]) {
      if (error) {
        setErrorMessage(error);
        return;
      }
    }
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        navigate("/verify");
      } else {
        setErrorMessage(response.data.message);
      }
      setLoading(false);
    } catch (error: any) {
      setErrorMessage(error.data);
    }
  }

  return (
    <>
      <Header title="Register" />

      <main className="min-h-screen flex items-center justify-center bg-default-200 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5 rotate-12 scale-[1.45]"
          style={{ backgroundImage: `url(${Background})` }}
        ></div>
        <div className="max-w-lg w-full space-y-8 bg-default-300 rounded-md p-10 z-20 relative overflow-hidden">
          <Link to="/" className="text-emphasis cursor-pointer block text-xl">
            <i className="fa-solid fa-arrow-left cursor-pointer"></i>
          </Link>
          <img className="mx-auto h-16 w-auto" src={Logo} alt="Logo" />
          <h2 className="mt-6 text-3xl font-extrabold text-primary text-center">
            Create a new account
          </h2>
          <form
            className="mt-10 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            {loading && (
              <Spinner className="justify-center absolute bg-default-300 top-0 left-0 z-30 scale-150" />
            )}
            <Input
              placeholder="Username"
              type="text"
              name="username"
              ref={usernameRef}
              onChange={() => setErrorMessage("")}
            />
            <Input
              placeholder="Email address"
              type="email"
              name="email"
              ref={emailRef}
              onChange={() => setErrorMessage("")}
            />
            <PasswordInput
              placeholder="Password"
              name="password"
              ref={passwordRef}
              onChange={() => setErrorMessage("")}
            />
            <PasswordInput
              placeholder="Confirm Password"
              name="confirm-password"
              ref={confirmPasswordRef}
              onChange={() => setErrorMessage("")}
            />

            {errorMessage && <p className="text-red-400">{errorMessage}</p>}

            <div className="justify-between flex pt-4">
              <button className="px-6 py-2 rounded-md inline-flex items-center text-center text-xl duration-200 ease-in-out prevent-select bg-default-200 border-2 border-secondary-200 cursor-pointer">
                <Link
                  to="/login"
                  className="text-secondary-100 cursor-pointer px-2"
                >
                  Log In
                </Link>
              </button>

              <Button>Register</Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
