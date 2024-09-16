import React from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
  title: string;
  description: string;
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
      type: 'spring',
    },
  }),
};

const FlipCard: React.FC<FlipCardProps> = ({
  title,
  description,
  index,
}) => {
  return (
    <motion.article
      variants={itemVariant}
      initial="initial"
      whileInView="animate"
      custom={{ index: index }}
      className="w-full min-h-48 bg-default-100 shadow p-4 space-y-2 rounded-md hover:-translate-y-2 duration-300 max-w-80 lg:max-w-lg"
    >
      <div className="w-full flex justify-start items-center">
        <i className="fa-solid fa-user text-emphasis text-2xl"></i>
        <h3 className="text-xl text-primary ml-4">{title}</h3>
      </div>
      <p className="text-sm w-full text-gray-400 text-left">
        {description}
      </p>
    </motion.article>
  );
};

export default function Hero() {
  return (
    <section className="bg-default-200 py-12 z-10 mt-7 w-[70vw] mx-auto md:w-[90vw]">
      <div className="mx-auto text-center relative lg:w-[70vw]">
        <h2 className="relative text-4xl font-bold text-emphasis py-2 px-4 pb-3 border-b-[0.5px] border-emphasis">
          Tracking
        </h2>
        <div className="flex flex-wrap gap-6 mt-12 justify-evenly">
          <FlipCard
            title="Unique visitors"
            description="You had xxxx amount of visitors this month"
            index={1}
          />
          <FlipCard
            title="Page views"
            description="Total page views for this month are xxxx"
            index={2}
          />
          <FlipCard
            title="Bounce rate"
            description="Your bounce rate this month is xx%"
            index={3}
          />
          <FlipCard
            title="Average visit duration"
            description="The average visit duration is xx:xx"
            index={4}
          />
          <FlipCard
            title="Top page"
            description="Your top page is 'Page Name'"
            index={5}
          />
          <FlipCard
            title="New vs Returning"
            description="You have xx% new and xx% returning visitors"
            index={6}
          />
        </div>
      </div>
    </section>
  );
}
