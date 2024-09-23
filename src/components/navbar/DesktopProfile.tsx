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
        className="flex items-center space-x-2 hover:text-emphasis text-primary md:text-lg text-lg cursor-pointer"
      >
        {user.username}
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`transition-transform ${
            isProfileMenuOpen ? 'rotate-180' : 'rotate-0'
          } ml-1 cursor-pointer`}
        />
      </div>
      {isProfileMenuOpen && (
        <div className="absolute translate-y-5 top-full w-40 right-0 bg-default-300 text-primary rounded-lg shadow-lg flex flex-col">
          <ul className="text-lg flex flex-col">
            <li>
              <Link
                to="/dashboard"
                className="flex justify-start items-center py-4 px-4 w-full text-primary text-lg cursor-pointer border-b-[1px] border-gray-600 rounded-none hover:text-emphasis"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className="flex justify-start items-center py-4 px-4 w-full text-primary text-lg cursor-pointer rounded-none hover:text-emphasis"
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
