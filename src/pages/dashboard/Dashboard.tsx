import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Select from "../../components/form/Select";
import StatsArticle from "../../components/dashboard/StatsArticke";

import {
  formatValue,
  formatDate,
  calculateDate,
  capitalizeWords,
} from "../../utils/dashboard/functions";

import axiosInstance from "../../modules/axiosInstance";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Dashboard: FC = () => {
  const { id } = useParams();
  const defaultDate = calculateDate(7);
  const [startDate, setStartDate] = useState<any>(defaultDate.currentDate);
  const [endDate, setEndDate] = useState<any>(defaultDate.targetDate);

  const [graphRequest, setGraphRequest] = useState<string>("total-visits");
  const [graphDataKey, setGraphDataKey] = useState<string>("views");
  const [graphData, setGraphData] = useState<any[]>([]);

  useEffect(() => {
    async function getGraph() {
      const graphResponse = await axiosInstance.get(
        `/data/${graphRequest}/${id}?startDate=${startDate}&endDate=${endDate}`
      );
      const graphData = await graphResponse.data;

      setGraphDataKey(Object.keys(graphData[0])[1]);
      setGraphData(formatDate(graphData));
    }

    getGraph();
  }, [startDate, endDate, graphRequest]);

  function handleTypeChange(newSelection: string) {
    const result = newSelection.toLowerCase();

    switch (result) {
      case "total visits":
        setGraphRequest("total-visits");
        break;
      case "total page visits":
        setGraphRequest("total-page-visits");
        break;
      case "visit duration":
        setGraphRequest("session-duration");
        break;
      case "bounce rate":
        setGraphRequest("bounce-rate");
        break;
      default:
        setGraphRequest("total-visits");
        break;
    }
  }

  function handleTimeChange(newSelection: string) {
    const result = newSelection.toLowerCase();
    console.log(result);

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

  const maxViews =
    Math.ceil(Math.max(...graphData.map((view) => view[graphDataKey])) / 100) *
    100;

  const yTicks = Array.from({ length: 6 }, (_, i) => i * (maxViews / 5));

  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-center items-center mt-32 w-[90vw] mx-auto">
        <div className="flex justify-between items-center w-full mb-8">
          <h2 className="text-emphasis text-xl">https://adnanskopljak.com</h2>
          <div className="flex justify-center items-center gap-4">
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
            ></Select>
          </div>
        </div>
        <Graph
          content={graphData}
          yTicks={yTicks}
          dataKey={graphDataKey}
          onChange={handleTypeChange}
        />
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

interface ContainerProps {
  content: any;
  yTicks: any;
  dataKey: string;
  onChange: (selected: string) => void;
}

const Graph: FC<ContainerProps> = ({ content, yTicks, dataKey, onChange }) => {
  const formatTargetValue = (value: number): string => {
    return formatValue(value, dataKey);
  };
  const trackingName = capitalizeWords(dataKey.replace(/_/g, " "));
  return (
    <>
      <div className="flex justify-between items-center w-full pl-[69px] pr-10 pt-6 rounded-tl-md rounded-tr-md bg-default-300">
        <h2 className="text-2xl font-bold text-emphasis font-ibm">
          {trackingName.toUpperCase()}
        </h2>
        <Select
          options={[
            "Total Visits",
            "Total Page Visits",
            "Visit Duration",
            "Bounce Rate",
          ]}
          label="Select option"
          onChange={onChange}
        ></Select>
      </div>
      <div className="flex justify-between items-center w-[90vw] h-96 bg-default-300 p-5 rounded-md shadow-outline shadow-black">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={500}
            data={content}
            margin={{ top: 30, right: 20, left: -30, bottom: 20 }}
          >
            <CartesianGrid stroke="#3B434F" vertical={false} />
            <Line
              dataKey={dataKey}
              stroke="#3CBAB1"
              strokeWidth={2}
              fill="#3CBAB1"
              dot={false}
              connectNulls
            />
            <XAxis
              dataKey="date"
              tick={<CustomizedXAxisTick />}
              axisLine={{ stroke: "#A3B8C7" }}
              interval={Math.floor(content.length / 4)}
            />
            <YAxis
              tick={{ fill: "#A3B8C7" }}
              axisLine={{ stroke: "#A3B8C7" }}
              allowDecimals={false}
              domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.2)]}
              tickFormatter={formatTargetValue}
              ticks={yTicks}
              tickLine={false}
              width={80}
            />
            <Tooltip content={<CustomToolTip trackingName={trackingName} />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

const CustomizedXAxisTick = ({ x, y, stroke, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#A3B8C7"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const CustomToolTip = ({ active, payload, label, trackingName }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-default-200 flex flex-col gap-1 rounded-md">
        <p className="text-lg text-emphasis">{trackingName}</p>
        <p className="flex items-center gap-2">
          <span className="text-md text-primary">{label}</span>
          <span className="text-primary font-bold">
            {formatValue(
              payload[0].value,
              trackingName.toLowerCase().replace(" ", "_")
            )}{" "}
            {trackingName}
          </span>
        </p>
      </div>
    );
  }
};

export default Dashboard;
