import { FC, useRef, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInstance from "../../modules/axiosInstance";

import Header from "../../components/header";
import Input from "../../components/form/Input";
import PasswordInput from "../../components/form/PasswordInput";
import Button from "../../components/form/Button";
import Navbar from "../../components/Navbar";

const Auth: FC = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function login() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/login", { email, password });

      if (res.status === 200) {
        setCookie("token", res.data.token, { path: "/" });
        navigate("/");
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (error: any) {
      setErrorMessage(error.data);
    }
  }
  return (
    <CookiesProvider>
      <Navbar />
      <Header title="Login" />
      <main className="h-screen w-screen flex justify-center items-center">
        <div className="border-secondary-200 border-2 p-6 rounded-md flex flex-col gap-6">
          <h1 className="text-primary text-2xl text-center">Login</h1>
          <Input
            placeholder="Email"
            type="email"
            name="password"
            ref={emailRef}
            onChange={() => setErrorMessage("")}
          />
          <PasswordInput
            placeholder="Password"
            name="password"
            ref={passwordRef}
            onChange={() => setErrorMessage("")}
          />
          <Link to="/register" className="text-primary cursor-pointer">
            Don't have an account? Register here
          </Link>
          <Link to="/forgot-password" className="text-primary cursor-pointer">
            Forgot password?
          </Link>
          {errorMessage && <p className="text-red-400">{errorMessage}</p>}
          <Button className="text-center" onClick={() => login()}>
            Login
          </Button>
        </div>
      </main>
    </CookiesProvider>
  );
};

export default Auth;
