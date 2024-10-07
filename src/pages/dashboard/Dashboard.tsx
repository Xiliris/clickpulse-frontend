import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Select from "../../components/form/Select";
import StatsArticle from "../../components/dashboard/StatsArticke";
import LineGraph from "../../components/dashboard/LineGraph";
import WorldMap from "../../components/dashboard/WorldMap";
import { fadeLeft, fadeRight } from "../../animations/Animations";

import { calculateDate } from "../../utils/dashboard/functions";
import Footer from "../../components/home/Footer";
import SplitSection from "../../components/SplitSection";

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
      <Header title="Dashboard" />
      <Navbar width={90} />
      <main className="flex flex-col justify-center items-center mt-32 mb-16 w-[90vw] mx-auto">
        <div className="flex justify-between items-center w-full mb-8 md:flex-col md:mb-5 md:gap-5">
          <motion.h2
            variants={fadeLeft}
            initial="initial"
            viewport={{ once: true }}
            whileInView="animate"
            className="text-emphasis text-xl"
          >
            https://adnanskopljak.com
          </motion.h2>
          <motion.div
            variants={fadeRight}
            initial="initial"
            viewport={{ once: true }}
            whileInView="animate"
            className="flex justify-center items-center gap-4 md:w-full"
          >
            <Select
              options={[
                "Last 7 Days",
                "Last 30 days",
                "Last 12 Months",
                "All Time",
              ]}
              label="Select option"
              onChange={handleTimeChange}
              className="md:w-full"
            ></Select>
          </motion.div>
        </div>
        <LineGraph id={id} startDate={startDate} endDate={endDate} />
        <div className="grid grid-cols-2 gap-5 mt-6 w-full lg:grid-cols-1">
          <StatsArticle
            id={id}
            selectionItems={["Browsers", "Devices", "OS"]}
            startDate={startDate}
            endDate={endDate}
            listType={"visits"}
            icon={false}
          />
          <StatsArticle
            id={id}
            selectionItems={["Visitor Source"]}
            startDate={startDate}
            endDate={endDate}
            listType={"visits"}
            icon={true}
          />
          <StatsArticle
            id={id}
            selectionItems={["Button Clicks", "Anchor Clicks"]}
            startDate={startDate}
            endDate={endDate}
            listType={"clicks"}
            icon={false}
          />
          <StatsArticle
            id={id}
            selectionItems={["Top Pages", "Entry Pages", "Exit Pages"]}
            startDate={startDate}
            endDate={endDate}
            listType={"visits"}
            icon={false}
          />
        </div>
        <WorldMap id={id} startDate={startDate} endDate={endDate} />
      </main>

      <SplitSection>
        If you have any features, suggestions or feedback, please reach out to
        us at
      </SplitSection>
      <Footer width={90} />
    </>
  );
};

export default Dashboard;
