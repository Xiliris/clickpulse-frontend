import { FC, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Select from "../../components/form/Select";
import StatsArticle from "../../components/dashboard/StatsArticke";
import LineGraph from "../../components/dashboard/LineGraph";

import { calculateDate } from "../../utils/dashboard/functions";

const Dashboard: FC = () => {
  const { id } = useParams();
  const defaultDate = calculateDate(7);
  const [startDate, setStartDate] = useState<any>(defaultDate.currentDate);
  const [endDate, setEndDate] = useState<any>(defaultDate.targetDate);

  function handleTimeChange(newSelection: string) {
    const result = newSelection.toLowerCase();

    switch (result) {
      case "last 7 days":
        const getWeek = calculateDate(3);
        setStartDate(getWeek.currentDate);
        setEndDate(getWeek.targetDate);
        break;

      case "last 30 days":
        const getMonth = calculateDate(30);
        setStartDate(getMonth.currentDate);
        setEndDate(getMonth.targetDate);
        break;

      case "last 12 months":
        const getYear = calculateDate(365);
        setStartDate(getYear.currentDate);
        setEndDate(getYear.targetDate);
        break;
      case "all time":
        setStartDate("");
        setEndDate("");
        break;

      default:
        const getDefaultWeek = calculateDate(7);
        setStartDate(getDefaultWeek.currentDate);
        setEndDate(getDefaultWeek.targetDate);
        break;
    }
  }

  return (
    <>
      <Navbar width={90} />
      <main className="flex flex-col justify-center items-center mt-32 mb-16 w-[90vw] mx-auto">
        <div className="flex justify-between items-center w-full mb-8 md:flex-col md:mb-5 md:gap-5">
          <h2 className="text-emphasis text-xl">https://adnanskopljak.com</h2>
          <div className="flex justify-center items-center gap-4 md:w-full">
            <Select
              options={[
                "Last 7 Days",
                "Last 30 days",
                "Last 12 Months",
                "All Time",
                "Live",
              ]}
              label="Select option"
              onChange={handleTimeChange}
              className="md:w-full"
            ></Select>
          </div>
        </div>
        <LineGraph id={id} startDate={startDate} endDate={endDate} />
        <div className="grid grid-cols-2 gap-5 mt-6 w-full lg:grid-cols-1">
          <StatsArticle
            id={id}
            selectionItems={["Browsers", "Devices", "OS"]}
            startDate={startDate}
            endDate={endDate}
          />
          <StatsArticle
            id={id}
            selectionItems={["Top Pages", "Entry Pages", "Exit Pages"]}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
