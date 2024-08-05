import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, className, type, onClick }) => {
  return (
    <button
      className={
        "bg-emphasis text-background-100 px-6 py-2 rounded-md items-center font-medium " +
        className
      }
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
