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
} from '@fortawesome/free-solid-svg-icons';
import Button from './form/Button';
import Logo from '../assets/logo.png';

const variants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: 'spring',
    },
  },
};

const DropdownItem: FC<{ to: string; children: ReactNode }> = ({
  to,
  children,
}) => {
  return (
    <Link to={to}>
      <motion.span
        whileHover={{ scale: 1.1 }}
        style={{ cursor: 'pointer' }}
      >
        <li className="flex gap-2 bg-default-200 rounded md justify-center pb-2 cursor-pointer">
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
          className={`flex gap-2 bg-default-200 rounded-md justify-center pb-2 cursor-pointer ${className}`}
        >
          <span className="text-primary text-sm mt-2 hover:text-emphasis cursor-pointer">
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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        whyDropdownRef.current &&
        !whyDropdownRef.current.contains(event.target as Node)
      ) {
        setIsWhyClicked(false);
      }

      if (
        communityDropdownRef.current &&
        !communityDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCommunityClicked(false);
      }

      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleWhyClick = () => {
    setIsWhyClicked((prev) => !prev);
    setIsCommunityClicked(false);
  };

  const handleCommunityClick = () => {
    setIsCommunityClicked(!isCommunityClicked);
    if (isWhyClicked) setIsWhyClicked(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
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
        className={`fixed w-full py-4 bg-gray-800 transition-transform duration-300 ease-in-out xl:bg-gray-800 ${
          scrollingUp ? 'translate-y-0' : '-translate-y-full'
        } z-50`}
      >
        <motion.div
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
          {/* Hidden Navbar Profile/login */}
          {user && user.username ? (
            <div className="justify-center xl:flex relative w-3/4 text-primary text-lg mx-auto hidden">
              <div
                onClick={toggleProfileMenu}
                className="flex justify-between items-center py-4 text-primary rounded-none hover:text-emphasis"
              >
                <i className="fa-solid fa-user text-secondary-100 text-lg mr-2 cursor-pointer hover:text-emphasis"></i>
              </div>
              {isProfileMenuOpen && (
                <ul className="absolute left-0 w-full mt-2 bg-gray-800 text-primary flex flex-col gap-2">
                  <li>
                    <ProfileDrop to="/dashboard">
                      Dashboard
                    </ProfileDrop>
                  </li>
                  <li>
                    <ProfileDrop to="/logout">Logout</ProfileDrop>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="xl:flex hidden justify-center items-center py-4 w-3/4 mx-auto text-primary text-lg cursor-pointer border-b-[1px] border-gray-600 hover:text-emphasis"
              >
                <span>Log In</span>
              </Link>
              <Link
                to="/signup"
                className="xl:flex hidden justify-center items-center py-4 w-3/4 mx-auto text-primary text-lg cursor-pointer hover:text-emphasis"
              >
                <span>Sign Up</span>
              </Link>
            </>
          )}

          <div className="hidden xl:flex  cursor-pointer hover:text-emphasis">
            <button
              onClick={toggleMobileMenu}
              className="text-primary"
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faTimes : faBars}
                className={' cursor-pointer hover:text-emphasis'}
                size="xl"
              />
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
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-700 text-primary rounded-lg shadow-lg">
                  <ul className="p-4 space-y-2 text-sm flex flex-col gap-2 mt-2">
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
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-700 text-primary rounded-lg shadow-lg">
                  <ul className="p-4 space-y-2 text-sm flex flex-col gap-2 mt-2">
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
                  <div className="absolute top-full right-0 mt-2 w-48 bg-gray-700 text-primary rounded-lg shadow-lg">
                    <ul className="p-4 space-y-2 text-sm flex flex-col gap-2 mt-2">
                      <li>
                        <ProfileDrop to="/dashboard">
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

        {isMobileMenuOpen && (
          <div className="w-[70vw] md:min-w-[70vw] xl:flex xl:justify-end xl:max-w-[30vw]">
            <div className="hidden bg-gray-800 xl:flex flex-col items-center absolute right-[15vw] md:rounded-none rounded-xl">
              <div className="items-center min-w-[30vw] md:min-w-[70vw]">
                {/* Hidden Navbar Why Clickpulse */}
                <div className="max-w-[30vw] md:min-w-[70vw] flex justify-center mt-4 ">
                  <div className="relative w-3/4 text-primary text-lg cursor-pointer mx-auto">
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
                <div className="max-w-[30vw] md:min-w-[70vw] flex justify-center">
                  <div className="relative w-3/4 text-primary text-lg cursor-pointer mx-auto">
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
                          isCommunityClicked
                            ? 'rotate-180'
                            : 'rotate-0'
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
                <div className="max-w-[30vw] md:min-w-[70vw] flex justify-center">
                  <Link
                    to="/pricing"
                    className="relative flex items-center py-4 w-3/4 text-primary rounded-none text-lg hover:text-emphasis"
                  >
                    <span className="flex-grow text-center cursor-pointer hover:text-emphasis">
                      Pricing
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
