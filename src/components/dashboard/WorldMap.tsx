import { FC, useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { formatNumber } from "../../utils/dashboard/functions";
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/Animations";
import axiosInstance from "../../modules/axiosInstance";

import OverlayArticle from "./OverlayArticle";

interface WorldMapProps {
  id: string | undefined;
  startDate: Date;
  endDate: Date;
}

const CustomToolTip = (country: string, visitors: number) => {
  return `<div class="p-4 bg-default-200 flex flex-col gap-1 rounded-md">
        <p class="text-lg text-emphasis font-bold">${country}</p>
        <p class="flex items-center gap-2">
          <span class="text-primary font-bold text-base">${formatNumber(
            visitors
          )}</span>
          <span class="text-base text-primary"> Visitors</span>
        </p>
      </div>`;
};

// Sample visitor data by country

const WorldMap: FC<WorldMapProps> = ({ id, endDate, startDate }) => {
  const [userAgentStats, setUserAgentStats] = useState<any[]>([]);
  const [userAgentKey, setUserAgentKey] = useState<any>();
  const [overlayState, setOverlayState] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUserAgentData() {
      const response = await axiosInstance.get(
        `/data/location/${id}/?startDate=${startDate}&endDate=${endDate}`
      );
      const fetchedData = await response.data;

      setUserAgentKey(Object.keys(fetchedData[0]));

      setUserAgentStats(fetchedData);
    }

    fetchUserAgentData();
  }, [startDate, endDate]);

  const data = [
    [
      "Country",
      "Visitors",
      { role: "tooltip", type: "string", p: { html: true } },
    ],
    ...userAgentStats.map((item) => [
      item.country,
      parseInt(item.visits, 10), // Convert visits to an integer
      CustomToolTip(item.country, parseInt(item.visits, 10)),
    ]),
  ];

  function handleOverlayState() {
    setOverlayState(!overlayState);
  }

  return (
    <>
      <motion.div
        variants={fadeUp}
        initial="initial"
        viewport={{ once: true, amount: 0.3 }}
        whileInView="animate"
        className="p-5 bg-default-300 rounded-md mt-5 w-full"
      >
        <div className="flex justify-between items-center border-b border-b-default-100 pb-1">
          <h2 className="text-emphasis font-bold text-xl md:text-sm">
            WORLD MAP
          </h2>
          <ul className="flex justify-between items-center gap-3 text-secondary-100 md:gap-2">
            <li
              className={`cursor-pointer leading-4 hover:text-emphasis  text-emphasis border-b border-emphasis scale-105 transition-colors duration-200 ease-in-out md:text-xs`}
            >
              Map
            </li>
            <li
              className={`cursor-pointer leading-4 hover:text-emphasis  border-b border-transparent scale-105 transition-colors duration-200 ease-in-out md:text-xs`}
              onClick={handleOverlayState}
            >
              Visualize
            </li>
          </ul>
        </div>
        <div className="my-7">
          <Chart
            chartType="GeoChart"
            width="100%"
            height="600px"
            data={data}
            options={{
              colorAxis: { colors: ["#31968E", "#3CBAB1"] },
              backgroundColor: "#1A1E25",
              datalessRegionColor: "#4C5366",
              tooltip: { isHtml: true },
              legend: "none",
            }}
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 0) return;
                },
              },
            ]}
          />
        </div>
      </motion.div>
      {overlayState && (
        <OverlayArticle
          title={"Country Stats"}
          trackingTitle={userAgentKey}
          trackingContent={userAgentStats}
          close={handleOverlayState}
        />
      )}
    </>
  );
};

export default WorldMap;
