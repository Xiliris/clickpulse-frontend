import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface User {
  username: string;
}

interface ProfileDropdownProps {
  user: User;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

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
          <ul className="p-4 text-lg flex flex-col gap-2 border-b-[1px]">
            <li>
              <Link
                to="/dashboard"
                className="flex justify-center items-center py-4 w-3/4 mx-auto text-primary text-lg cursor-pointer border-b-[1px] border-gray-600 rounded-none hover:text-emphasis"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className="flex justify-center items-center py-4 w-3/4 mx-auto text-primary text-lg cursor-pointer rounded-none hover:text-emphasis"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
