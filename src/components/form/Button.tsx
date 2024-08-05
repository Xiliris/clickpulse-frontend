import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  addClass?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, addClass, type, onClick }) => {
  return (
    <button
      className={
        "bg-emphasis text-background-100 px-6 py-2 rounded-md inline-flex items-center text-xl " +
        addClass
      }
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
