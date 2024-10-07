import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

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
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        if (isProfileMenuOpen) {
          toggleProfileMenu();
        }
        if (isLogged) {
          toggleLoggedMenu();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isProfileMenuOpen, isLogged, toggleProfileMenu, toggleLoggedMenu]);

  return (
    <>
      {user && user.username ? (
        <div className="relative w-3/4 text-primary text-lg mx-auto hidden xl:flex justify-end mr-4">
          {/* User Icon */}
          <div className="flex justify-between items-center py-4">
            <i
              className="fa-solid fa-user text-secondary-100 mr-2 md:text-xl cursor-pointer"
              onClick={toggleProfileMenu}
            ></i>
          </div>

          {/* Profile Dropdown */}
          {isProfileMenuOpen && (
            <div className="absolute top-full right-0 w-56 bg-default-300 text-primary rounded-lg shadow-lg flex flex-col z-10">
              <Link
                to="/dashboard"
                className="py-4 w-full text-center text-primary border-b-[1px] border-gray-600 hover:text-emphasis cursor-pointer"
                onClick={toggleProfileMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/change-password"
                className="py-4 w-full text-center text-primary border-b-[1px] border-gray-600 hover:text-emphasis cursor-pointer"
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
      ) : (
        <div className="relative w-3/4 text-primary text-lg mx-auto hidden xl:flex justify-end mr-4">
          {/* User Icon */}
          <div className="flex justify-between items-center py-4 cursor-pointer">
            <FontAwesomeIcon
              icon={faUser}
              className="text-secondary-100"
              onClick={toggleLoggedMenu}
            />
          </div>

          {/* Login/Signup Dropdown */}
          {isLogged && (
            <div className="absolute top-full right-0 w-40 bg-default-100 text-primary rounded-lg shadow-lg flex flex-col z-10">
              <Link
                to="/login"
                className="py-2 mt-2 px-4 w-full text-start text-primary hover:text-emphasis"
                onClick={toggleLoggedMenu}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="py-2 mb-2 px-4 w-full text-start text-primary hover:text-emphasis"
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
              isMobileMenuOpen ? "scale-[1.60]" : "scale-[1.37]"
            }`}
          />
        </button>
      </div>
    </>
  );
};

export default ProfileMenu;
