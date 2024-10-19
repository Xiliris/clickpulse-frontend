import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContainerProp {
  title: string;
  children: ReactNode;
  className?: string;
}

const Container: FC<ContainerProp> = ({ title, children, className }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleRotation = isActive
    ? "rotate-180"
    : "group-hover:rotate-45 rotate-0";

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  const handleOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  return (
    <div className={className}>
      <p
        onClick={handleToggle}
        className="text-primary flex justify-center items-center cursor-pointer group hover:text-emphasis "
        ref={containerRef}
      >
        {title}
        <i
          className={`fa-solid fa-angle-up ml-2 transition-transform duration-200 ${toggleRotation} cursor-pointer`}
        ></i>
      </p>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <div className="bg-default-300 flex flex-col justify-start items-start gap-2 px-5 py-3 top-5 rounded-md absolute right-0">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Container;
