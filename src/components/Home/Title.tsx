import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { upperItemVariant, lineVariant } from "../../animations/Animations";

interface TitleProps {
  children: ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <div className="relative text-center mb-8 bg-transparent">
      <motion.h2
        variants={upperItemVariant}
        custom={{ yHeight: 10 }}
        initial="initial"
        viewport={{ once: true, amount: 0.5 }}
        whileInView="animate"
        className="text-4xl font-bold text-emphasis"
      >
        {children}
      </motion.h2>
      <motion.div
        variants={lineVariant}
        initial="initial"
        viewport={{ once: true }}
        whileInView="animate"
        className="mx-auto my-2 border-b-[0.5px] border-emphasis"
      />
    </div>
  );
};

export default Title;
