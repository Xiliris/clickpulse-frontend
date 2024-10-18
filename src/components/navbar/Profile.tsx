import React, { useEffect, useRef } from 'react';
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
  toggleProfileMenu: () => void;
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  user,
  isProfileMenuOpen,
  toggleProfileMenu,
  toggleMobileMenu,
  isMobileMenuOpen,
}) => {
  const desktopProfileMenuRef = useRef<HTMLDivElement | null>(null);
  const desktopProfileButtonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        desktopProfileMenuRef.current &&
        !desktopProfileMenuRef.current.contains(
          event.target as Node
        ) &&
        desktopProfileButtonRef.current &&
        !desktopProfileButtonRef.current.contains(
          event.target as Node
        )
      ) {
        if (isProfileMenuOpen) {
          toggleProfileMenu();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isProfileMenuOpen, toggleProfileMenu]);

  return (
    <>
      {user && user.username ? (
        <div
          className="relative w-3/4 text-primary text-lg mx-auto hidden xl:flex justify-end mr-4"
          ref={desktopProfileButtonRef}
        >
          {/* User Icon */}
          <div className="flex justify-between items-center py-4">
            <FontAwesomeIcon
              icon={faUser}
              className="text-secondary-100 mr-2 md:text-xl cursor-pointer"
              onClick={toggleProfileMenu}
            />
          </div>

          {/* Profile Dropdown */}
          {isProfileMenuOpen && (
            <div
              ref={desktopProfileMenuRef}
              className="absolute top-full right-0 w-56 bg-default-300 text-primary rounded-lg shadow-lg flex flex-col z-10"
            >
              <span className="py-4 w-full font-bold text-xl text-center text-primary border-b-[1px] border-gray-600 hover:text-emphasis cursor-pointer">
                {user.username}
              </span>
              <Link
                to="/dashboard"
                className="py-4 w-full text-center text-primary hover:text-emphasis cursor-pointer"
                onClick={toggleProfileMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/change-password"
                className="py-4 w-full text-center text-primary hover:text-emphasis cursor-pointer"
                onClick={toggleProfileMenu}
              >
                Change Password
              </Link>
              <Link
                to="/logout"
                className="py-4 w-full text-center text-primary hover:text-emphasis cursor-pointer"
                onClick={toggleProfileMenu}
              >
                Log out
              </Link>
            </div>
          )}
        </div>
      ) : null}

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
