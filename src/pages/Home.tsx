import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Globe from "../assets/globe.png";

const Navbar = lazy(() => import("../components/Navbar"));
const Button = lazy(() => import("../components/form/Button"));
const Pricing = lazy(() => import("../components/Home/Pricing"));
const Hero = lazy(() => import("../components/Home/Hero"));
const Footer = lazy(() => import("../components/Home/Footer"));

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      <main className="relative w-screen h-screen">
        <section className="flex flex-col w-[70vw] m-auto justify-center items-start h-screen">
          <div className="w-[60%]">
            <h1 className="text-primary text-6xl">
              Harness the <span className="text-emphasis">Pulse</span> of User
              Engagement
            </h1>
            <p className="text-secondary-100 mt-5 text-2xl">
              Discover in-depth analytics and insights into every click, scroll,
              and interaction on your site. ClickPulse empowers you to optimize
              your digital experience with real-time data tracking.
            </p>
            <Link to="/login">
              <Button className="mt-5">Get Started</Button>
            </Link>

            <div className="text-primary"></div>
          </div>
        </section>

        <img
          src={Globe}
          alt="Globe"
          className="max-w-none absolute bottom-0 right-0 w-[1050px] translate-x-80 translate-y-56 opacity-60"
        />
      </main>
      <Hero />
      <Pricing />
      <Footer />
    </Suspense>
  );
}
