import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../modules/axiosInstance";
import {
  formatNumber,
  calculateLogoType,
} from "../../utils/dashboard/functions";
import OverlayArticle from "./OverlayArticle";
import Spinner from "../Spinner";
import { fadeUp } from "../../animations/Animations";

interface StatsArticleProps {
  selectionItems: string[];
  startDate: Date;
  endDate: Date;
  id: string | undefined;
  listType: string;
  icon: boolean;
}

const StatsArticle: FC<StatsArticleProps> = ({
  selectionItems,
  id,
  startDate,
  endDate,
  listType,
  icon,
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string>(
    selectionItems[0].toLowerCase().replace(" ", "-")
  );
  const [userAgentStats, setUserAgentStats] = useState<any[]>([]);
  const [userAgentKey, setUserAgentKey] = useState<any>();
  const [overlayState, setOverlayState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  function handleOverlayState() {
    setOverlayState(!overlayState);
  }

  useEffect(() => {
    async function fetchUserAgentData() {
      try {
        const response = await axiosInstance.get(
          `/data/${selectedMetric}/${id}/?startDate=${startDate}&endDate=${endDate}`
        );
        const fetchedData = await response.data;

        setUserAgentKey(Object.keys(fetchedData[0]));

        setUserAgentStats(fetchedData);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    fetchUserAgentData();
  }, [startDate, endDate, selectedMetric]);

  function handleMetricSelection(e: any) {
    const selectedText = e.target.innerText;
    const formattedMetric = selectedText.toLowerCase().replace(" ", "-");

    setSelectedMetric(formattedMetric);
  }

  const displayedMetricName = selectedMetric.replace("-", " ").toUpperCase();

  return (
    <>
      <motion.div
        variants={fadeUp}
        initial="initial"
        viewport={{ once: true, amount: 0.3 }}
        whileInView="animate"
        className="flex flex-col bg-default-300 py-5 rounded-md gap-5 w-full px-5 min-h-[465px] relative"
      >
        {loading && (
          <Spinner className="justify-center absolute bg-default-300 top-0 left-0 z-30" />
        )}
        <div className="flex justify-between items-center border-b border-b-default-100 pb-1">
          <h2 className="text-emphasis font-bold text-xl md:text-sm">
            {displayedMetricName}
          </h2>
          <ul className="flex justify-between items-center gap-3 text-secondary-100 md:gap-2">
            {selectionItems.map((item: string) => (
              <li
                className={`cursor-pointer leading-4 hover:text-emphasis 
                ${
                  selectedMetric.toLowerCase().replace("-", " ") ===
                  item.toLowerCase()
                    ? "text-emphasis border-b border-emphasis scale-105"
                    : "border-b border-transparent"
                }
                transition-colors duration-200 ease-in-out md:text-xs
                `}
                id={item}
                onClick={handleMetricSelection}
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ul className="flex justify-end items-center text-right">
          <li className="text-secondary-100 capitalize">{listType}</li>
        </ul>
        {userAgentStats.length > 0 ? (
          userAgentStats
            .slice(0, 6)
            .map((stat: any, index: number) => (
              <Item
                key={index}
                index={index}
                icon={icon}
                stat={stat}
                userAgentKey={userAgentKey}
                listType={listType}
              />
            ))
        ) : (
          <ItemInvalidData />
        )}
        <p
          className="text-secondary-100 mt-auto ml-auto cursor-pointer hover:text-primary transition-colors duration-200 ease-linear"
          onClick={handleOverlayState}
        >
          View more
        </p>
      </motion.div>
      {overlayState && (
        <OverlayArticle
          title={selectedMetric.replace("-", " ")}
          trackingTitle={userAgentKey}
          trackingContent={userAgentStats}
          close={handleOverlayState}
        />
      )}
    </>
  );
};

interface ItemProps {
  index: number;
  icon: boolean;
  stat: any;
  userAgentKey: string;
  listType: string;
}

function Item({ index, icon, stat, userAgentKey, listType }: ItemProps) {
  const getTruncated = (value: string) => {
    if (window.innerWidth > 767) return value;
    return value.length > 25 ? `${value.slice(0, 25)}...` : value;
  };
  return (
    <div
      key={index}
      className="flex justify-between items-center w-full border-b border-default-100 pb-1 relative"
    >
      <div className="flex justify-start items-center gap-2">
        {icon && (
          <img
            src={`${calculateLogoType(
              Object.keys(stat)[0],
              stat[Object.keys(stat)[0]]
            )}`}
            width={16}
            height={16}
            className="w-4 h-4 md:w-4 md:h-4"
          />
        )}
        <p className="text-lg text-secondary-100 md:text-sm">
          {getTruncated(
            stat[`${userAgentKey[0]}`]
              .replaceAll("%20", "")
              .replaceAll("https://www.", "")
          )}
        </p>
      </div>
      <div className="flex justify-between items-center gap-2">
        <p className="text-lg text-secondary-100 md:text-sm">
          {formatNumber(stat[listType])}
        </p>
      </div>
    </div>
  );
}

function ItemInvalidData() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <p className="text-secondary-100 -rotate-12 text-lg">
        Nothing to show right now!
      </p>
    </div>
  );
}
/*
function PremiumFeature() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <motion.p
        initial={{ backgroundPosition: "-200% 0" }}
        animate={{ backgroundPosition: "200% 0" }}
        transition={{
          duration: 5,
          ease: "linear",
          repeat: Infinity,
        }}
        className="relative text-lighter-emphasis bg-gradient-to-r from-lighter-emphasis via-white to-lighter-emphasis bg-[length:200%_100%] bg-clip-text text-lg -rotate-12"
      >
        This feature's too hot to handle at this price!
      </motion.p>
    </div>
  );
}
*/
export default StatsArticle;
