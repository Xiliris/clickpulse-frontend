import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

    const handleScroll = () => {
      setIsWhyClicked(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={whyDropdownRef}>
      <div
        onClick={handleWhyClick}
        className="w-full flex items-center lg:justify-between space-x-1 hover:text-emphasis text-primary text-xl md:text-xl cursor-pointer"
      >
        <span className="cursor-pointer xl:text-2xl prevent-select">
          Why Clickpulse
        </span>
        <i
          className={`fa-solid fa-chevron-down transition-transform ${
            isWhyClicked ? 'rotate-180' : 'rotate-0'
          } cursor-pointer ml-auto md:text-2xl`}
        />
      </div>
      <div
        className={`transition-all ease-in-out duration-200 overflow-hidden ${
          isWhyClicked ? 'max-h-65' : 'max-h-0'
        } ${
          isFullWidth ? 'w-full' : 'w-56 absolute translate-y-5'
        } mr-9 bg-default-100 xl:bg-default-200 text-primary rounded-lg`}
      >
        <ul className={`text-sm flex flex-col ${itemClassName}`}>
          <Link
            to="/lightweight"
            className="flex mt-2 justify-start items-center py-2 px-4 xl:px-0  w-full mx-auto text-primary xl:text-secondary-100 text-lg cursor-pointer hover:text-emphasis"
          >
            <span className="cursor-pointer">Lightweight Script</span>
          </Link>
          <Link
            to="/privacy-commitment"
            className="flex justify-start items-center py-2 px-4 xl:px-0  w-full mx-auto text-primary xl:text-secondary-100 text-lg cursor-pointer hover:text-emphasis"
          >
            <span className="cursor-pointer">Privacy Commitment</span>
          </Link>
          <Link
            to="/easy-to-use"
            className="flex justify-start items-center py-2 px-4 xl:px-0  w-full mx-auto text-primary xl:text-secondary-100 text-lg cursor-pointer hover:text-emphasis"
          >
            <span className="cursor-pointer">Easy To Use</span>
          </Link>
          <Link
            to="/constantly-improving"
            className="flex justify-start items-center py-2 px-4 mb-2 xl:px-0 w-full mx-auto text-primary xl:text-secondary-100 text-lg cursor-pointer hover:text-emphasis"
          >
            <span className="cursor-pointer">
              Constantly Improving
            </span>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default WhyDropdown;
