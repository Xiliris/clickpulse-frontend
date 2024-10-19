import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Item from "./Item";
import ExternalItem from "./ExternalItem";
import Button from "../form/Button";
import SecondaryButton from "../form/SecondaryButton";

function Mobile({ user, isActive, handleToggle }: any) {
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isActive]);

  return (
    <>
      {isActive ? (
        <>
          <i
            className={
              "fa-solid fa-xmark fa-xl text-primary cursor-pointer hover:text-emphasis transition-colors duration-300 clg:hidden"
            }
            onClick={handleToggle}
          ></i>
        </>
      ) : (
        <i
          className={
            "fa-solid fa-bars fa-xl text-primary cursor-pointer hover:text-emphasis transition-colors duration-300 clg:hidden"
          }
          onClick={handleToggle}
        ></i>
      )}
      <AnimatePresence>{isActive && <Overlay user={user} />}</AnimatePresence>
    </>
  );
}
const variants = {
  initial: {
    opacity: 0,
    y: -25,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      type: "tween",
    },
  },
  exit: {
    opacity: 0,
    y: -25,
    transition: {
      duration: 0.2,
      type: "tween",
    },
  },
};

function Overlay({ user }: any) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className="w-screen h-custom bg-default-200 absolute top-[60px] left-0 overflow-y-scroll clg:hidden"
    >
      <div className="w-[70vw] mx-auto py-2 md:w-[90vw] -z-10">
        <div className="border-t border-default-100 border-b py-3">
          <Item
            href="/lightweight"
            icon="fa-feather"
            className="justify-between flex-row-reverse"
          >
            Lightweight Script
          </Item>
          <Item
            href="/privacy-commitment"
            icon="fa-user-shield"
            className="justify-between flex-row-reverse"
          >
            Privacy Commitment
          </Item>
          <Item
            href="/easy-to-use"
            icon="fa-thumbs-up"
            className="justify-between flex-row-reverse"
          >
            Easy to use
          </Item>
          <Item
            href="/constantly-improving"
            icon="fa-sync-alt"
            className="justify-between flex-row-reverse"
          >
            Constantly Improving
          </Item>
        </div>
        <div className="border-default-100 border-b py-3">
          <ExternalItem
            href="https://x.com/ClickpulseTeam"
            icon="fa-brands fa-twitter"
            className="justify-between flex-row-reverse"
          >
            Twitter
          </ExternalItem>
          <ExternalItem
            href="https://www.tiktok.com/@clickpulseteam"
            icon="fa-brands fa-tiktok"
            className="justify-between flex-row-reverse"
          >
            TikTok
          </ExternalItem>
          <ExternalItem
            href="https://linkedin.com"
            icon="fa-brands fa-linkedin"
            className="justify-between flex-row-reverse"
          >
            LinkedIn
          </ExternalItem>
          <ExternalItem
            href="https://discord.gg/9eWFeSW7pz"
            icon="fa-brands fa-discord scale-[0.95] -translate-x-px"
            className="justify-between flex-row-reverse"
          >
            Discord
          </ExternalItem>
        </div>
        <div className="border-default-100 border-b py-3">
          <Item
            href="/pricing-more#monthly"
            icon="fa-calendar-alt"
            className="justify-between flex-row-reverse"
          >
            Monthly Pricing
          </Item>
          <Item
            href="/pricing-more#yearly"
            icon="fa-calendar-check"
            className="justify-between flex-row-reverse"
          >
            Yearly Pricing
          </Item>
        </div>
        <div className="border-default-100 py-3 flex justify-between items-center flex-col gap-3">
          {user ? (
            <>
              <Button
                className="w-full justify-center lg:text-lg"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
              <SecondaryButton
                className="w-full justify-center lg:text-lg"
                onClick={() => navigate("/change-password")}
              >
                Change Password
              </SecondaryButton>
              <SecondaryButton
                className="w-full justify-center lg:text-lg"
                onClick={() => navigate("/logout")}
              >
                Logout
              </SecondaryButton>
            </>
          ) : (
            <>
              <Button
                className="w-full justify-center lg:text-lg"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="w-full justify-center lg:text-lg"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Mobile;
