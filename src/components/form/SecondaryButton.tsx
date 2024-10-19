import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const variants = {
  intial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
    },
  },
};

const Button: FC<ButtonProps> = ({
  children,
  className,
  type,
  onClick,
  disabled,
}) => {
  return (
    <motion.button
      variants={variants}
      initial="intial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.5 }}
      className={
        `px-6 py-2 rounded-md inline-flex items-center text-center text-xl duration-200 ease-in-out prevent-select ` +
        (disabled
          ? "bg-secondary-100 cursor-not-allowed opacity-50 "
          : "bg-default-200 hover:bg-emphasis-light hover:brightness-125 border border-secondary-100 text-secondary-100 ") +
        className
      }
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Button;
