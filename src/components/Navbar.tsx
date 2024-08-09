import { useState, useEffect, useRef, FC, ReactNode } from "react";
import axiosInstance from "../modules/axiosInstance";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "./form/Button";
import Logo from "../assets/logo.png";

const DropdownItem: FC<{ to: string; children: ReactNode }> = ({ to, children }) => {
  return (
    <li className="flex gap-2 transform transition-transform duration-300 hover:scale-105">
      <span className="text-primary text-sm mt-2 hover:text-emphasis">
        <Link to={to}>{children}</Link>
      </span>
    </li>
  );
};

export default function Navbar() {
  const [cookies] = useCookies(["token"]);
  const [user, setUser] = useState<any>({});
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isWhyClicked, setIsWhyClicked] = useState(false);
  const [isCommunityClicked, setIsCommunityClicked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsWhyClicked(false);
        setIsCommunityClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleWhyClick = () => {
    setIsWhyClicked(!isWhyClicked);
    if (isCommunityClicked) setIsCommunityClicked(false);
  };

  const handleCommunityClick = () => {
    setIsCommunityClicked(!isCommunityClicked);
    if (isWhyClicked) setIsWhyClicked(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  async function getProfile() {
    try {
      const res = await axiosInstance.post("/auth/me", {
        token: cookies.token,
      });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <nav
        className={`fixed w-full py-4 bg-gray-800 transition-transform duration-300 ease-in-out ${
          scrollingUp ? "translate-y-0" : "-translate-y-full"
        } z-50`}
      >
        <div className="relative flex justify-between items-center w-[70vw] max-w-7xl mx-auto lg:px-0 cursor-pointer md:w-[90vw]">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Logo" className="w-12" />
            <span className="text-2xl sm:text-3xl font-bold text-primary cursor-pointer">Clickpulse</span>
          </Link>

          <div className="hidden lg:flex">
            <button onClick={toggleMobileMenu} className="text-primary">
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>

          <div className="flex space-x-8 items-center lg:hidden">
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={handleWhyClick}
                className="flex items-center space-x-1 hover:text-emphasis text-primary text-lg md:text-xl cursor-pointer"
              >
                <span>Why Clickpulse</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-transform ${isWhyClicked ? "rotate-180" : "rotate-0"}`}
                />
              </div>
              {isWhyClicked && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-700 text-primary rounded-lg shadow-lg">
                  <ul className="p-4 space-y-2 text-sm">
                    <DropdownItem to="/feature1">Feature 1</DropdownItem>
                    <DropdownItem to="/feature2">Feature 2</DropdownItem>
                    <DropdownItem to="/feature3">Feature 3</DropdownItem>
                  </ul>
                </div>
              )}
            </div>
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={handleCommunityClick}
                className="flex items-center space-x-1 hover:text-emphasis text-primary md:text-lg text-xl cursor-pointer"
              >
                <span>Community</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-transform ${isCommunityClicked ? "rotate-180" : "rotate-0"}`}
                />
              </div>
              {isCommunityClicked && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-700 text-primary rounded-lg shadow-lg">
                  <ul className="p-4 space-y-2 text-sm">
                    <DropdownItem to="/community1">Community 1</DropdownItem>
                    <DropdownItem to="/community2">Community 2</DropdownItem>
                    <DropdownItem to="/community3">Community 3</DropdownItem>
                  </ul>
                </div>
              )}
            </div>
            <Link to="/pricing" className="hover:text-emphasis text-primary text-lg md:text-xl">
              Pricing
            </Link>
          </div>

          <div className="lg:hidden flex items-center space-x-8">
            {user && user.username ? (
              <Link
                to="/dashboard"
                className="flex items-center space-x-1 hover:text-emphasis text-primary md:text-lg text-xl"
              >
                {user.username}
              </Link>
            ) : (
              <>
                <Link to="/login" className="hover:text-emphasis text-primary md:text-lg text-xl">
                  Log In
                </Link>
                <Link to="/signup">
                  <Button>Sign In</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-gray-800 min-w-[90vw]">
            <div className="flex flex-col items-center space-y-4 py-6">
              <div className="w-full">
                <div
                  onClick={handleWhyClick}
                  className="flex justify-between items-center w-full px-4 py-2 text-primary text-lg cursor-pointer hover:bg-gray-700"
                >
                  <span>Why Clickpulse</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform ${isWhyClicked ? "rotate-180" : "rotate-0"}`}
                  />
                </div>
                {isWhyClicked && (
                  <ul className="bg-gray-700 text-primary">
                    <DropdownItem to="/feature1">Feature 1</DropdownItem>
                    <DropdownItem to="/feature2">Feature 2</DropdownItem>
                    <DropdownItem to="/feature3">Feature 3</DropdownItem>
                  </ul>
                )}
              </div>
              <div className="w-full">
                <div
                  onClick={handleCommunityClick}
                  className="flex justify-between items-center w-full px-4 py-2 text-primary text-lg cursor-pointer hover:bg-gray-700"
                >
                  <span>Community</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform ${isCommunityClicked ? "rotate-180" : "rotate-0"}`}
                  />
                </div>
                {isCommunityClicked && (
                  <ul className="bg-gray-700 text-primary">
                    <DropdownItem to="/community1">Community 1</DropdownItem>
                    <DropdownItem to="/community2">Community 2</DropdownItem>
                    <DropdownItem to="/community3">Community 3</DropdownItem>
                  </ul>
                )}
              </div>
              <Link to="/pricing" className="hover:text-emphasis text-primary text-lg">
                Pricing
              </Link>
              <div className="flex flex-col items-center space-y-4">
                {user && user.username ? (
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-1 hover:text-emphasis text-primary text-lg"
                  >
                    {user.username}
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="hover:text-emphasis text-primary text-lg">
                      Log In
                    </Link>
                    <Link to="/signup">
                      <Button>Sign In</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
