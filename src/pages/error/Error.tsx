import { FC } from "react";

interface ErrorProps {
  type: number;
  message: string;
}

const Error: FC<ErrorProps> = ({ type, message }) => {
  return (
    <div>
      <h1>Error {type}</h1>
      <p>{message}</p>
    </div>
  );
};

export default Error;
