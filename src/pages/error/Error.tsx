import { FC } from 'react';
import Button from '../../components/form/Button';
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Background from '../../assets/background.svg';

interface ErrorProps {
  type: number;
  message: string;
}

const Error: FC<ErrorProps> = ({ type, message }) => {
  const errorNumber = type.toString().split('')[2] || '0';

  return (
    <>
      <Navbar />
      <div className="relative flex items-center justify-center min-h-screen bg-default-200 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5 rotate-12 scale-[1.45]"
          style={{ backgroundImage: `url(${Background})` }}
        ></div>
        <div className="relative flex flex-col justify-center items-center max-w-lg z-10">
          <div className="flex justify-center items-center gap-3">
            <p className="text-[80px] text-emphasis font-thin">4</p>
            <img
              src={Logo}
              alt="Clickpulse logo"
              className="w-16 mx-auto"
            />
            <p className="text-[80px] text-emphasis font-thin">
              {errorNumber}
            </p>
          </div>

          <p className="text-primary text-xl text-center">
            {message}
          </p>
          <Link to="/">
            <Button className="mt-7">Back to Homepage!</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
