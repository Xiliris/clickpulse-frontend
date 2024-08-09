import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Globe from '../assets/globe.png';
import './globe.css';

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
        <section className="flex flex-col md:w-[70vw] w-[70vw] m-auto justify-center items-start h-screen">
          <div className="md:w-full w-[60%]">
            <h1 className="text-primary md:text-4xl text-6xl leading-tight">
              Harness the <span className="text-emphasis">Pulse</span>{' '}
              of User Engagement
            </h1>
            <p className="text-secondary-100 mt-5 md:text-lg text-2xl">
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
          className="globe-img"
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
