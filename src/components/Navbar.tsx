import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import { useCookies } from "react-cookie";
import axiosInstance from "../modules/axiosInstance";
import Desktop from "./navbar/Desktop";
import Mobile from "./navbar/Mobile";

import Logo from "../assets/logo.svg";

const variants = {
  initial: {
    opacity: 0,
    y: -25,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      type: "tween",
      ease: "easeInOut",
    },
  },
};

interface navbarProps {
  width?: number;
}

const Navbar: FC<navbarProps> = ({ width }) => {
  const containerWidth = width ? `w-[${width}vw]` : "w-[70vw]";
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [cookies] = useCookies(["token"]);

  function handleToggle() {
    setIsActive((prev) => !prev);
  }

  useEffect(() => {
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

    getProfile();
  }, []);

  let navStyle = isActive
    ? "bg-default-200"
    : "bg-default-300 bg-opacity-30  backdrop-blur-sm";

  return (
    <motion.header
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ amount: 0.5, once: true }}
      className={`w-full fixed z-50 ${navStyle}`}
    >
      <nav
        className={`${containerWidth} mx-auto py-5 md:w-[90vw] flex justify-between items-center`}
      >
        <HashLink
          to="/"
          className="flex items-center justify-start gap-2 cursor-pointer"
        >
          <img
            src={Logo}
            alt="logo"
            width={30}
            height={30}
            loading="eager"
            title="Logo"
            className="cursor-pointer"
          />
          <p className="text-emphasis font-bold text-2xl cursor-pointer">
            Clickpulse
          </p>
        </HashLink>

        <Mobile user={user} handleToggle={handleToggle} isActive={isActive} />
        <Desktop loadingUser={loadingUser} user={user} />
      </nav>
    </motion.header>
  );
};

export default Navbar;
