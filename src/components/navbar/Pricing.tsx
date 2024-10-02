import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { HashLink } from 'react-router-hash-link';

const PricingDropdown = ({
  className = '',
  itemClassName = '',
  isFullWidth = false,
}) => {
  const [isPricingClicked, setIsPricingClicked] = useState(false);
  const pricingDropdownRef = useRef<HTMLDivElement | null>(null);

  const handlePricingClick = () => {
    setIsPricingClicked((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pricingDropdownRef.current &&
        !pricingDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPricingClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={pricingDropdownRef}>
      <div
        onClick={handlePricingClick}
        className="w-full flex items-center space-x-1 hover:text-emphasis text-primary text-xl cursor-pointer"
      >
        <span className="cursor-pointer xl:text-2xl">Pricing</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`transition-transform ${
            isPricingClicked ? 'rotate-180' : 'rotate-0'
          } cursor-pointer`}
        />
      </div>
      <div
        className={`transition-all ease-in-out duration-300 overflow-hidden ${
          isPricingClicked ? 'max-h-60' : 'max-h-0'
        } ${
          isFullWidth ? 'w-full' : 'w-40 absolute translate-y-5'
        } bg-default-300 text-primary rounded-lg`}
      >
        <ul className={`text-sm flex flex-col ${itemClassName}`}>
          <Link
            to="/pricing#monthly"
            className="py-4 px-4 text-primary text-lg border-b border-gray-600 hover:text-emphasis"
          >
            Monthly
          </Link>
          <HashLink
            to="/pricing#yearly"
            className="py-4 px-4 text-primary text-lg border-b border-gray-600 hover:text-emphasis"
          >
            Yearly
          </HashLink>
          <HashLink
            to="/#pricing"
            className="py-4 px-4 text-primary text-lg hover:text-emphasis"
          >
            Plans
          </HashLink>
        </ul>
      </div>
    </div>
  );
};

export default PricingDropdown;
