import { Suspense, lazy, ReactNode, FC } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Globe from '../assets/globe.png';
import { motion } from 'framer-motion';
import './globe.css';

const Navbar = lazy(() => import('../components/Navbar'));
const Header = lazy(() => import('../components/Header'));
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
      <Header />
      <main className="relative min-w-screen min-h-screen flex flex-col justify-center items-center">
        <motion.section
          variants={variants2}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col justify-center items-start m-auto md:w-[90vw] w-[70vw]"
        >
          <motion.div
            variants={variants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}
            className="md:w-full w-[60%] sm:w-full"
          >
            <h1 className="text-primary text-4xl xl:text-2xl lg:text-3xl md:text-4xl sm:text-xl leading-tight font-bold sm:mt-9 w-full">
              <span className="text-emphasis">Maximize</span> User
              Engagement with{' '}
              <span className="text-emphasis">Powerful Insights</span>
            </h1>

            <p className="text-secondary-100 mt-3 md:text-lg text-xl sm:w-full">
              Leverage{' '}
              <span className="text-primary font-bold">
                Clickpulse
              </span>{' '}
              to understand and optimize user behavior like never
              before.
            </p>

            <ul className="mt-6 space-y-4 text-secondary-100 list-inside sm:w-full">
              <Item>Real-time data tracking</Item>
              <Item>User-friendly dashboard</Item>
              <Item>In-depth user behavior analysis</Item>
              <Item>Actionable insights for optimization</Item>
              <Item>Enhanced customer support and guidance</Item>
            </ul>

            <p className="text-secondary-100 mt-4 md:text-lg text-xl sm:w-full">
              Benefit from dedicated customer support and expert
              insights that set us apart.
            </p>

            <Link to="/signup">
              <Button className="mt-5 sm:px-4 sm:w-full justify-between gap-5">
                Start Your Free Trial!
                <i className="fa-solid fa-arrow-right cursor-pointer"></i>
              </Button>
            </Link>
          </motion.div>

          <img
            src={Globe}
            alt="Globe"
            className="globe-img -z-30"
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

interface itemProps {
  children: ReactNode;
}

const Item: FC<itemProps> = ({ children }) => {
  return (
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
      <span>{children}</span>
    </li>
  );
};
