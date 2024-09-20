// src/components/Navbar.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Button from './form/Button';
import Logo from '../assets/logo.png';
import Profile from './navbar/Profile';
import DesktopProfile from './navbar/DesktopProfile';
import WhyClickpulse from './navbar/WhyClickpulse';
import Community from './navbar/Community';
import useProfileMenu from './navbar/Hooks';

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

export default function Navbar() {
  const {
    user,
    scrollingUp,
    isMobileMenuOpen,
    toggleMobileMenu,
    isProfileMenuOpen,
    toggleProfileMenu,
    isLogged,
    toggleLoggedMenu,
  } = useProfileMenu();

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
          <Profile
            user={user}
            isProfileMenuOpen={isProfileMenuOpen}
            isLogged={isLogged}
            toggleProfileMenu={toggleProfileMenu}
            toggleLoggedMenu={toggleLoggedMenu}
            toggleMobileMenu={toggleMobileMenu}
            isMobileMenuOpen={isMobileMenuOpen}
          />

          {/* Desktop Why Clickpulse */}
          <div className="flex items-center xl:hidden">
            <WhyClickpulse className="relative" />

            {/* Desktop Community */}
            <div className="flex items-center xl:hidden">
              <Community className="relative" />
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
          <div className="xl:hidden flex items-center">
            {user && user.username ? (
              <DesktopProfile user={user} />
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
          className={`fixed top-0 h-screen left-0 bg-default-200 z-[99] w-screen transition-all overflow-hidden flex flex-col justify-start ${
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
            <div className="w-[70vw] flex justify-between mt-4 mx-auto">
              <WhyClickpulse
                className="relative w-full text-primary cursor-pointer mx-auto"
                isFullWidth={true}
              />
            </div>

            {/* Hidden Navbar Community */}
            <div className="w-[70vw] flex justify-between mx-auto mt-2">
              <Community
                className="relative w-full text-primary cursor-pointer mx-auto"
                isFullWidth={true}
              />
            </div>

            {/* Hidden Pricing */}
            <div className="w-[70vw] flex mx-auto">
              <Link
                to="/pricing"
                className="relative flex items-start mt-2 text-primary rounded-none text-xl hover:text-emphasis"
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
