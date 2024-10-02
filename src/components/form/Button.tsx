import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
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
      type: 'spring',
    },
  },
};

const Button: FC<ButtonProps> = ({
  children,
  className,
  type,
  onClick,
}) => {
  return (
    <motion.button
      variants={variants}
      initial="intial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.5 }}
      className={
        'bg-emphasis px-6 py-2 rounded-md inline-flex items-center text-xl duration-200 ease-in-out hover:bg-emphasis-light hover:brightness-125 ' +
        className
      }
      type={type}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button;
