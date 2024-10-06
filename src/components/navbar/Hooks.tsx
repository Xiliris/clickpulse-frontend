import { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useScroll } from 'framer-motion';
import axiosInstance from '../../modules/axiosInstance';

const useProfileMenu = () => {
  const [cookies] = useCookies(['token']);
  const { scrollY } = useScroll();
  const [user, setUser] = useState<any>({});
  const [scrollingUp, setScrollingUp] = useState(true);
  const [isWhyClicked, setIsWhyClicked] = useState(false);
  const [isCommunityClicked, setIsCommunityClicked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const whyDropdownRef = useRef<HTMLDivElement>(null);
  const communityDropdownRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    let oldValue = 0;
    const unsubscribe = scrollY.onChange((currentScrollY) => {
      let newValue = currentScrollY;

      if (oldValue > newValue) {
        setScrollingUp(true);
      } else {
        setScrollingUp(false);
      }

      oldValue = newValue;
    });

    return () => {
      unsubscribe();
    };
  }, [scrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const isClickInsideWhyDropdown =
        whyDropdownRef.current &&
        whyDropdownRef.current.contains(event.target as Node);
      const isClickInsideCommunityDropdown =
        communityDropdownRef.current &&
        communityDropdownRef.current.contains(event.target as Node);
      const isClickInsideProfileMenu =
        profileMenuRef.current &&
        profileMenuRef.current.contains(event.target as Node);

      if (
        !isClickInsideCommunityDropdown &&
        !isClickInsideWhyDropdown &&
        !isClickInsideProfileMenu
      ) {
        setIsWhyClicked(false);
        setIsCommunityClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsCommunityClicked(false);
    setIsWhyClicked(false);
  };

  const toggleLoggedMenu = () => {
    setIsLogged(!isLogged);
  };

  function handleScroll() {
    setIsLogged(false);
  }

  document.addEventListener('scroll', handleScroll);

  async function getProfile() {
    try {
      const res = await axiosInstance.post('/auth/me', {
        token: cookies.token,
      });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    user,
    scrollingUp,
    isWhyClicked,
    setIsWhyClicked,
    isCommunityClicked,
    setIsCommunityClicked,
    isMobileMenuOpen,
    toggleMobileMenu,
    isProfileMenuOpen,
    toggleProfileMenu,
    isLogged,
    toggleLoggedMenu,
    whyDropdownRef,
    communityDropdownRef,
    profileMenuRef,
  };
};

export default useProfileMenu;
