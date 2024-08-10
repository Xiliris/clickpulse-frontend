import Button from "../form/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, FC, useState } from "react";
import { motion } from "framer-motion";

interface itemProp {
  index: number;
}

const itemVariant = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: ({ index }: itemProp) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
      type: "tween",
    },
  }),
};

export default function Hero() {
  const [hoveredCard, setHoveredCard] = useState<any>({
    Basic: "brightness-100",
    Standard: "brightness-100",
    Premium: "brightness-100",
  });

  return (
    <section className="bg-default-100 py-32 relative">
      <div className="custom-shape-divider-top-1723244705 absolute top-0 left-0">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="mx-auto text-center h-min-screen flex flex-col justify-center w-[70vw] md:w-[90vw] xl:w-[70vw]">
        <h2 className="relative flex flex-col text-4xl font-bold text-emphasis py-2 px-4 mb-12 pb-3 border-b-[0.5px] border-emphasis">
          Our Pricing Plans
        </h2>
        <div className="flex flex-wrap gap-8 justify-between xl:justify-center">
          {/* Basic */}
          <Card
            plan="Basic Plan"
            price="$9.99"
            className={`transform ${hoveredCard.Basic}`}
            index={2}
            onMouseEnter={() =>
              setHoveredCard({
                Basic: "brightness-100",
                Standard: "brightness-50",
                Premium: "brightness-50",
              })
            }
            onMouseLeave={() =>
              setHoveredCard({
                Basic: "brightness-100",
                Standard: "brightness-100",
                Premium: "brightness-100",
              })
            }
          >
            <Item>10 users</Item>
            <Item>10 projects</Item>
            <Item>10GB storage</Item>
            <Item>Email support</Item>
          </Card>
          {/* Standard */}
          <Card
            plan="Standard Plan"
            price="$29.99"
            className={hoveredCard.Standard}
            index={1}
            onMouseEnter={() =>
              setHoveredCard({
                Basic: "brightness-50",
                Standard: "brightness-100",
                Premium: "brightness-50",
              })
            }
            onMouseLeave={() =>
              setHoveredCard({
                Basic: "brightness-100",
                Standard: "brightness-100",
                Premium: "brightness-100",
              })
            }
          >
            <Item>20 users</Item>
            <Item>20 projects</Item>
            <Item>20GB storage</Item>
            <Item>Priority email support</Item>
          </Card>
          {/* Premium */}
          <Card
            plan="Premium Plan"
            price="$49.99"
            className={hoveredCard.Premium}
            index={2}
            onMouseEnter={() =>
              setHoveredCard({
                Basic: "brightness-50",
                Standard: "brightness-50",
                Premium: "brightness-100",
              })
            }
            onMouseLeave={() =>
              setHoveredCard({
                Basic: "brightness-100",
                Standard: "brightness-100",
                Premium: "brightness-100",
              })
            }
          >
            <Item>Unlimited users</Item>
            <Item>Unlimited projects</Item>
            <Item>Unlimited storage</Item>
            <Item>24/7 support</Item>
          </Card>
        </div>
      </div>
    </section>
  );
}

interface ItemInterface {
  children: ReactNode;
}

interface CardInterface {
  children: ReactNode;
  plan: string;
  price: string;
  className?: string;
  index: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Card: FC<CardInterface> = ({
  children,
  plan,
  price,
  onMouseEnter,
  onMouseLeave,
  className,
  index,
}) => {
  return (
    <motion.div
      variants={itemVariant}
      initial="initial"
      whileInView="animate"
      custom={{ index: index }}
      viewport={{ once: true, amount: 0.5 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative flex flex-col gap-4 p-4 w-76 bg-default-200 rounded-xl shadow-inner flex-grow transform max-w-96 ${className}`}
    >
      <div className="relative flex flex-col">
        <span className="text-primary text-3xl">{plan}</span>
        <p className="mt-1 text-secondary-100 text-4xl">{price}</p>
      </div>
      <hr className="border-[#4C5366]" />
      <ul className="flex flex-col gap-2 flex-grow">{children}</ul>
      <Button className="flex justify-between w-full">
        Upgrade now
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </motion.div>
  );
};

const Item: FC<ItemInterface> = ({ children }) => {
  return (
    <li className="flex gap-2">
      <span className="flex items-center justify-center w-4 h-4 bg-emphasis rounded-full">
        <svg
          className="w-3 h-3 text-default-200"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
        </svg>
      </span>
      <span className="text-primary text-sm">{children}</span>
    </li>
  );
};
