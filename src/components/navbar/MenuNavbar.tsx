import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import WhyClickpulse from './WhyClickpulse';
import Community from './Community';
import PricingMenu from './PricingMenu';

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  isLogged: boolean;
  user?: { username: string }; // Add user prop
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  isLogged,
  user,
}) => {
  const [, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 h-screen left-0 bg-default-200 z-[99] w-screen transition-all overflow-hidden flex flex-col justify-start ${
        isMobileMenuOpen
          ? 'translate-x-0 opacity-100 pointer-events-auto'
          : '-translate-x-20 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center w-full h-full">
        {/* Logo and Close Button */}
        <div className="w-[90vw] flex items-center justify-between mx-auto mt-7">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={Logo}
              alt="Clickpulse Logo"
              className="w-[28px] md:w-[20px]"
              width={30}
              height={30}
              loading="eager"
              title="Clickpulse logo"
            />
            <span className="text-2xl xl:text-2xl font-bold text-primary cursor-pointer prevent-select">
              Clickpulse
            </span>
          </Link>
          <i
            onClick={toggleMobileMenu}
            className="text-primary xl:text-2xl cursor-pointer hover:text-emphasis"
          >
            <i className={`cursor-pointer fa-solid fa-times`}></i>
          </i>
        </div>

        {/* Why Clickpulse */}
        <div className="w-[90vw] flex justify-between mt-[45px] mx-auto">
          <WhyClickpulse
            className="relative w-full text-primary cursor-pointer mx-auto"
            isFullWidth={true}
          />
        </div>

        {/* Community */}
        <div className="w-[90vw] flex justify-between mx-auto mt-5">
          <Community
            className="relative w-full text-primary cursor-pointer mx-auto"
            isFullWidth={true}
          />
        </div>

        {/* Pricing */}
        <div className="w-[90vw] flex mx-auto justify-between mt-5">
          <PricingMenu
            className="relative w-full text-primary cursor-pointer mx-auto"
            isFullWidth={true}
          />
        </div>

        {/* Login/Signup Dropdown */}
        {!isLogged && (
          <div className="w-[90vw] flex justify-between mx-auto relative">
            <div className="absolute top-full w-40 bg-default-200 text-primary flex flex-col space-y-5">
              <Link
                to="/login"
                className="flex mt-5 justify-start items-center px-4 xl:px-0 w-full mx-auto text-2xl cursor-pointer hover:text-emphasis"
              >
                <span className="cursor-pointer xl:text-2xl prevent-select">
                  Log in
                </span>
              </Link>
              <Link
                to="/signup"
                className="flex mt-2 justify-start items-center px-4 xl:px-0 w-full mx-auto text-2xl cursor-pointer hover:text-emphasis"
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
