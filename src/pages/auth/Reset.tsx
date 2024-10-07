import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../modules/axiosInstance";
import Logo from "../../assets/logo.svg";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function ResetPassword() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit() {
    const emailValue = emailRef.current?.value;

    if (!emailValue) {
      setLoading(false);
      setErrorMessage("Please enter an email address.");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post("/auth/reset", {
        email: emailValue,
      });
      navigate("/");
    } catch (err: any) {
      console.log(err);
      setErrorMessage(
        err.response?.data || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header title="Reset" />
      <main className="min-h-screen flex items-center justify-center bg-default-200">
        <div className="max-w-lg w-[90vw] space-y-10 bg-default-300 p-10 rounded-md relative overflow-hidden">
          <Link to="/" className="text-emphasis cursor-pointer block text-xl">
            <i className="fa-solid fa-arrow-left cursor-pointer"></i>
          </Link>
          <div className="text-center">
            <img className="mx-auto h-16 w-auto" src={Logo} alt="Logo" />
            <h2 className="mt-4 text-center text-2xl font-extrabold text-primary">
              Reset Your Password
            </h2>
            <p className="text-secondary-100 mb-6">
              Enter your email address below, and we'll send you a link to reset
              your password.
            </p>
          </div>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {loading && (
              <Spinner className="justify-center absolute bg-default-300 top-0 left-0 z-30 scale-150" />
            )}

            <Input
              type="email"
              name="email"
              placeholder="Email"
              className="mb-4"
              ref={emailRef}
              onChange={() => setErrorMessage("")}
            />
            {errorMessage && <p className="text-red-400">{errorMessage}</p>}

            <div className="flex justify-end">
              <Button type="submit" className="text-center">
                Send
              </Button>
            </div>
          </form>
          <div className="mt-4 text-sm text-center">
            <Link
              to="/login"
              className="text-base text-emphasis cursor-pointer hover:text-emphasis-light"
            >
              Back to Log In
            </Link>
          </div>
        </div>
      </main>
      <footer className="mt-8 text-base text-secondary-100 text-center">
        &copy; {new Date().getFullYear()} Clickpulse. All rights reserved.
      </footer>
    </>
  );
}
