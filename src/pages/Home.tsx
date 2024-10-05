import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Globe from '../assets/globe.png';
import { motion } from 'framer-motion';
import './globe.css';

const Navbar = lazy(() => import('../components/Navbar'));
const Button = lazy(() => import('../components/form/Button'));
const Pricing = lazy(() => import('../components/home/Pricing'));
const Hero = lazy(() => import('../components/home/Hero'));
const Footer = lazy(() => import('../components/home/Footer'));

const variants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: 'tween',
      ease: 'easeInOut',
    },
  },
};

const variants2 = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'tween',
      ease: 'easeInOut',
    },
  },
};

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      <main className="relative min-w-screen min-h-screen">
        <motion.section
          variants={variants2}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col justify-center items-start h-screen m-auto md:w-[90vw] w-[70vw]"
        >
          <motion.div
            variants={variants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}
            className="md:w-full w-[60%] sm:w-full"
          >
            <h1 className="text-primary text-5xl xl:text-4xl lg:text-3xl md:text-4xl sm:text-xl md:w-2/3 leading-tight font-bold sm:mt-[220px]">
              Harness the{' '}
              <span className="text-emphasis font-semibold">
                Pulse
              </span>{' '}
              of User Engagement
            </h1>

            <p className="text-secondary-100 mt-6 md:text-lg text-xl sm:w-full">
              Understand your users like never before with in-depth
              analytics and insights into every click, scroll, and
              interaction on your site.
              <span className="font-semibold text-primary">
                Clickpulse
              </span>{' '}
              empowers you to optimize your digital experience with
              real-time data tracking.
            </p>

            <ul className="mt-6 space-y-4 text-secondary-100 list-inside sm:w-full">
              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-emphasis"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l5 5L19 7"
                  />
                </svg>
                <span>Real-time data tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-emphasis"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l5 5L19 7"
                  />
                </svg>
                <span>Comprehensive reporting</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-emphasis"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l5 5L19 7"
                  />
                </svg>
                <span>User-friendly dashboard</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-emphasis"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l5 5L19 7"
                  />
                </svg>
                <span>Customizable metrics</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-emphasis"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l5 5L19 7"
                  />
                </svg>
                <span>Integration with other tools</span>
              </li>
            </ul>

            <p className="text-secondary-100 mt-6 md:text-lg text-xl sm:w-full">
              Experience unparalleled customer support and insights
              that no other tool can offer.
            </p>

            <Link to="/login">
              <Button className="mt-5 sm:w-full sm:px-4">
                Get Started
              </Button>
            </Link>
          </motion.div>

          <img
            src={Globe}
            alt="Globe"
            className="globe-img"
            style={{
              pointerEvents: 'none',
              userSelect: 'none',
              touchAction: 'none',
            }}
          />
        </motion.section>
      </main>

      <Hero />
      <Pricing />
      <Footer />
    </Suspense>
  );
}
