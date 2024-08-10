import React from "react";
import { motion } from "framer-motion";

interface FlipCardProps {
  description: string;
  title: string;
  index: number;
}

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
      duration: 0.2,
      type: "spring",
    },
  }),
};

const FlipCard: React.FC<FlipCardProps> = ({ title, description, index }) => {
  console.log(index);
  return (
    <motion.article
      variants={itemVariant}
      initial="initial"
      whileInView="animate"
      custom={{ index: index }}
      className="w-full min-h-48 bg-default-100 shadow p-4 space-y-2 rounded-md hover:-translate-y-2 duration-300"
    >
      <div className="w-full flex justify-start items-center">
        <i className="fa-solid fa-user text-emphasis text-2xl"></i>
        <h3 className="text-xl text-primary ml-4">{title}</h3>
      </div>
      <p className="text-sm w-full text-gray-400 text-left">{description}</p>
    </motion.article>
  );
};

export default function Hero() {
  return (
    <section className=" py-12 z-10 mt-7 mb-10 w-[70vw] mx-auto md:w-[90vw] relative">
      <div className="mx-auto text-center relative lg:w-[70vw]">
        <h2 className="relative text-4xl font-bold text-emphasis py-2 px-4 pb-3 border-b-[0.5px] border-emphasis">
          Tracking
        </h2>
        <div className="grid grid-cols-3 mt-12 xl:grid-cols-2 md:flex md:flex-col gap-4">
          <FlipCard
            title="Lorem ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            index={1}
          />
          <FlipCard
            title="Lorem ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            index={2}
          />
          <FlipCard
            title="Lorem ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            index={3}
          />
          <FlipCard
            title="Lorem ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            index={1}
          />
          <FlipCard
            title="Lorem ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            index={2}
          />
          <FlipCard
            title="Lorem ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            index={3}
          />
          <FlipCard
            title="Lorem ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            index={1}
          />
          <FlipCard
            title="Lorem ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            index={2}
          />
          <FlipCard
            title="Lorem ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            index={3}
          />
        </div>
      </div>
    </section>
  );
}
