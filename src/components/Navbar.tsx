import { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Profile from './navbar/Profile';
import useProfileMenu from './navbar/Hooks';
import MenuNavbar from './navbar/MenuNavbar';
import WhyClickpulse from './navbar/WhyClickpulse';
import Community from './navbar/Community';
import DesktopProfile from './navbar/DesktopProfile';
import Button from './form/Button';
import Logo from '../assets/logo.png';
import { HashLink } from 'react-router-hash-link';
import PricingDropdown from './navbar/Pricing';

interface navbarProps {
  width?: number;
}

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

const Navbar: FC<navbarProps> = ({ width }) => {
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

  const containerWidth = width ? `w-[${width}vw]` : 'w-[70vw]';

  return (
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
        className={`relative flex justify-between items-center ${containerWidth} md:w-[90vw] mx-auto lg:px-0`}
      >
        {/* Logo and Site Title */}
        <Link
          to="/"
          className="flex items-center space-x-2 w-[250px]"
        >
          <img src={Logo} alt="Logo" className="w-12 md:w-9" />
          <span className="text-3xl md:text-2xl font-bold text-primary cursor-pointer">
            Clickpulse
          </span>
        </Link>

        {/* Centered Desktop Navbar Links */}
        <div className="xl:hidden flex items-center gap-8 mx-auto">
          <WhyClickpulse />
          <Community />
          <PricingDropdown />
        </div>

        {/* Desktop Profile / Login */}
        <div className="xl:hidden flex items-center space-x-6 w-[250px] justify-end">
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

        {/* Mobile Profile / Menu */}
        <Profile
          user={user}
          isProfileMenuOpen={isProfileMenuOpen}
          isLogged={isLogged}
          toggleProfileMenu={toggleProfileMenu}
          toggleLoggedMenu={toggleLoggedMenu}
          toggleMobileMenu={toggleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />
      </motion.div>

      {/* Mobile Menu */}
      <MenuNavbar
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
    </nav>
  );
};

export default Navbar;
