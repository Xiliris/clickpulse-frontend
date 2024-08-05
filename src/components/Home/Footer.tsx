import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-primary py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <img src={Logo} alt="Logo" className="w-12" />
            <span className="text-2xl font-bold text-primary">Clickpulse</span>
          </div>

          <div className="flex space-x-6 mt-4">
            <Link to="/about" className="hover:text-emphasis cursor-pointer">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-emphasis cursor-pointer">
              Contact
            </Link>
            <Link to="/privacy" className="hover:text-emphasis cursor-pointer">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-emphasis cursor-pointer">
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-gray-400">
              &copy; 2024 Clickpulse. All rights reserved.
            </p>

            <div className="flex space-x-4 mt-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emphasis"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className=" text-xl cursor-pointer"
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emphasis"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="text-xl cursor-pointer"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emphasis"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className=" text-xl cursor-pointer"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
