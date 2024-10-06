import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import Splash1 from "../../assets/splash1.svg";

interface FlipCardProps {
  title: string;
  description: ReactNode;
  index: number;
  img: string;
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
      type: "spring",
    },
  }),
};

export default function Hero() {
  return (
    <section className="bg-transparent py-16 lg:py-0 lg:pb-12 z-10 mt-7 w-[70vw] md:w-[90vw] mx-auto sm:mt-[200px]">
      <div className="mx-auto text-center relative">
        <Title>Website Analytics and Performance Tracking</Title>

        <div className="flex flex-col gap-8 mt-12 md:flex">
          <FlipCard
            title="Site Engagement Analytics"
            description={
              <ul className="list-disc pl-5">
                <li>
                  <strong>Total visits</strong> show overall site reach,
                  providing insights into traffic trends and growth over time.
                </li>
                <li>
                  <strong>Page visits</strong> reveal which content engages
                  users, helping identify high-performing pages.
                </li>
                <li>
                  <strong>Visit duration</strong> shows how long users are
                  staying, indicating interest levels and engagement.
                </li>
                <li>
                  <strong>Bounce rate</strong> reflects navigation
                  effectiveness, helping identify potential UX issues.
                </li>
              </ul>
            }
            index={1}
            img={Splash1}
          />
          <FlipCard
            title="User Experience Analytics by Device & Browser"
            description={
              <ul className="list-disc pl-5">
                <li>
                  Analyze traffic by <strong>device type</strong> (mobile,
                  desktop, tablet) to optimize user experience across platforms.
                </li>
                <li>
                  Ensure compatibility across browsers such as{" "}
                  <strong>Chrome, Safari, and Firefox</strong> for seamless
                  performance.
                </li>
                <li>
                  Optimize for the best performance across devices to reduce
                  load times and enhance mobile responsiveness.
                </li>
              </ul>
            }
            index={2}
            img={Splash1}
          />
          <FlipCard
            title="Content Optimization Analytics"
            description={
              <ul className="list-disc pl-5">
                <li>
                  <strong>Track entry, exit, and top pages</strong> to gain
                  insights into what content attracts visitors initially and
                  where they leave.
                </li>
                <li>
                  Identify potential <strong>content or UX issues</strong> that
                  may drive users away.
                </li>
                <li>
                  Understand which content resonates most and optimize your
                  strategy to boost engagement.
                </li>
              </ul>
            }
            index={3}
            img={Splash1}
          />
          <FlipCard
            title="Regional Traffic & Audience Analytics"
            description={
              <ul className="list-disc pl-5">
                <li>
                  <strong>Identify regions</strong> that drive the most traffic
                  and tailor marketing strategies to key areas.
                </li>
                <li>
                  Analyze engagement patterns in different locations to improve
                  content relevancy.
                </li>
                <li>
                  Create <strong>localized content</strong> based on regional
                  trends to enhance user experience and boost conversions.
                </li>
              </ul>
            }
            index={4}
            img={Splash1}
          />
          <FlipCard
            title="Element Interaction Analytics"
            description={
              <ul className="list-disc pl-5">
                <li>
                  <strong>Track button clicks</strong> to measure the
                  effectiveness of your calls-to-action and drive conversions.
                </li>
                <li>
                  Monitor anchor clicks to optimize internal linking and guide
                  users to relevant content efficiently.
                </li>
                <li>
                  Refine UI elements to boost <strong>user navigation</strong>{" "}
                  and improve the overall conversion funnel.
                </li>
              </ul>
            }
            index={5}
            img={Splash1}
          />
          <FlipCard
            title="Upcoming Analytics Features"
            description={
              <ul className="list-disc pl-5">
                <li>
                  <strong>Live tracking</strong> will enable real-time user
                  interaction monitoring, providing insights as users navigate
                  your site.
                </li>
                <li>
                  <strong>Scroll depth tracking</strong> will reveal how far
                  down users scroll on your pages, helping identify engagement
                  levels.
                </li>
                <li>
                  <strong>Heat maps</strong> will visualize user interactions
                  like clicks and hovers, giving insight into attention hotspots
                  and optimizing layouts accordingly.
                </li>
              </ul>
            }
            index={6}
            img={Splash1}
          />
        </div>
      </div>
    </section>
  );
}

const FlipCard: React.FC<FlipCardProps> = ({
  title,
  description,
  index,
  img,
}) => {
  const isEven = index % 2 === 0;
  const flexDirection = isEven ? "flex-row-reverse" : "flex-row";
  const marginDirection = isEven ? "ml-auto" : "mr-auto";

  return (
    <motion.article
      variants={itemVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.5 }}
      custom={{ index: index }}
      className={`w-[70vw] md:w-full mx-auto space-y-2 hover:-translate-y-2 duration-300 flex ${flexDirection} gap-16 md:flex-col md:gap-4 md:justify-center md:items-center`}
      style={{ minHeight: "200px" }}
    >
      <div className="flex-shrink-0 w-1/2 md:w-full flex items-center justify-center">
        <img
          src={img}
          alt={`Image for ${title}`}
          className={`w-4/6 h-auto object-cover ${marginDirection} md:mx-auto`}
          width={400}
          height={400}
          loading="lazy"
          title="title"
        />
      </div>

      <div className="flex flex-col justify-center w-1/2 md:w-full md:text-center">
        <h3 className="text-3xl lg:text-2xl md:text-lg text-emphasis font-bold text-left md:text-center">
          {title}
        </h3>
        <div className="text-lg xl:text-base text-primary mt-2 text-left">
          {description}
        </div>
      </div>
    </motion.article>
  );
};
