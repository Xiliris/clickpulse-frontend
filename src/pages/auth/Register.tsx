import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import PasswordInput from "../../components/form/PasswordInput";

import Header from "../../components/header";
import Navbar from "../../components/Navbar";

import axiosInstance from "../../modules/axiosInstance";

import validatePassword from "../../utils/validatePassword";
import validateUsername from "../../utils/validateUsername";
import validateEmail from "../../utils/validateEmail";

export default function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

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

    try {
      const resposne = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });

      if (resposne.status === 200) {
        navigate("/verify");
      } else {
        setErrorMessage(resposne.data.message);
      }
    } catch (error: any) {
      setErrorMessage(error.data);
    }
  }
  return (
    <>
      <Header title="Register" />
      <Navbar />

      <main className="w-screen h-screen flex justify-center items-center">
        <div className="border-secondary-200 border-2 p-6 rounded-md flex flex-col gap-6">
          <h1 className="text-primary text-2xl text-center">Register</h1>
          <Input
            placeholder="Username"
            type="text"
            name="username"
            ref={usernameRef}
            onChange={() => setErrorMessage("")}
          />
          <Input
            placeholder="Email"
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
          <Link to="/login" className="text-primary cursor-pointer">
            Already have an account? Login here
          </Link>

          {errorMessage && <p className="text-red-400">{errorMessage}</p>}

          <Button className="text-center" onClick={() => submit()}>
            Register
          </Button>
        </div>
      </main>
    </>
  );
}
