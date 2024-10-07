import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface PricingMenuProps {
  className?: string;
  itemClassName?: string;
  isFullWidth?: boolean;
}

const PricingMenu = ({
  className = '',
  itemClassName = '',
  isFullWidth = false,
}: PricingMenuProps) => {
  const [isPricingClicked, setIsPricingClicked] = useState(false);
  const pricingDropdownRef = useRef<HTMLDivElement | null>(null);

  const handlePricingClick = () => {
    setIsPricingClicked((prev) => !prev);
  };

  const closeMenu = () => {
    setIsPricingClicked(false);
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
        className="w-full flex items-center lg:justify-between space-x-1 hover:text-emphasis text-primary text-xl md:text-xl cursor-pointer"
      >
        <span className="cursor-pointer xl:text-2xl">Pricing</span>
        <i
          className={`fa-solid fa-chevron-down transition-transform ${
            isPricingClicked ? 'rotate-180' : 'rotate-0'
          } cursor-pointer ml-auto md:text-2xl`}
        />
      </div>
      <div
        className={`transition-all ease-in-out duration-300 overflow-hidden ${
          isPricingClicked ? 'max-h-60' : 'max-h-0'
        } ${
          isFullWidth ? 'w-full' : 'w-40 absolute translate-y-5'
        } bg-default-300 xl:bg-default-200 text-primary rounded-lg`}
      >
        <ul className={`text-sm flex flex-col ${itemClassName}`}>
          <Link
            to="/pricing-more#monthly"
            onClick={closeMenu}
            className="flex justify-start items-center mt-2 py-2 w-full mx-auto text-secondary-100 text-lg cursor-pointer hover:text-emphasis"
          >
            <span className="cursor-pointer">Monthly</span>
          </Link>
          <Link
            to="/pricing-more#yearly"
            onClick={closeMenu}
            className="flex justify-start items-center py-2 w-full mx-auto text-secondary-100 text-lg cursor-pointer hover:text-emphasis"
          >
            <span className="cursor-pointer">Yearly</span>
          </Link>
          {/*<Link
            to="/pricing-more#plans"
            onClick={closeMenu}
            className="flex justify-start items-center py-4 px-4 w-full mx-auto text-primary text-lg cursor-pointer hover:text-emphasis"
          >
            <span className="cursor-pointer">Plan</span>
          </Link>*/}
        </ul>
      </div>
    </div>
  );
};

export default PricingMenu;
