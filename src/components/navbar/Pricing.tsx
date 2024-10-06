import { useState, useRef, useEffect } from 'react';
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

    const handleScroll = () => {
      setIsPricingClicked(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={pricingDropdownRef}>
      <div
        onClick={handlePricingClick}
        className="w-full flex items-center space-x-1 hover:text-emphasis text-primary text-xl cursor-pointer"
      >
        <span className="cursor-pointer xl:text-2xl prevent-select">
          Pricing
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`transition-transform ${
            isPricingClicked ? 'rotate-180' : 'rotate-0'
          } cursor-pointer`}
        />
      </div>
      <div
        className={`transition-all ease-in-out duration-200 overflow-hidden ${
          isPricingClicked ? 'max-h-60' : 'max-h-0'
        } ${
          isFullWidth ? 'w-full' : 'w-40 absolute translate-y-5'
        } bg-default-100 text-primary rounded-lg`}
      >
        <ul className={`text-sm flex flex-col ${itemClassName}`}>
          <HashLink
            to="/pricing-more#monthly"
            className="py-2 mt-2 px-4 text-primary text-lg hover:text-emphasis cursor-pointer"
          >
            Monthly
          </HashLink>
          <HashLink
            to="/pricing-more#yearly"
            className="py-2 mb-2 px-4 text-primary text-lg hover:text-emphasis cursor-pointer"
          >
            Yearly
          </HashLink>
          {/*<HashLink
            to="/pricing-more#plans"
            className="py-4 px-4 text-primary text-lg hover:text-emphasis cursor-pointer"
          >
            Plans
          </HashLink> */}
        </ul>
      </div>
    </div>
  );
};

export default PricingDropdown;
