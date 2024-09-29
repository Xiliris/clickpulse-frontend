import { FC } from 'react';
import Button from '../../components/form/Button';
import { Link } from 'react-router-dom';

interface ErrorProps {
  type: number;
  message: string;
}

const Error: FC<ErrorProps> = ({ type, message }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-default-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-emphasis mb-4">
          We hit a roadblock, <br /> page isn't here!
        </h1>
        <p className="text-3xl text-primary mb-4">
          {type === 404 ? 'Error 404' : `Error ${type}`}
        </p>
        <Link to="/">
          <Button>Home</Button>
        </Link>

        <p className="text-primary mt-4">
          To report an error contact us at <br />
          <a
            href="mailto:clickpulse.team@gmail.com"
            className="text-emphasis cursor-pointer"
          >
            clickpulse.team@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Error;
