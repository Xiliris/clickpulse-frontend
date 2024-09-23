import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

interface ProfileMenuProps {
  user: { username: string } | null;
  isProfileMenuOpen: boolean;
  isLogged: boolean;
  toggleProfileMenu: () => void;
  toggleLoggedMenu: () => void;
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  user,
  isProfileMenuOpen,
  isLogged,
  toggleProfileMenu,
  toggleLoggedMenu,
  toggleMobileMenu,
  isMobileMenuOpen,
}) => {
  return (
    <>
      {user && user.username ? (
        <div className="relative w-3/4 text-primary text-lg mx-auto hidden xl:flex justify-end mr-4">
          {/* User Icon */}
          <div className="flex justify-between items-center py-4 cursor-pointer">
            <FontAwesomeIcon
              icon={faUser}
              className="text-secondary-100 mr-2"
              onClick={toggleProfileMenu}
            />
          </div>

          {/* Profile Dropdown */}
          {isProfileMenuOpen && (
            <div className="absolute top-full right-0 w-44 bg-gray-800 text-primary rounded-lg shadow-lg flex flex-col z-10">
              <Link
                to="/dashboard"
                className="py-4 w-full text-center text-primary border-b-[1px] border-gray-600 hover:text-emphasis"
                onClick={toggleProfileMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/logout"
                className="py-4 w-full text-center text-primary hover:text-emphasis"
                onClick={toggleProfileMenu}
              >
                Log out
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-3/4 text-primary text-lg mx-auto hidden xl:flex justify-end mr-4">
          {/* User Icon */}
          <div className="flex justify-between items-center py-4 cursor-pointer">
            <FontAwesomeIcon
              icon={faUser}
              className="text-secondary-100 mr-2"
              onClick={toggleLoggedMenu}
            />
          </div>

          {/* Login/Signup Dropdown */}
          {isLogged && (
            <div className="absolute top-full right-0 w-56 bg-gray-800 text-primary rounded-lg shadow-lg flex flex-col z-10">
              <Link
                to="/login"
                className="py-4 w-full text-center text-primary border-b-[1px] border-gray-600 hover:text-emphasis"
                onClick={toggleLoggedMenu}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="py-4 w-full text-center text-primary hover:text-emphasis"
                onClick={toggleLoggedMenu}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu Toggle */}
      <div className="hidden xl:flex cursor-pointer hover:text-emphasis">
        <button onClick={toggleMobileMenu} className="text-primary">
          <FontAwesomeIcon
            icon={isMobileMenuOpen ? faTimes : faBars}
            className={`cursor-pointer w-6 ${
              isMobileMenuOpen ? 'scale-[1.60]' : 'scale-[1.37]'
            }`}
          />
        </button>
      </div>
    </>
  );
};

export default ProfileMenu;
