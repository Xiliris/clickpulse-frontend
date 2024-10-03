import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Title from './Title';

interface FlipCardProps {
  title: string;
  description: ReactNode;
  index: number;
}

interface itemProp {
  index: number;
}

const itemVariant = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: ({ index }: itemProp) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0,
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
  const isEven = index % 2 === 0;
  const flexDirection = isEven ? 'flex-row-reverse' : 'flex-row';
  const marginDirection = isEven ? 'ml-auto' : 'mr-auto';

  return (
    <motion.article
      variants={itemVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.5 }}
      custom={{ index: index }}
      className={`w-[70vw] md:w-full mx-auto space-y-2 hover:-translate-y-2 duration-300 flex ${flexDirection} gap-16 md:flex-col md:gap-4 md:justify-center md:items-center`}
      style={{ minHeight: '200px' }}
    >
      <div className="flex-shrink-0 w-1/2 md:w-full flex items-center justify-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Flip card image"
          className={`w-5/6 h-auto object-cover ${marginDirection} md:mx-auto`}
        />
      </div>

      <div className="flex flex-col justify-center w-1/2 md:w-full md:text-center">
        <h3 className="text-3xl lg:text-2xl md:text-lg text-emphasis font-bold text-left md:text-center">
          {title}
        </h3>
        <p className="text-lg xl:text-base text-primary mt-2 text-left md:text-center">
          {description}
        </p>
      </div>
    </motion.article>
  );
};

export default function Hero() {
  return (
    <section className="bg-default-200 py-12 z-10 mt-7 w-[70vw] md:w-[90vw] mx-auto">
      <div className="mx-auto text-center relative">
        <Title>Tracking</Title>

        <div className="flex flex-col gap-8 mt-12 md:flex">
          <FlipCard
            title="Site Engagement"
            description="Key metrics like total visits, page visits, visit duration, and bounce rate help assess website performance. Total visits show overall site reach, while page visits reveal which content captures attention. Visit duration indicates whether users find the site engaging—longer visits suggest interest, while shorter ones may signal unmet expectations. The bounce rate reflects how many users view just one page; a high bounce rate suggests issues like irrelevant content, while a low rate indicates good navigation and engagement. Together, these metrics help optimize content and enhance user experience."
            index={1}
          />
          <FlipCard
            title="Optimizing User Experience Through OS"
            description="Tracking website visits by device, browser, and OS provides valuable insights into user behavior. By analyzing device types (mobile, desktop, tablet), you can optimize your site for the most common platforms. Browser and OS tracking (e.g., Chrome, Safari, iOS, Android) ensures compatibility and performance. Monitoring bounce rate and visit duration across devices helps identify areas for improvement, allowing you to tailor design and content for a better user experience."
            index={2}
          />
          <FlipCard
            title="Optimising Content"
            description="Tracking entry, exit, and top pages provides key insights into user behavior. Entry pages show where users land first, while exit pages highlight where they leave, helping identify potential content or UX issues. Top pages reveal what content resonates most. When combined with visit duration and bounce rate, you can optimize your site’s flow to improve engagement and conversions."
            index={3}
          />
          <FlipCard
            title="Find Your Region"
            description="Tracking user location helps tailor content and marketing strategies to specific audiences. By analyzing regional traffic, you can identify key areas driving visits and adapt your approach accordingly. When combined with metrics like visit duration and bounce rate, location insights reveal engagement patterns. Longer visits suggest content resonates well, while higher bounce rates may indicate a need for more localized content. This data ensures your site and marketing efforts meet the needs of diverse audiences."
            index={4}
          />
          <FlipCard
            title="Most Used Elements"
            description="
Tracking button clicks, Monitoring button clicks and anchor clicks reveals how users engage with your site. Button click tracking shows which CTAs drive the most action, helping refine your user interface to boost conversions. Anchor click data highlights how users navigate through internal links, allowing you to optimize navigation paths and guide users more efficiently to key content or conversion points."
            index={5}
          />
          <FlipCard
            title="Upcoming Features"
            description={`Live tracking will let you monitor real-time user interactions, providing instant insights to optimize user experience on the fly.

Scroll depth tracking shows how far users scroll, helping you identify engaging sections and optimize your layout for better retention.

Heat maps visualize user clicks, scrolls, and hovers, highlighting attention areas and guiding improvements for better engagement and effective content placement.`}
            index={6}
          />
        </div>
      </div>
    </section>
  );
}
