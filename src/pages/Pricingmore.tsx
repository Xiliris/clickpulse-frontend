import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/form/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/home/Footer';
import Header from '../components/Header';
import { motion } from 'framer-motion';
/*import { PlanComparisonTable } from './PricingmoreTable';*/
import { useLocation } from 'react-router-dom';
import { plans } from '../../config.json';
import SplitSection from '../components/SplitSection';

interface CardInterface {
  plan: string;
  price: string;
  features: string[];
  billingCycle: 'monthly' | 'yearly';
  index: number;
}

const Card: FC<CardInterface> = ({
  plan,
  price,
  features,
  billingCycle,
  index,
}) => {
  const billingMessage =
    billingCycle === 'monthly'
      ? 'USD / month, billed every month'
      : 'USD / year, billed every year';

  return (
    <>
      <Header title="Pricing" />
      <motion.div
        className="relative flex flex-col p-6 bg-default-100 rounded-lg shadow-md flex-grow"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="absolute top-2 left-2 bg-emphasis text-black text-xs font-bold px-2 py-1 rounded">
          {billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}
        </div>

        <h2 className="text-2xl font-semibold pb-1 text-primary text-center">
          {plan}
        </h2>
        <p className="text-xl text-secondary-100 mb-2 text-center w-fit mx-auto flex justify-center items-center">
          <span className="relative cross-line">{price}</span>{' '}
          <span className="text-emphasis ml-4 font-bold ">
            <div className="pulse">FREE</div>
          </span>
        </p>
        <p className="w-full text-sm text-secondary-100 text-center border-b border-secondary-200 pb-2">
          {billingMessage}
        </p>
        <ul className="text-secondary-100 space-y-2 w-full pt-4 text-left">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <i className="fa-solid fa-check text-emphasis"></i>{' '}
              {feature}
            </li>
          ))}
        </ul>
        <Link to="/signup">
          <Button className="mt-6 w-full justify-between">
            Free While in Beta
            <i className="fa-solid fa-arrow-right cursor-pointer"></i>
          </Button>
        </Link>
      </motion.div>
    </>
  );
};

const PricingMore = () => {
  const location = useLocation();

  const [billingCycle, setBillingCycle] = useState<any>(
    window.location.hash.replace('#', '') || 'monthly'
  );

  useEffect(() => {
    if (window.location.hash != '#plans') {
      window.location.hash = billingCycle;
    }
  }, [billingCycle]);

  useEffect(() => {
    console.log(window.location.hash);
    if (window.location.hash === '#plans') {
      setBillingCycle('monthly');
    } else {
      setBillingCycle(window.location.hash.replace('#', ''));
    }
  }, [location]);

  const monthlyPlans = [
    {
      plan: 'Basic Plan',
      price: `$${plans.basic.monthly}`,
      features: [
        '1 User',
        '3 Dashboards',
        'Basic Analytics',
        'Email Support',
      ],
    },
    {
      plan: 'Standard Plan',
      price: `$${plans.standard.monthly}`,
      features: [
        '3 Users',
        '10 Dashboards',
        'Advanced Analytics',
        'Priority Email Support',
      ],
    },
    {
      plan: 'Premium Plan',
      price: `$${plans.premium.monthly}`,
      features: [
        '10 Users',
        'Unlimited Dashboards',
        'Real-time Analytics',
        '24/7 Support',
      ],
    },
  ];

  const yearlyPlans = [
    {
      plan: 'Basic Plan',
      price: `$${plans.basic.yearly}`,
      features: [
        '1 User',
        '3 Dashboards',
        'Basic Analytics',
        'Email Support',
      ],
    },
    {
      plan: 'Standard Plan',
      price: `$${plans.standard.yearly}`,
      features: [
        '3 Users',
        '10 Dashboards',
        'Advanced Analytics',
        'Priority Email Support',
      ],
    },
    {
      plan: 'Premium Plan',
      price: `$${plans.premium.yearly}`,
      features: [
        '10 Users',
        'Unlimited Dashboards',
        'Real-time Analytics',
        '24/7 Support',
      ],
    },
  ];

  return (
    <>
      <Navbar width={90} />
      <section className="bg-default-200 min-h-screen lg:mt-32 mb-16">
        <div className="min-h-screen flex justify-center items-center flex-col">
          <div className="mx-auto text-center">
            <motion.h1
              className="text-4xl font-bold text-emphasis mb-3"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              More About Our Plans
            </motion.h1>
            <motion.p
              className="text-lg text-secondary-100 mb-12 w-[90vw] mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Choose a plan that fits your needs. Here are more
              details about our offerings.
            </motion.p>
          </div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`w-32 px-6 py-2 rounded-md ${
                  billingCycle === 'monthly'
                    ? 'bg-emphasis text-black'
                    : 'bg-default-100 text-secondary-100'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`w-32 px-6 py-2 rounded-md ${
                  billingCycle === 'yearly'
                    ? 'bg-emphasis text-black'
                    : 'bg-default-100 text-secondary-100'
                }`}
              >
                Yearly
              </button>
            </div>
          </motion.div>

          <motion.div
            key={billingCycle}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-row justify-center gap-8 w-[90vw] mx-auto md:w-[90vw] lg:flex-col mt-3"
          >
            {(billingCycle === 'monthly'
              ? monthlyPlans
              : yearlyPlans
            ).map((planDetails, index) => (
              <Card
                key={index}
                plan={planDetails.plan}
                price={planDetails.price}
                features={planDetails.features}
                billingCycle={billingCycle}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <SplitSection>
        If you have any more questions about our plans you can contact
        us at
      </SplitSection>
      <Footer width={90} />
    </>
  );
};

export default PricingMore;
