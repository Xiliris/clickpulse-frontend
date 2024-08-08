import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Globe from '../assets/globe.png';

const Navbar = lazy(() => import('../components/Navbar'));
const Button = lazy(() => import('../components/form/Button'));
const Pricing = lazy(() => import('../components/Home/Pricing'));
const Hero = lazy(() => import('../components/Home/Hero'));
const Footer = lazy(() => import('../components/Home/Footer'));

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      <main className="relative min-w-screen min-h-screen">
        <section className="flex flex-col w-[90vw] md:w-[70vw] m-auto justify-center items-start h-screen">
          <div className="w-full md:w-[60%]">
            <h1 className="text-primary text-4xl md:text-6xl leading-tight">
              Harness the <span className="text-emphasis">Pulse</span>{' '}
              of User Engagement
            </h1>
            <p className="text-secondary-100 mt-5 text-lg md:text-2xl">
              Discover in-depth analytics and insights into every
              click, scroll, and interaction on your site. ClickPulse
              empowers you to optimize your digital experience with
              real-time data tracking.
            </p>
            <Link to="/login">
              <Button className="mt-5">Get Started</Button>
            </Link>
          </div>
        </section>

        <img
          src={Globe}
          alt="Globe"
          className="max-w-none absolute bottom-0 right-0 w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[70vw] xl:w-[60vw] 2xl:w-[1050px] translate-x-20 md:translate-x-40 lg:translate-x-60 xl:translate-x-80 translate-y-28 md:translate-y-36 lg:translate-y-44 xl:translate-y-56 opacity-80"
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            touchAction: 'none',
          }}
        />
      </main>
      <Hero />
      <Pricing />
      <Footer />
    </Suspense>
  );
}
