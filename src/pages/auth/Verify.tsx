import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie';
import axiosInstance from '../../modules/axiosInstance';
import Background from '../../assets/background.svg';

import Header from '../../components/Header';
import Input from '../../components/form/Input';
import Button from '../../components/form/Button';
import verifyCode from '../../utils/form/validateCode';
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const Verify: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [, setCookie] = useCookies(['token']);
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
        setCookie('token', response.data.token, { path: '/' });
        navigate('/pricing-more');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error: any) {
      setErrorMessage(error.data);
    }
  }

  return (
    <CookiesProvider>
      <Header title="Verify" />
      <main className="h-full flex items-center justify-center bg-default-200 my-12">
        <div
          className="max-w-lg w-[90vw] space-y-10 bg-default-300 p-10 rounded-md"
          style={{ backgroundImage: `url(${Background})` }}
        >
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
              Enter Verification Code
            </h2>
            <p className="text-secondary-100 mt-3 text-xl">
              Check your email for the verification code
            </p>
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
        </div>
      </main>
    </CookiesProvider>
  );
};

export default Verify;
