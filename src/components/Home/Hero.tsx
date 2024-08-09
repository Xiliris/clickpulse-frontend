import React from 'react';

interface FlipCardProps {
  frontTitle: string;
  backText: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  frontTitle,
  backText,
}) => {
  return (
    <div className="relative w-48 h-64 perspective-1000 group">
      <div className="relative w-full h-full text-center transition-transform duration-800 transform-style-3d group-hover:rotate-y-180">
        <div className="absolute flex flex-col justify-center w-full h-full bg-gradient-to-tr from-bisque via-[#ffe7de] to-[rgba(255,127,80,0.603)] text-coral border border-coral rounded-xl shadow-lg backface-hidden">
          <p className="text-2xl font-extrabold m-0">{frontTitle}</p>
        </div>
        <div className="absolute flex flex-col justify-center w-full h-full bg-gradient-to-tr from-[#ffae91] via-coral to-bisque text-white border border-coral rounded-xl shadow-lg transform rotate-y-180 backface-hidden">
          <p>{backText}</p>
        </div>
      </div>
    </div>
  );
};

export default function Hero() {
  return (
    <section className="bg-default-200 py-12 min-h-screen z-10 mt-7 w-[70vw] mx-auto md:w-[90vw]">
      <div className="mx-auto text-center relative lg:w-[70vw]">
        <h2 className="relative text-4xl font-bold text-emphasis py-2 px-4 pb-3 border-b-[0.5px] border-emphasis">
          Tracking
        </h2>
        <div className="grid md:grid-cols-2 grid-cols-3 gap-6 mt-12 justify-center">
          <FlipCard
            frontTitle="Unique visitors"
            backText="You had xxxx amount of visitors this month"
          />
          <FlipCard
            frontTitle="Unique visitors"
            backText="You had xxxx amount of visitors this month"
          />
          <FlipCard
            frontTitle="Unique visitors"
            backText="You had xxxx amount of visitors this month"
          />
          <FlipCard
            frontTitle="Unique visitors"
            backText="You had xxxx amount of visitors this month"
          />
          <FlipCard
            frontTitle="Unique visitors"
            backText="You had xxxx amount of visitors this month"
          />
          <FlipCard
            frontTitle="Unique visitors"
            backText="You had xxxx amount of visitors this month"
          />
          <FlipCard
            frontTitle="Unique visitors"
            backText="You had xxxx amount of visitors this month"
          />
          <FlipCard
            frontTitle="Unique visitors"
            backText="You had xxxx amount of visitors this month"
          />
          <FlipCard
            frontTitle="Unique visitors"
            backText="You had xxxx amount of visitors this month"
          />
        </div>
      </div>
    </section>
  );
}
