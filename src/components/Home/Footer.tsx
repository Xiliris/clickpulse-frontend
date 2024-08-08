import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import Logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebook,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <footer className="bg-gray-800 text-primary py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div
            onClick={scrollToTop}
            className="flex items-center space-x-4 cursor-pointer mb-4 md:mb-0"
          >
            <img src={Logo} alt="Logo" className="w-12" />
            <span className="text-2xl font-bold text-primary cursor-pointer">
              Clickpulse
            </span>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0 items-center">
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
          <div className="flex flex-col md:flex-row justify-between items-center text-center">
            <p className="text-base text-gray-400 mb-4 md:mb-0">
              &copy; 2024 Clickpulse. All rights reserved.
            </p>

            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emphasis cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-xl transform transition-transform duration-300 hover:scale-125"
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emphasis cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="text-xl transform transition-transform duration-300 hover:scale-125"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emphasis cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-xl transform transition-transform duration-300 hover:scale-125"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
