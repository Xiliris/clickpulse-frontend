import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const PlanComparisonTable = () => {
  const [selectedPlan, setSelectedPlan] = useState<
    'free' | 'basic' | 'standard' | 'premium'
  >('free');
  const [isMobile, setIsMobile] = useState(false);

  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
      },
    }),
  };

  const rows = [
    {
      feature: 'Monthly Price',
      free: 'Free for 14 days',
      basic: '$7.99',
      standard: '$14.99',
      premium: '$39.99',
    },
    {
      feature: 'Custom Dashboards',
      free: '1 dashboard',
      basic: '3 dashboards',
      standard: '7 dashboards',
      premium: 'Unlimited',
    },
    {
      feature: 'Basic Analytics',
      free: 'Yes',
      basic: 'Yes',
      standard: 'Yes',
      premium: 'Yes',
    },
    {
      feature: 'Advanced Analytics',
      free: 'No',
      basic: 'No',
      standard: 'Yes',
      premium: 'Yes',
    },
    {
      feature: 'Real-time Analytics',
      free: 'No',
      basic: 'No',
      standard: 'No',
      premium: 'Yes',
    },
    {
      feature: 'Team Members',
      free: '1 user',
      basic: '1 user',
      standard: '3 users',
      premium: '10 users',
    },
    {
      feature: 'Goal Tracking',
      free: 'No',
      basic: 'Yes',
      standard: 'Yes',
      premium: 'Yes',
    },
    {
      feature: 'Event Tracking',
      free: 'Limited to 3 events',
      basic: '10 events',
      standard: '30 events',
      premium: 'Unlimited',
    },
    {
      feature: 'User Journey Tracking',
      free: 'No',
      basic: 'No',
      standard: 'Yes',
      premium: 'Yes',
    },
    {
      feature: 'Priority Support',
      free: 'No',
      basic: 'No',
      standard: 'Yes',
      premium: 'Yes',
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="mx-auto text-center w-full">
        <motion.h2
          className="text-4xl font-bold text-emphasis mt-16 mb-3 mx-auto w-[90vw]"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Plan Comparison
        </motion.h2>

        <motion.p
          className="text-lg text-secondary-100 mb-8 mx-auto w-[90vw]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Compare our plans and choose the one that fits your needs.
        </motion.p>
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && (
        <div className="mb-8 text-center">
          <label
            htmlFor="plan-select"
            className="block mb-2 text-lg font-semibold text-primary"
          >
            Select Plan to View:
          </label>
          <select
            id="plan-select"
            className="w-[90vw] p-2 bg-default-100 text-primary border border-default-100 rounded-lg"
            value={selectedPlan}
            onChange={(e) =>
              setSelectedPlan(
                e.target.value as
                  | 'free'
                  | 'basic'
                  | 'standard'
                  | 'premium'
              )
            }
          >
            <option value="free">Free</option>
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
        </div>
      )}

      <div className="w-[90vw] mx-auto overflow-x-auto mb-16">
        <table className="table-auto w-full text-left text-secondary-100">
          <thead className="bg-default-100 text-primary">
            <tr>
              <th className="py-4 px-6 w-[150px]">Features</th>
              {!isMobile && (
                <th className="py-4 px-6 w-[120px]">Free</th>
              )}
              {!isMobile && (
                <th className="py-4 px-6 w-[120px]">Basic</th>
              )}
              {!isMobile && (
                <th className="py-4 px-6 w-[120px]">Standard</th>
              )}
              {!isMobile && (
                <th className="py-4 px-6 w-[120px]">Premium</th>
              )}
              {isMobile && (
                <th className="py-4 px-6 w-[120px]">
                  {selectedPlan.charAt(0).toUpperCase() +
                    selectedPlan.slice(1)}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-default-300">
            {rows.map((row, index) => (
              <motion.tr
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={tableRowVariants}
                className="border-t border-secondary-200"
              >
                <td className="py-4 px-6 w-[150px]">{row.feature}</td>
                {!isMobile && (
                  <td className="py-4 px-6 w-[120px]">{row.free}</td>
                )}
                {!isMobile && (
                  <td className="py-4 px-6 w-[120px]">{row.basic}</td>
                )}
                {!isMobile && (
                  <td className="py-4 px-6 w-[120px]">
                    {row.standard}
                  </td>
                )}
                {!isMobile && (
                  <td className="py-4 px-6 w-[120px]">
                    {row.premium}
                  </td>
                )}
                {isMobile && (
                  <td className="py-4 px-6 w-[120px]">
                    {row[selectedPlan]}
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-6 pb-6 text-center bg-default-100 text-primary md:h-56 h-40 w-full">
        <motion.h2
          className="text-4xl font-bold mb-3 w-[90vw] mx-auto"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl mb-10">
            If you got more questions about our plans you can contact
            us
          </h2>
        </motion.h2>
        <motion.a
          href="mailto:clickpulse.team@gmail.com"
          className="text-emphasis text-xl cursor-pointer"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          clickpulse.team@gmail.com
        </motion.a>
      </div>
    </>
  );
};
