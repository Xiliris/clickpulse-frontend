import { FC, useState, useEffect } from "react";
import axiosInstance from "../../modules/axiosInstance";
import { formatNumber } from "../../utils/dashboard/functions";
import OverlayArticle from "./OverlayArticle";

interface StatsArticleProps {
  selectionItems: string[];
  startDate: Date;
  endDate: Date;
  id: string | undefined;
}

const StatsArticle: FC<StatsArticleProps> = ({
  selectionItems,
  id,
  startDate,
  endDate,
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string>(
    selectionItems[0].toLowerCase().replace(" ", "-")
  );
  const [userAgentStats, setUserAgentStats] = useState<any[]>([]);
  const [userAgentKey, setUserAgentKey] = useState<any>();
  const [overlayState, setOverlayState] = useState<boolean>(false);

  function handleOverlayState() {
    setOverlayState(!overlayState);
  }

  useEffect(() => {
    async function fetchUserAgentData() {
      const response = await axiosInstance.get(
        `/data/${selectedMetric}/${id}/?startDate=${startDate}&endDate=${endDate}`
      );
      const fetchedData = await response.data;

      setUserAgentKey(Object.keys(fetchedData[0]));

      setUserAgentStats(fetchedData);
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
      <div className="flex flex-col bg-default-300 py-5 rounded-md gap-5 w-full px-5">
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
          <li className="text-secondary-100">Visits</li>
        </ul>
        {userAgentStats.slice(0, 6).map((stat: any, index: number) => (
          <div
            key={index}
            className="flex justify-between items-center w-full border-b border-default-100 pb-1"
          >
            <div className="flex justify-start items-center gap-2">
              <img
                src="https://via.placeholder.com/150"
                width={28}
                height={28}
                className="w-7 h-7 md:w-4 md:h-4"
              />
              <p className="text-lg text-secondary-100 md:text-sm">
                {stat[`${userAgentKey[0]}`]}
              </p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <p className="text-lg text-secondary-100 md:text-sm">
                {formatNumber(stat.visits)}
              </p>
            </div>
          </div>
        ))}
        <p
          className="text-secondary-100 mt-auto ml-auto cursor-pointer hover:text-primary transition-colors duration-200 ease-linear"
          onClick={handleOverlayState}
        >
          View more
        </p>
      </div>
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

export default StatsArticle;
