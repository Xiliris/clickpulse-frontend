import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import Logo from '../../assets/logo.png';

export default function Footer() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <footer className="bg-default-200 text-primary py-10">
      <div className="max-w-[70vw] mx-auto px-4">
        <div className="flex md:flex-col flex-row justify-between items-center mb-8">
          <div
            onClick={scrollToTop}
            className="flex items-center space-x-4 cursor-pointer md:mb-4 mb-0"
          >
            <img
              src={Logo}
              alt="Logo"
              className="w-12 cursor-pointer"
            />
            <span className="text-2xl font-bold text-primary cursor-pointer">
              Clickpulse
            </span>
          </div>

          <div className="flex md:flex-col md:space-x-0 md:space-y-4 flex-row space-y-0 space-x-6 md:mt-4 mt-0 items-center">
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
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex md:flex-col flex-row justify-between items-center text-center">
            <p className="text-base text-gray-400 md:mb-4 mb-0">
              &copy; 2024 Clickpulse. All rights reserved.
            </p>
            <div className="flex space-x-4 md:mt-4 mt-0">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emphasis cursor-pointer"
              >
                <i className="fa-brands fa-twitter text-xl transform transition-transform duration-300 hover:scale-125 cursor-pointer"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emphasis"
              >
                <i className="fa-brands fa-facebook text-xl transform transition-transform duration-300 hover:scale-125 cursor-pointer"></i>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
