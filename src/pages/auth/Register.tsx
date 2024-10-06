import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

import Input from '../../components/form/Input';
import Button from '../../components/form/Button';
import PasswordInput from '../../components/form/PasswordInput';

import Header from '../../components/Header';

import axiosInstance from '../../modules/axiosInstance';

import validatePassword from '../../utils/form/validatePassword';
import validateUsername from '../../utils/form/validateUsername';
import validateEmail from '../../utils/form/validateEmail';

export default function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');

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
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
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
      const response = await axiosInstance.post('/auth/register', {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        navigate('/verify');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error: any) {
      setErrorMessage(error.data);
    }
  }

  return (
    <>
      <Header title="Register" />

      <main className="min-h-screen flex items-center justify-center bg-default-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full space-y-6">
          <Link
            to="/"
            className="text-emphasis cursor-pointer block text-xl"
          >
            <i className="fa-solid fa-arrow-left cursor-pointer"></i>
          </Link>
          <img
            className="mx-auto h-16 w-auto"
            src={Logo}
            alt="Logo"
          />
          <h2 className=" text-center text-2xl font-extrabold text-primary">
            Create a new account
          </h2>
          <form
            className="mt-10 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <Input
              placeholder="Username"
              type="text"
              name="username"
              ref={usernameRef}
              onChange={() => setErrorMessage('')}
            />
            <Input
              placeholder="Email address"
              type="email"
              name="email"
              ref={emailRef}
              onChange={() => setErrorMessage('')}
            />
            <PasswordInput
              placeholder="Password"
              name="password"
              ref={passwordRef}
              onChange={() => setErrorMessage('')}
            />
            <PasswordInput
              placeholder="Confirm Password"
              name="confirm-password"
              ref={confirmPasswordRef}
              onChange={() => setErrorMessage('')}
            />

            {errorMessage && (
              <p className="text-red-400">{errorMessage}</p>
            )}

            <div className="text-center text-sm text-primary justify-between flex">
              <Link
                to="/login"
                className="text-base text-emphasis hover:text-emphasis-light cursor-pointer ml-2"
              >
                <span className="text-primary">
                  Already have an account?
                </span>{' '}
                Log in.
              </Link>
              <div>
                <Link
                  to="/"
                  className="text-base text-emphasis hover:text-emphasis-light cursor-pointer"
                >
                  <span className="text-primary">
                    Dont want to register?
                  </span>{' '}
                  Return home.
                </Link>
              </div>
            </div>
            <div className=" flex justify-end">
              <Button type="submit" className="text-center">
                Register
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
