import { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useScroll } from "framer-motion";
import axiosInstance from "../../modules/axiosInstance";

const useProfileMenu = () => {
  const [cookies] = useCookies(["token"]);
  const { scrollY } = useScroll();
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
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
    if (!user) {
      getProfile();
    } else {
      setLoadingUser(false);
    }
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

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
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

  document.addEventListener("scroll", handleScroll);

  async function getProfile() {
    const storedUser = sessionStorage.getItem("user");
    if (!cookies.token) return setLoadingUser(false);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoadingUser(false);
    } else {
      try {
        const res = await axiosInstance.post("/auth/me", {
          token: cookies.token,
        });

        setUser(res.data);
        sessionStorage.setItem("user", JSON.stringify(res.data));
        setLoadingUser(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setLoadingUser(false);
      }
    }
  }

  return {
    user,
    loadingUser,
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
