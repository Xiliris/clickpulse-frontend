import React from 'react';
import { Link } from 'react-router-dom';

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
                  <span className="cursor-pointer">Dashboard</span>
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
        <button onClick={toggleMobileMenu} className="text-primary">
          <i
            className={`cursor-pointer hover:text-emphasis ${
              isMobileMenuOpen
                ? 'fa-solid fa-times scale-[1.60]'
                : 'fa-solid fa-bars scale-[1.37]'
            } w-6`}
          ></i>
        </button>
      </div>
    </>
  );
};

export default ProfileMenu;
