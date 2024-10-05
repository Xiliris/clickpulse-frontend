import { Link } from "react-router-dom";
import { useCallback, FC } from "react";
import Logo from "../../assets/logo.svg";
import { motion } from "framer-motion";
import {
  lineVariant,
  lowerItemVariant,
  upperItemVariant,
} from "../../animations/Animations";

interface footerProps {
  width?: number;
}

const Footer: FC<footerProps> = ({ width }) => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const containerWidth = width ? `w-[${width}vw]` : "w-[70vw]";

  return (
    <footer className="bg-default-200 text-primary py-10">
      <div className={`${containerWidth} mx-auto px-4`}>
        <motion.div
          variants={upperItemVariant}
          initial="initial"
          whileInView="animate"
          custom={{ yHeight: 40 }}
          viewport={{ once: true, amount: 0.5 }}
          className="flex md:flex-col flex-row justify-between items-center mb-8"
        >
          <div
            onClick={scrollToTop}
            className="flex md:flex-col items-center cursor-pointer md:mb-4 mb-0"
          >
            <img
              src={Logo}
              alt="Logo"
              className="md:w-[24px] w-[24px] cursor-pointer"
            />
            <span className="text-2xl font-bold text-primary cursor-pointer ml-2 md:ml-0 md:mt-2">
              Clickpulse
            </span>
          </div>

          <div className="flex md:flex-col md:space-x-0 md:space-y-4 flex-row space-y-0 space-x-6 md:mt-4 mt-0 items-center text-secondary-100">
            <Link
              to="/about"
              className="hover:text-emphasis cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="hover:text-emphasis cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
              Contact
            </Link>
            <Link
              to="/privacy"
              className="hover:text-emphasis cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-emphasis cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>

        <div className="relative w-full h-[1px] overflow-hidden mt-8 bg-transparent">
          <motion.div
            variants={lineVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}
            className="absolute h-full w-full bg-secondary-200"
          />
        </div>

        <motion.div
          variants={lowerItemVariant}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          className="flex md:flex-col flex-row justify-between items-center text-center mt-8"
        >
          <p className="text-base md:mb-4 mb-0 text-secondary-100">
            &copy; 2024 Clickpulse. All rights reserved.
          </p>
          <div className="flex space-x-4 md:mt-4 mt-0 text-secondary-100">
            <a
              href="https://x.com/ClickpulseTeam"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emphasis cursor-pointer"
            >
              <i className="fa-brands fa-twitter text-xl transform transition-transform duration-300 hover:scale-125 cursor-pointer"></i>
            </a>
            <a
              href="https://www.tiktok.com/@clickpulseteam"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emphasis"
            >
              <i className="fa-brands fa-tiktok text-xl transform transition-transform duration-300 hover:scale-125 cursor-pointer"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emphasis cursor-pointer"
            >
              <i className="fa-brands fa-linkedin text-xl transform transition-transform duration-300 hover:scale-125 cursor-pointer"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
