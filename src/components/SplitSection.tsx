import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { supportEmail } from "../../config.json";

interface SplitSectionProps {
  children: ReactNode;
}

const SplitSection: FC<SplitSectionProps> = ({ children }) => {
  return (
    <div className=" w-full md:h-56 h-40 pt-6 pb-6 text-center bg-default-100">
      <motion.div
        className="text-2xl font-bold text-primary mb-9 mx-auto w-[90vw]"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="mb-8">{children}</h2>
        <a
          href={`mailto:${supportEmail}`}
          className="text-emphasis cursor-pointer"
        >
          {supportEmail}
        </a>
      </motion.div>
    </div>
  );
};

export default SplitSection;
