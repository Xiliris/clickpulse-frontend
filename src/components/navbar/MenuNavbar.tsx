import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logo.png';
import WhyClickpulse from './WhyClickpulse';
import Community from './Community';

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMobileMenuOpen,
  toggleMobileMenu,
}) => {
  return (
    <div
      className={`fixed top-0 h-screen left-0 bg-default-200 z-[99] w-screen transition-all overflow-hidden flex flex-col justify-start ${
        isMobileMenuOpen
          ? 'translate-x-0 opacity-100 pointer-events-auto'
          : '-translate-x-20 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center w-full h-full">
        <div className="w-[90vw] flex items-center justify-between mx-auto mt-5">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Logo" className="w-12 sm:w-13  " />
            <span className="text-2xl xl:text-3xl font-bold text-primary cursor-pointer">
              Clickpulse
            </span>
          </Link>
          <i
            onClick={toggleMobileMenu}
            className="text-primary xl:text-3xl cursor-pointer hover:text-emphasis"
          >
            <FontAwesomeIcon
              icon={isMobileMenuOpen ? faTimes : faBars}
            />
          </i>
        </div>

        {/*Why Clickpulse */}
        <div className="w-[90vw] flex justify-between mt-[45px] mx-auto">
          <WhyClickpulse
            className="relative w-full text-primary cursor-pointer mx-auto"
            isFullWidth={true}
          />
        </div>

        {/*Community */}
        <div className="w-[90vw] flex justify-between mx-auto mt-5">
          <Community
            className="relative w-full text-primary cursor-pointer mx-auto"
            isFullWidth={true}
          />
        </div>

        {/*Pricing */}
        <div className="w-[90vw] flex mx-auto">
          <Link
            to="/pricing"
            className="relative flex items-start mt-5 text-primary rounded-none text-xl hover:text-emphasis"
          >
            <span className="flex-grow text-center cursor-pointer hover:text-emphasis xl:text-2xl">
              Pricing
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
