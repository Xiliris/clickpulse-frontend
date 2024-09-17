import { useState, useEffect, useRef, FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../modules/axiosInstance';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faBars,
  faTimes,
  faLeaf,
} from '@fortawesome/free-solid-svg-icons';
import Button from './form/Button';
import Logo from '../assets/logo.png';

const variants = {
  initial: {
    opacity: 0,
    y: -25,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      type: 'tween',
      ease: 'easeInOut',
    },
  },
};

const DropdownItem: FC<{ to: string; children: ReactNode }> = ({
  to,
  children,
}) => {
  return (
    <Link to={to} className="block">
      <motion.span
        whileHover={{ scale: 1.1 }}
        style={{ cursor: 'pointer' }}
      >
        <li className="flex gap-2 rounded-none bg-default-200  justify-center pb-2 cursor-pointer">
          <span className="text-primary text-sm mt-2 hover:text-emphasis cursor-pointer">
            {children}
          </span>
        </li>
      </motion.span>
    </Link>
  );
};

const ProfileDrop: FC<{
  to: string;
  children: ReactNode;
  className?: string;
}> = ({ to, children, className }) => {
  return (
    <Link to={to}>
      <motion.span
        whileHover={{ scale: 1.1 }}
        style={{ cursor: 'pointer' }}
      >
        <li
          className={`flex gap-2 rounded-md justify-center pb-2 cursor-pointer ${className}`}
        >
          <span className="text-primary hover:text-emphasis cursor-pointer">
            {children}
          </span>
        </li>
      </motion.span>
    </Link>
  );
};

export default function Navbar() {
  const [cookies] = useCookies(['token']);
  const [user, setUser] = useState<any>({});
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isWhyClicked, setIsWhyClicked] = useState(false);
  const [isCommunityClicked, setIsCommunityClicked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogged, setisLogged] = useState(false);

  const whyDropdownRef = useRef<HTMLDivElement>(null);
  const communityDropdownRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const isClickInsideWhyDropdown =
        whyDropdownRef.current &&
        whyDropdownRef.current.contains(event.target as Node);
      const isClickInsideCommunityDropdown =
        communityDropdownRef.current &&
        communityDropdownRef.current.contains(event.target as Node);
      const isClickInsideProfileMenu =
        profileMenuRef.current &&
        profileMenuRef.current.contains(event.target as Node);

      if (
        !isClickInsideCommunityDropdown &&
        !isClickInsideWhyDropdown &&
        !isClickInsideProfileMenu
      ) {
        setIsWhyClicked(false);
        setIsCommunityClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleWhyClick = () => {
    setIsWhyClicked(!isWhyClicked);
    setIsCommunityClicked(false);
    setIsProfileMenuOpen(false);
  };

  const handleCommunityClick = () => {
    setIsCommunityClicked(!isCommunityClicked);
    setIsWhyClicked(false);
    setIsProfileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsCommunityClicked(false);
    setIsWhyClicked(false);
  };

  const toggleLoggedMenu = () => {
    setisLogged(!isLogged);
  };

  async function getProfile() {
    try {
      const res = await axiosInstance.post('/auth/me', {
        token: cookies.token,
      });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <nav
        className={`fixed w-full py-4 bg-[rgba(21,25,30,0.5)] backdrop-blur-sm transition-transform duration-300 ease-in-out ${
          scrollingUp ? 'translate-y-0' : '-translate-y-full'
        } z-50`}
      >
        <motion.div
          variants={variants}
          initial="initial"
          whileInView="animate"
          viewport={{ amount: 0.5, once: true }}
          className="relative flex justify-between items-center w-[70vw] md:w-[70vw] mx-auto lg:px-0"
        >
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Logo" className="w-12 sm:w-8" />
            <span className="text-2xl sm:text-xl font-bold text-primary cursor-pointer">
              Clickpulse
            </span>
          </Link>
          {/* Hidden Navbar Profile */}
          {user && user.username ? (
            <>
              <div className="justify-end mr-4 xl:flex relative w-3/4 text-primary text-lg mx-auto hidden">
                <div className="flex justify-between items-center py-4 text-primary rounded-none hover:text-emphasis">
                  <i
                    className="fa-solid fa-user text-secondary-100 mr-2 cursor-pointer hover:text-emphasis"
                    onClick={toggleProfileMenu}
                  ></i>
                </div>
                {isProfileMenuOpen && (
                  <div className="absolute justify-end top-full w-44 bg-gray-800 text-primary rounded-lg shadow-lg flex flex-col">
                    <Link
                      to="/dashboard"
                      className="xl:flex hidden justify-center items-center py-4 w-3/4 mx-auto text-primary text-lg cursor-pointer border-b-[1px] border-gray-600 hover:text-emphasis"
                      onClick={toggleProfileMenu}
                    >
                      <span className="cursor-pointer">
                        Dashboard
                      </span>
                    </Link>
                    <Link
                      to="/logout"
                      className="xl:flex hidden justify-center items-center py-4 w-3/4 mx-auto text-primary text-lg cursor-pointer hover:text-emphasis"
                      onClick={toggleProfileMenu}
                    >
                      <span className="cursor-pointer">Log out</span>
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Hidden Navbar Login/signup */}
              <div className="justify-end mr-4 xl:flex relative w-3/4 text-primary text-lg mx-auto hidden">
                <div className="flex justify-between items-center py-4 text-primary rounded-none hover:text-emphasis">
                  <i
                    className="fa-solid fa-user text-secondary-100 mr-2 cursor-pointer hover:text-emphasis"
                    onClick={toggleLoggedMenu}
                  ></i>
                </div>
                {isLogged && (
                  <div className="absolute top-full w-56 bg-gray-800 text-primary rounded-lg shadow-lg flex flex-col">
                    <Link
                      to="/login"
                      className="xl:flex hidden justify-center items-center py-4 w-3/4 mx-auto text-primary text-lg cursor-pointer border-b-[1px] border-gray-600 hover:text-emphasis"
                      onClick={toggleLoggedMenu}
                    >
                      <span className="cursor-pointer">Log in</span>
                    </Link>

                    <Link
                      to="/signup"
                      className="xl:flex hidden justify-center items-center py-4 w-3/4 mx-auto text-primary text-lg cursor-pointer hover:text-emphasis"
                      onClick={toggleLoggedMenu}
                    >
                      <span className="cursor-pointer">Sign up</span>
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="hidden xl:flex cursor-pointer hover:text-emphasis">
            <button
              onClick={toggleMobileMenu}
              className="text-primary"
            >
              <i
                className={`cursor-pointer hover:text-emphasis ${
                  isMobileMenuOpen
                    ? 'fa-solid fa-times scale-[1.60]'
                    : 'fa-solid fa-bars scale-[1.37]'
                } w-6`}
              ></i>
            </button>
          </div>

          {/* Desktop Why Clickpulse */}
          <div className="flex space-x-8 items-center xl:hidden">
            <div className="relative" ref={whyDropdownRef}>
              <div
                onClick={handleWhyClick}
                className="flex items-center space-x-1 hover:text-emphasis text-primary text-lg md:text-xl cursor-pointer"
              >
                <span className="cursor-pointer">Why Clickpulse</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-transform ${
                    isWhyClicked ? 'rotate-180' : 'rotate-0'
                  } cursor-pointer`}
                />
              </div>
              {isWhyClicked && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 text-primary rounded-lg shadow-lg">
                  <ul className="p-4 text-sm flex flex-col gap-2">
                    <Link
                      to="/feature1"
                      className="flex xl:hidden  justify-center items-center py-4 w-3/4 mx-auto text-primary text-lg cursor-pointer border-b-[1px] border-gray-600 hover:text-emphasis"
                      onClick={toggleLoggedMenu}
                    >
                      <span>Feature 1</span>
                    </Link>
                    <Link
                      to="/feature2"
                      className="flex xl:hidden justify-center items-center py-4 w-3/4 mx-auto text-primary text-lg cursor-pointer border-b-[1px] border-gray-600 hover:text-emphasis"
                      onClick={toggleLoggedMenu}
                    >
                      <span>Feature 2</span>
                    </Link>
                    <Link
                      to="/feature3"
                      className="flex xl:hidden justify-center items-center py-4 w-3/4 mx-auto text-primary text-lg cursor-pointer hover:text-emphasis"
                      onClick={toggleLoggedMenu}
                    >
                      <span>Feature 3</span>
                    </Link>
                  </ul>
                </div>
              )}
            </div>

            {/* Desktop Community */}
            <div className="relative" ref={communityDropdownRef}>
              <div
                onClick={handleCommunityClick}
                className="flex items-center space-x-1 hover:text-emphasis text-primary text-lg md:text-xl cursor-pointer"
              >
                <span className="cursor-pointer">Community</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-transform ${
                    isCommunityClicked ? 'rotate-180' : 'rotate-0'
                  } cursor-pointer`}
                />
              </div>
              {isCommunityClicked && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 text-primary rounded-lg shadow-lg">
                  <ul className="p-4 text-sm flex flex-col gap-2">
                    <Link
                      to="/community1"
                      className="flex xl:hidden  justify-center items-center py-4 w-3/4 mx-auto text-primary text-lg cursor-pointer border-b-[1px] border-gray-600 hover:text-emphasis"
                      onClick={toggleLoggedMenu}
                    >
                      <span>Community 1</span>
                    </Link>
                    <Link
                      to="/community2"
                      className="flex xl:hidden justify-center items-center py-4 w-3/4 mx-auto text-primary text-lg cursor-pointer border-b-[1px] border-gray-600 hover:text-emphasis"
                      onClick={toggleLoggedMenu}
                    >
                      <span>Community 2</span>
                    </Link>
                    <Link
                      to="/community3"
                      className="flex xl:hidden justify-center items-center py-4 w-3/4 mx-auto text-primary text-lg cursor-pointer hover:text-emphasis"
                      onClick={toggleLoggedMenu}
                    >
                      <span>Community 3</span>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
            {/*Desktop pricing*/}
            <Link
              to="/pricing"
              className="hover:text-emphasis text-primary text-lg md:text-xl cursor-pointer"
            >
              Pricing
            </Link>
          </div>

          {/* Desktop Profile/Login */}
          <div className="xl:hidden flex items-center space-x-8">
            {user && user.username ? (
              <div className="relative" ref={profileMenuRef}>
                <div
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-1 hover:text-emphasis text-primary md:text-lg text-lg cursor-pointer"
                >
                  <i className="fa-solid fa-user text-secondary-100 text-md mr-2"></i>
                  {user.username}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform ${
                      isProfileMenuOpen ? 'rotate-180' : 'rotate-0'
                    } ml-1 cursor-pointer`}
                  />
                </div>
                {isProfileMenuOpen && (
                  <div className="absolute top-full w-56 right-0 bg-gray-800 text-primary rounded-lg shadow-lg flex flex-col">
                    <ul className="p-4 text-lg flex flex-col gap-2 border-b-[1]">
                      <li>
                        <ProfileDrop
                          to="/dashboard"
                          className="flex justify-center items-center py-4 w-3/4 mx-auto text-primary text-lg cursor-pointer border-b-[1px] border-gray-600 rounded-none hover:text-emphasis"
                        >
                          Dashboard
                        </ProfileDrop>
                      </li>
                      <li>
                        <ProfileDrop to="/logout">Logout</ProfileDrop>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-emphasis text-primary md:text-lg text-xl cursor-pointer"
                >
                  Log In
                </Link>
                <Link to="/signup">
                  <Button>Sign In</Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>

        <div
          className={`fixed top-0 h-screen left-0 bg-gray-800 z-[99] w-screen transition-all overflow-hidden flex flex-col justify-start ${
            isMobileMenuOpen
              ? 'translate-x-0 opacity-100 pointer-events-auto'
              : '-translate-x-20 opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-center w-full h-full">
            <div className="w-[70vw] flex items-center justify-between mx-auto mt-4">
              <Link to="/" className="flex items-center space-x-2">
                <img src={Logo} alt="Logo" className="w-12 sm:w-8" />
                <span className="text-2xl sm:text-xl font-bold text-primary cursor-pointer">
                  Clickpulse
                </span>
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="text-white text-2xl focus:outline-none"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>

            {/* Hidden Navbar Why Clickpulse */}
            <div className="max-w-[30vw] md:min-w-[70vw] flex justify-center mt-4 mx-auto">
              <div className="relative w-3/4 md:w-full text-primary text-lg cursor-pointer mx-auto">
                <div
                  onClick={handleWhyClick}
                  className="flex justify-between items-center py-4 text-primary rounded-none border-b-[1px] border-b-gray-600 cursor-pointer hover:text-emphasis"
                >
                  <span className="cursor-pointer hover:text-emphasis">
                    Why Clickpulse
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform ${
                      isWhyClicked ? 'rotate-180' : 'rotate-0'
                    } cursor-pointer hover:text-emphasis`}
                  />
                </div>
                {isWhyClicked && (
                  <ul className="text-primary flex flex-col gap-2 mt-2 mb-2">
                    <DropdownItem to="/feature1">
                      Feature 1
                    </DropdownItem>
                    <DropdownItem to="/feature2">
                      Feature 2
                    </DropdownItem>
                    <DropdownItem to="/feature3">
                      Feature 3
                    </DropdownItem>
                  </ul>
                )}
              </div>
            </div>

            {/* Hidden Navbar Community */}
            <div className="max-w-[30vw] md:min-w-[70vw] flex justify-center mx-auto">
              <div className="relative w-3/4 md:w-full text-primary text-lg cursor-pointer mx-auto">
                <div
                  onClick={handleCommunityClick}
                  className="flex justify-between items-center py-4 text-primary rounded-none border-b-[1px] border-b-gray-600 cursor-pointer hover:text-emphasis"
                >
                  <span className="cursor-pointer hover:text-emphasis">
                    Community
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform ${
                      isCommunityClicked ? 'rotate-180' : 'rotate-0'
                    } cursor-pointer hover:text-emphasis`}
                  />
                </div>
                {isCommunityClicked && (
                  <ul className="text-primary flex flex-col gap-2 mt-2 mb-2">
                    <DropdownItem to="/community1">
                      Community 1
                    </DropdownItem>
                    <DropdownItem to="/community2">
                      Community 2
                    </DropdownItem>
                    <DropdownItem to="/community3">
                      Community 3
                    </DropdownItem>
                  </ul>
                )}
              </div>
            </div>

            {/* Hidden Pricing */}
            <div className="max-w-[30vw] md:min-w-[70vw] flex justify-center mx-auto">
              <Link
                to="/pricing"
                className="relative flex items-center py-4 text-primary rounded-none text-lg hover:text-emphasis"
              >
                <span className="flex-grow text-center cursor-pointer hover:text-emphasis">
                  Pricing
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
