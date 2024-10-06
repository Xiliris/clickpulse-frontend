import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../modules/axiosInstance';

import Header from '../../components/Header';
import Input from '../../components/form/Input';
import Button from '../../components/form/Button';
import verifyCode from '../../utils/form/validateCode';
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const Verify: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  async function verify() {
    const code = ref.current?.value;

    const verify = verifyCode(parseInt(code!));

    if (verify) {
      setErrorMessage(verify);
      return;
    }

    try {
      const response: any = await axiosInstance.post('/auth/verify', {
        code,
      });

      if (response.status === 200) {
        navigate('/pricing-more');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error: any) {
      setErrorMessage(error.data);
    }
  }

  return (
    <>
      <Header title="Verify" />
      <main className="min-h-screen flex items-center justify-center bg-default-200">
        <div className="max-w-lg w-[90vw] space-y-10 bg-default-300 p-10 rounded-md">
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
              Verify Your Code
            </h2>
          </div>
          <form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              placeholder="Enter Verification Code"
              type="number"
              name="code"
              ref={ref}
              onChange={() => setErrorMessage('')}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">
                {errorMessage}
              </p>
            )}
            <div className="flex justify-center">
              <Button className="mt-4" onClick={() => verify()}>
                Verify
              </Button>
            </div>
          </form>
          <div className="mt-4 text-sm text-center">
            <Link
              to="/"
              className="text-base text-emphasis hover:text-emphasis-light"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <footer className="mt-8 text-base text-secondary-100 text-center">
        &copy; {new Date().getFullYear()} Clickpulse. All rights
        reserved.
      </footer>
    </>
  );
};

export default Verify;
