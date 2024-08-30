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
        <h1 className="text-6xl font-bold text-emphasis mb-4">
          Oops!
        </h1>
        <p className="text-3xl text-primary mb-4">
          {type === 404 ? '404' : `Error ${type}`}
        </p>
        <p className="text-xl text-secondary-100 mb-8">{message}</p>
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
