import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const CommunityDropdown = ({
  className = '',
  itemClassName = '',
  isFullWidth = false,
}) => {
  const [isCommunityClicked, setIsCommunityClicked] = useState(false);
  const communityDropdownRef = useRef<HTMLDivElement | null>(null);

  const handleCommunityClick = () => {
    setIsCommunityClicked((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        communityDropdownRef.current &&
        !communityDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCommunityClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative ${className}`}
      ref={communityDropdownRef}
    >
      <div
        onClick={handleCommunityClick}
        className="w-full flex items-center lg:justify-between space-x-1 hover:text-emphasis text-primary text-xl md:text-xl cursor-pointer"
      >
        <span className="cursor-pointer xl:text-2xl">Community</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`transition-transform ${
            isCommunityClicked ? 'rotate-180' : 'rotate-0'
          } cursor-pointer ml-auto md:text-2xl`}
        />
      </div>
      <div
        className={`transition-all ease-in-out duration-300 overflow-hidden ${
          isCommunityClicked ? 'max-h-60' : 'max-h-0'
        } ${
          isFullWidth ? 'w-full' : 'w-40 absolute translate-y-5'
        }  bg-default-300 text-primary rounded-lg`}
      >
        <ul className={` text-sm flex flex-col ${itemClassName}`}>
          <Link
            to="/community1"
            className="flex justify-start items-center py-4 px-4 w-full mx-auto text-primary text-lg cursor-pointer border-b-[1px] border-gray-600 hover:text-emphasis"
          >
            <span className="cursor-pointer">Community 1</span>
          </Link>
          <Link
            to="/community2"
            className="flex justify-start items-center py-4 px-4 w-full mx-auto text-primary text-lg cursor-pointer border-b-[1px] border-gray-600 hover:text-emphasis"
          >
            <span className="cursor-pointer">Community 2</span>
          </Link>
          <Link
            to="/community3"
            className="flex justify-start items-center py-4 px-4 w-full mx-auto text-primary text-lg cursor-pointer hover:text-emphasis"
          >
            <span className="cursor-pointer">Community 3</span>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default CommunityDropdown;
