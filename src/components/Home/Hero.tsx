import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

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
      viewport={{ amount: 0.5, once: true }}
      custom={{ index: index }}
      className={`w-[70vw] md:w-[90vw] mx-auto space-y-2 hover:-translate-y-2 duration-300 flex ${flexDirection} gap-16 md:flex-col md:gap-4`}
      style={{ minHeight: '200px' }}
    >
      <div className="flex-shrink-0 w-1/2 md:w-full flex items-center justify-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Flip card image"
          className={`w-5/6 h-auto object-cover ${marginDirection}`}
        />
      </div>

      <div className="flex flex-col justify-center w-1/2 md:w-full">
        <h3 className="text-3xl lg:text-2xl md:text-lg text-emphasis font-bold text-left md:text-center">
          {title}
        </h3>
        <p className="text-lg lg:text-sm text-primary mt-2 text-left md:text-center">
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
        <h2 className="relative text-4xl font-bold text-emphasis py-2 px-4 pb-3 border-b-[0.5px] border-emphasis">
          Tracking
        </h2>

        <div className="flex flex-col gap-8 mt-12">
          <FlipCard
            title="Unique Visitors"
            description="Unique visitors represent the number of distinct individuals who visited your site within a given timeframe, regardless of how many times they visited. This metric provides a clear picture of how many actual users are engaging with your content, as it filters out multiple visits by the same user. Understanding this data helps you track the growth of your audience, and is crucial for assessing the effectiveness of campaigns aimed at reaching new users."
            index={1}
          />
          <FlipCard
            title="Page Views"
            description="Page views indicate the total number of pages viewed on your website over a specific period. Unlike unique visitors, this metric counts every instance of a page being loaded or reloaded, which can give insight into user engagement and interaction levels. A higher page view count suggests users are finding your content interesting enough to browse through multiple pages. However, it's important to analyze this alongside other metrics like bounce rate and visit duration to get a fuller picture."
            index={2}
          />
          <FlipCard
            title="Bounce Rate"
            description="Bounce rate is the percentage of visitors who navigate away from your site after viewing only one page. A high bounce rate might indicate that users aren’t finding what they’re looking for or that the content isn’t engaging enough. Conversely, a low bounce rate suggests that visitors are exploring multiple pages and spending more time on the site. Monitoring bounce rates can help in adjusting content or improving user experience to retain more visitors."
            index={3}
          />
          <FlipCard
            title="Average Visit Duration"
            description="The average visit duration measures the average amount of time users spend on your site per session. This metric helps gauge how engaging your content is and whether users are finding value in it. A longer average duration often signals that visitors are deeply exploring your site, reading articles, or engaging with multimedia content. If your average visit duration is low, it might suggest that your content is not sufficiently engaging or that users are finding what they need too quickly."
            index={4}
          />
          <FlipCard
            title="Top Page"
            description="The top page refers to the most visited page on your site within a specific timeframe. This can be your homepage, a blog post, a product page, or any other type of content. Identifying your top-performing page allows you to understand what type of content resonates most with your audience. You can use this insight to optimize similar content, refine your SEO strategy, or drive more traffic to underperforming pages by linking to them from your top page."
            index={5}
          />
          <FlipCard
            title="New vs Returning Visitors"
            description="This metric compares the percentage of new users versus those who have visited your site before. New visitors are important for growing your audience and expanding reach, while returning visitors indicate loyalty and engagement. A healthy balance between new and returning users suggests that you are successfully attracting new traffic while retaining existing users. Monitoring this ratio can help inform marketing strategies and content adjustments to either grow your audience or maintain existing user satisfaction."
            index={6}
          />
        </div>
      </div>
    </section>
  );
}
