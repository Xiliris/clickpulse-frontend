import React from 'react';
import Button from '../components/form/Button';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <section className="bg-default-200 py-16 px-4">
      <div className="w-full max-w-5xl mx-auto bg-default-300 p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-emphasis mb-8 text-center">
          About Us
        </h1>

        <p className="text-primary text-lg leading-relaxed mb-8">
          At Clickpulse, we're passionate about transforming raw data
          into meaningful insights that drive business growth. In
          today's fast-paced digital world, understanding user
          behavior is more important than ever. Our mission is to
          empower businesses with powerful, real-time analytics that
          unlock the full potential of their websites and digital
          platforms.
        </p>

        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-semibold text-emphasis mb-4">
              Our Story
            </h2>
            <p className="text-primary text-base leading-relaxed">
              Clickpulse was founded on the belief that data holds the
              key to building better online experiences. We noticed
              that while many businesses had access to analytics, they
              often struggled to make sense of the overwhelming amount
              of information. Our goal was to bridge that gap by
              creating an easy-to-use platform that not only provides
              comprehensive data but also presents it in a way that’s
              accessible and actionable.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-emphasis mb-4">
              What We Do
            </h2>
            <p className="text-primary text-base leading-relaxed">
              We offer a complete suite of analytics tools designed to
              help you track and understand every interaction on your
              site. From monitoring user behavior to visualizing key
              engagement metrics, our platform gives you a holistic
              view of how visitors interact with your digital
              presence. Whether you're a small startup or an
              established enterprise, our analytics provide the
              insights you need to make data-driven decisions that
              enhance user engagement, optimize content, and boost
              conversion rates.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-emphasis mb-4">
              Why We Stand Out
            </h2>
            <p className="text-primary text-base leading-relaxed">
              What makes Clickpulse unique is our commitment to
              simplicity without compromising depth. Our platform is
              designed to be intuitive for both beginners and
              experienced data analysts alike. With real-time
              tracking, customizable reports, and visual dashboards,
              we make it easy for you to dive deep into your site’s
              performance—no technical expertise required.
            </p>
            <p className="text-primary text-base leading-relaxed mt-4">
              We also believe in transparency and trust. With our
              privacy-first approach, we ensure that data collection
              is done ethically, and your users' privacy is always
              respected. As data regulations continue to evolve, we’re
              committed to staying ahead of the curve, so you can
              focus on growing your business with peace of mind.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-emphasis mb-4">
              Our Vision
            </h2>
            <p className="text-primary text-base leading-relaxed">
              We envision a future where every business, big or small,
              can leverage the power of analytics to thrive online. At
              Clickpulse, we're continuously innovating to help you
              stay ahead of the competition, improve user experiences,
              and achieve your goals. As digital ecosystems grow more
              complex, our platform will continue evolving to meet the
              challenges of tomorrow’s digital landscape.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-emphasis mb-4">
              Join Us on the Journey
            </h2>
            <p className="text-primary text-base leading-relaxed">
              We’re excited to be part of the journey in shaping a
              more data-driven, user-centered web. Whether you’re
              looking to track visitor activity, optimize your site
              for conversions, or gain deeper insights into your
              audience, Clickpulse is here to help you take your
              digital presence to the next level.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Link to="/">
            <Button>Return home</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
