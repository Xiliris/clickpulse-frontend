import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Select from "../form/Select";

import axiosInstance from "../../modules/axiosInstance";
import { fadeUp } from "../../animations/Animations";

import {
  formatValue,
  capitalizeWords,
  formatRoundedValue,
  formatDate,
} from "../../utils/dashboard/functions";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface ContainerProps {
  id: string | undefined;
  startDate: Date;
  endDate: Date;
}

const LineGraph: FC<ContainerProps> = ({ id, startDate, endDate }) => {
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

  const maxViews =
    Math.ceil(Math.max(...graphData.map((view) => view[graphDataKey])) / 100) *
    100;

  const yTicks = Array.from({ length: 6 }, (_, i) => i * (maxViews / 5));

  const formatTargetValue = (value: number): string => {
    return formatRoundedValue(value, graphDataKey);
  };
  const trackingName = capitalizeWords(graphDataKey.replace(/_/g, " "));
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      viewport={{ once: true, amount: 0.5 }}
      whileInView="animate"
    >
      <div className="flex justify-between items-center w-full pl-[79px] pr-10 pt-6 rounded-tl-md rounded-tr-md bg-default-300 md:flex-col md:pl-5 md:pr-6">
        <h2 className="text-2xl font-bold text-emphasis font-ibm md:text-xl">
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
          onChange={handleTypeChange}
          className="md:w-full md:mt-6"
        ></Select>
      </div>
      <div className="flex justify-between items-center w-[90vw] h-96 bg-default-300 p-5 rounded-md shadow-outline shadow-black md:p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={500}
            data={graphData}
            margin={{ top: 30, right: 20, left: -20, bottom: 20 }}
          >
            <CartesianGrid stroke="#3B434F" vertical={false} />
            <Line
              dataKey={graphDataKey}
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
              interval={Math.floor(graphData.length / 4)}
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
    </motion.div>
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
        className="text-sm"
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

export default LineGraph;
