import { useState, useRef, useEffect } from 'react';

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

    const handleScroll = () => {
      setIsCommunityClicked(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
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
        <span className="cursor-pointer xl:text-2xl prevent-select">
          Socials
        </span>
        <i
          className={`fa-solid fa-chevron-down transition-transform ${
            isCommunityClicked ? 'rotate-180' : 'rotate-0'
          } cursor-pointer ml-auto md:text-2xl`}
        />
      </div>
      <div
        className={`transition-all ease-in-out duration-200 overflow-hidden ${
          isCommunityClicked ? 'max-h-65' : 'max-h-0'
        } ${
          isFullWidth ? 'w-full' : 'w-40 absolute translate-y-5'
        }  xl:bg-default-200 bg-default-100 text-primary rounded-lg`}
      >
        <ul className={` text-sm flex flex-col ${itemClassName}`}>
          <a
            href="https://x.com/ClickpulseTeam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-start items-center mt-2 py-2 px-4 xl:px-0 w-full mx-auto text-primary xl:text-secondary-100 text-lg cursor-pointer hover:text-emphasis"
          >
            <span className="cursor-pointer">Twitter</span>
          </a>
          <a
            href="https://www.tiktok.com/@clickpulseteam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-start items-center py-2 px-4 xl:px-0 w-full mx-auto text-primary xl:text-secondary-100 text-lg cursor-pointer hover:text-emphasis"
          >
            <span className="cursor-pointer">Tiktok</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-start items-center py-2 px-4 xl:px-0 w-full mx-auto text-primary xl:text-secondary-100 text-lg cursor-pointer hover:text-emphasis"
          >
            <span className="cursor-pointer">LinkedIn</span>
          </a>
          <a
            href="https://discord.gg/9eWFeSW7pz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-start items-center mb-2 py-2 px-4 xl:px-0 w-full mx-auto text-primary xl:text-secondary-100 text-lg cursor-pointer hover:text-emphasis"
          >
            <span className="cursor-pointer">Discord</span>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default CommunityDropdown;
