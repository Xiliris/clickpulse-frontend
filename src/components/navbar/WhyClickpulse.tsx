import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const WhyDropdown = ({
  className = '',
  itemClassName = '',
  isFullWidth = false,
}) => {
  const [isWhyClicked, setIsWhyClicked] = useState(false);
  const whyDropdownRef = useRef<HTMLDivElement | null>(null);

  const handleWhyClick = () => {
    setIsWhyClicked((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        whyDropdownRef.current &&
        !whyDropdownRef.current.contains(event.target as Node)
      ) {
        setIsWhyClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={whyDropdownRef}>
      <div
        onClick={handleWhyClick}
        className="w-full flex items-center lg:justify-between space-x-1 hover:text-emphasis text-primary text-xl md:text-xl cursor-pointer"
      >
        <span className="cursor-pointer xl:text-2xl">
          Why Clickpulse
        </span>
        <i
          className={`fa-solid fa-chevron-down transition-transform ${
            isWhyClicked ? 'rotate-180' : 'rotate-0'
          } cursor-pointer ml-auto md:text-2xl`}
        />
      </div>
      <div
        className={`transition-all ease-in-out duration-300 overflow-hidden ${
          isWhyClicked ? 'max-h-60' : 'max-h-0'
        } ${
          isFullWidth ? 'w-full' : 'w-40 absolute translate-y-5'
        } mr-9 bg-default-300 text-primary rounded-lg`}
      >
        <ul className={`text-sm flex flex-col ${itemClassName}`}>
          <Link
            to="/feature1"
            className="flex justify-start items-center py-4 px-4 w-full mx-auto text-primary text-lg cursor-pointer border-b-[1px] border-gray-600 hover:text-emphasis"
          >
            <span className="cursor-pointer">Feature 1</span>
          </Link>
          <Link
            to="/feature2"
            className="flex justify-start items-center py-4 px-4 w-full mx-auto text-primary text-lg cursor-pointer border-b-[1px] border-gray-600 hover:text-emphasis"
          >
            <span className="cursor-pointer">Feature 2</span>
          </Link>
          <Link
            to="/feature3"
            className="flex justify-start items-center py-4 px-4 w-full mx-auto text-primary text-lg cursor-pointer hover:text-emphasis"
          >
            <span className="cursor-pointer">Feature 3</span>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default WhyDropdown;
