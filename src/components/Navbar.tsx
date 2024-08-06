import { useState, useEffect } from 'react';
import axiosInstance from '../modules/axiosInstance';
import { CookiesProvider, useCookies } from 'react-cookie';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Button from './form/Button';
import Logo from '../assets/logo.png';

export default function Navbar() {
  const [cookies, setCookie] = useCookies(['token']);
  const [user, setUser] = useState<any>({});

  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isWhyClicked, setIsWhyClicked] = useState(false);
  const [isCommunityClicked, setIsCommunityClicked] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleWhyClick = () => {
    setIsWhyClicked(!isWhyClicked);
  };

  const handleCommunityClick = () => {
    setIsCommunityClicked(!isCommunityClicked);
  };

  async function getProfile() {
    try {
      const res = await axiosInstance.post('/auth/me', {
        token: cookies.token,
      });

      const data = await res.data;

      if (data) {
        setUser(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav
      className={`fixed left-0 right-0 top-0 py-5 w-full bg-gray-800 transition-transform duration-300 ease-in-out ${
        scrollingUp ? 'translate-y-0' : '-translate-y-full'
      } z-50`}
    >
      <div className="flex flex-row justify-between items-center w-[70vw] mx-auto">
        <Link
          to="/"
          className="flex items-center space-x-2 cursor-pointer"
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-12 cursor-pointer"
          />
          <span className="text-3xl font-bold text-primary cursor-pointer">
            Clickpulse
          </span>
        </Link>

        <div className="flex space-x-8">
          <div
            onClick={handleWhyClick}
            className="flex items-center space-x-1 hover:text-emphasis text-primary cursor-pointer text-xl"
          >
            <span>Why Clickpulse</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`transform transition-transform ${
                isWhyClicked ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>
          <div
            onClick={handleCommunityClick}
            className="flex items-center space-x-1 hover:text-emphasis text-primary cursor-pointer text-xl"
          >
            <span>Community</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`transform transition-transform ${
                isCommunityClicked ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>
          <Link
            to="/pricing"
            className="hover:text-emphasis text-primary cursor-pointer text-xl"
          >
            Pricing
          </Link>
        </div>
        <div className="flex items-center space-x-8">
          {user && user.username ? (
            <Link
              to="/dashboard"
              className="flex items-center space-x-1 hover:text-emphasis text-primary cursor-pointer text-xl"
            >
              {user.username}
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-emphasis text-primary cursor-pointer text-xl"
              >
                Log In
              </Link>
              <Link
                to="/start-free-trial"
                className="cursor-pointer text-xl"
              >
                <Button>Sign In</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
