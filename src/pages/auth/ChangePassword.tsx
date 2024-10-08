import { FC, useRef, useState } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../modules/axiosInstance';

import Header from '../../components/Header';
import PasswordInput from '../../components/form/PasswordInput';
import Button from '../../components/form/Button';
import Logo from '../../assets/logo.svg';
import Background from '../../assets/background.svg';
import Spinner from '../../components/Spinner';

const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function resetPassword() {
    const confirmPassword = confirmPasswordRef.current?.value;
    const newPassword = newPasswordRef.current?.value;
    const oldPassword = oldPasswordRef.current?.value;

    if (!confirmPassword || !newPassword || !oldPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (confirmPassword !== oldPassword) {
      setErrorMessage(
        `New Password and Confirm Password do not match!`
      );
      return;
    }

    setLoading(true);

    axiosInstance
      .post('/auth/change-password', {
        token: cookies.token,
        old_password: newPassword,
        new_password: confirmPassword,
        confirm_password: oldPassword,
      })
      .then(() => {
        setLoading(false);
        navigate('/login');
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
      <Header title="Reset Password" />
      <main className="relative flex items-center justify-center min-h-screen bg-default-200">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5 rotate-12 scale-[1.45]"
          style={{ backgroundImage: `url(${Background})` }}
        ></div>
        <div className="max-w-lg w-[90vw] space-y-10 bg-default-300 p-10 rounded-md z-10 relative overflow-hidden">
          <Link
            to="/"
            className="text-emphasis cursor-pointer block text-xl"
          >
            <i className="fa-solid fa-arrow-left cursor-pointer"></i>
          </Link>
          <div className="text-center">
            <img
              className="mx-auto h-16 w-auto"
              src={Logo}
              alt="Logo"
            />
            <h2 className="mt-4 text-center text-2xl font-extrabold text-primary">
              Change your password
            </h2>
          </div>
          <form
            className="mt-10 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              resetPassword();
            }}
          >
            {loading && (
              <Spinner className="justify-center absolute bg-default-300 top-0 left-0 z-30 scale-150" />
            )}
            <PasswordInput
              name="newPassword"
              placeholder="Old Password"
              ref={newPasswordRef}
              onChange={() => setErrorMessage('')}
            />
            <PasswordInput
              name="newPassword"
              placeholder="New Password"
              ref={confirmPasswordRef}
              onChange={() => setErrorMessage('')}
            />
            <PasswordInput
              name="newPassword"
              placeholder="Confirm Password"
              ref={oldPasswordRef}
              onChange={() => setErrorMessage('')}
            />
            {errorMessage && (
              <p className="text-red-400">{errorMessage}</p>
            )}
            <div className="justify-center flex pt-4">
              <Button type="submit" className="text-center">
                <span className="px-2">Reset Password</span>
              </Button>
            </div>
          </form>
        </div>
      </main>
    </CookiesProvider>
  );
};

export default ResetPassword;
