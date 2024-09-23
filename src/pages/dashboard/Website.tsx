import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Select from "../../components/form/Select";

import axiosInstance from "../../modules/axiosInstance";
import {
  LineChart, Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Website: FC = () => {
  const { id } = useParams(); 
  const [requestType, setRequestType] = useState<string>("total-visits");
  const [graphDataKey, setGraphDataKey] = useState<string>("views");
  const defaultDate = calculateDate(7);

  const [totalViews, setTotalViews] = useState<any[]>([]);

  const [startDate, setStartDate] = useState<any>(defaultDate.currentDate);
  const [endDate, setEndDate] = useState<any>(defaultDate.targetDate);
  /*
    When no data is found it doesnt return zero so it doesnt show anything
  */

  useEffect(() => {
    async function getTotalPageViews() {
      const response = await axiosInstance.get(
        `/data/${requestType}/${id}?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.data;

      console.log(data);
      
      setGraphDataKey(Object.keys(data[0])[1]);
      setTotalViews(formatDate(data));
    }

    getTotalPageViews();
  }, [startDate, endDate, requestType]);

  function handleTypeChange(newSelection: string) {
    const result = newSelection.toLowerCase();

    switch (result) {
      case "total visits":
        setRequestType("total-visits");
        break;
      case "total page visits":
        setRequestType("total-page-visits");
        break;
      case "visit duration":
        setRequestType("session-duration");
        break;
      case "bounce rate":
        setRequestType("bounce-rate");
        break;
      default:
        setRequestType("total-visits");
        break;
    }
  }

  function handleTimeChange(newSelection: string) {
    const result = newSelection.toLowerCase();

    switch (result) {
      case "last 7 days":
        const getWeek = calculateDate(7);
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
    Math.ceil(Math.max(...totalViews.map((view) => view[graphDataKey])) / 100) *
    100;

  const yTicks = Array.from({ length: 6 }, (_, i) => i * (maxViews / 5));

  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-center items-center mt-32 w-[70vw] mx-auto">
        <div className="flex justify-between items-center w-full mb-8">
          <h2 className="text-emphasis text-xl">https://adnanskopljak.com</h2>
          <div className="flex justify-center items-center gap-4">
            <Select
              options={[
                "Total Visits",
                "Total Page Visits",
                "Visit Duration",
                "Bounce Rate",
              ]}
              label="Select option"
              onChange={handleTypeChange}
            ></Select>
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
          content={totalViews}
          yTicks={yTicks}
          title={"TOTAL VISITS"}
          dataKey={graphDataKey}
        />
      </main>
    </>
  );
};

interface ContainerProps {
  content: any;
  yTicks: any;
  title: string;
  dataKey: string;
}

const Graph: FC<ContainerProps> = ({ content, yTicks, title, dataKey }) => {
  const formatTargetValue = (value: number): string => {
    return formatValue(value, dataKey);
  };
  const trackingName = capitalizeWords(dataKey.replace(/_/g, " "));
  return (
    <>
      <h2 className="text-2xl font-bold text-emphasis w-full bg-default-300 pt-6 rounded-tl-md rounded-tr-md text-center font-ibm">
        {trackingName.toUpperCase()}
      </h2>
      <div className="flex justify-between items-center w-[70vw] h-96 bg-default-300 p-5 rounded-md shadow-outline shadow-black">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={500}
            data={content}
            margin={{ top: 30, right: 80, left: 0, bottom: 20 }}
          >
            <CartesianGrid stroke="#3B434F" vertical={false} />
            <Line
              dataKey={dataKey}
              stroke="#3CBAB1"
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
            {formatValue(payload[0].value, trackingName.toLowerCase().replace(" ", '_'))} {trackingName}
          </span>
        </p>
      </div>
    );
  }
};

const formatValue = (value: number, type: string): string => {
  if (type === "visit_duration") {
    return formatDuration(value);
  } else if (type === "bounce_rate") {
    return formatPercentage(value);
  }
  return formatNumber(value);
};

function formatDate(data: any) {
  return data.map((item: any) => {
    const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    return {
      ...item,
      date: formattedDate,
    };
  });
}

function calculateDate(pastDays: number) {
  const currentDate = new Date();
  const targetDate = new Date(currentDate);
  targetDate.setDate(currentDate.getDate() - pastDays + 1);

  return {
    targetDate: currentDate.toISOString().slice(0, 10),
    currentDate: targetDate.toISOString().slice(0, 10),
  };
}

function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
function formatPercentage(percentage: number) {
  return `${percentage}%`;
}

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let formattedDuration = "";

  if (hours > 0) {
    formattedDuration += `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    formattedDuration += `${minutes}m ${remainingSeconds}s`;
  } else {
    formattedDuration += `${remainingSeconds}s`;
  }

  return formattedDuration.trim();
}

function formatNumber(num: number): string {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(1).replace(/\.0$/, "") + "tril";
  } else if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "bil";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "mil";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  } else {
    return num.toString();
  }
}

export default Website;
