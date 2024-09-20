import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Select from "../../components/form/Select";

import axiosInstance from "../../modules/axiosInstance";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Website: FC = () => {
  const { id } = useParams();
  const [totalViews, setTotalViews] = useState([]);
  const startDate = "2024-08-06";
  const endDate = "2024-08-12";

  useEffect(() => {
    async function getTotalPageViews() {
      const response = await axiosInstance.get(
        `/data/total-views/${id}?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.data;

      const filteredData = data.map(({ date, views }: any) => {
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        return {
          date: formattedDate,
          views,
        };
      });

      setTotalViews(filteredData);
    }

    getTotalPageViews();
  }, [startDate, endDate]);

  const timeSelectOptions = [
    "Today",
    "Yesterday",
    "This Week",
    "This Month",
    "This Year",
    "All Time",
    "Live",
  ];

  const optionSelectOptions = [
    "Total Visits",
    "Total Pageviews",
    "Visit Duration",
    "Bounce Rate",
  ];

  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-center items-center mt-32 w-[70vw] mx-auto">
        <div className="flex justify-between items-center w-full mb-8">
          <h2 className="text-emphasis text-xl">https://adnanskopljak.com</h2>
          <div className="flex justify-center items-center gap-4">
            <Select
              options={optionSelectOptions}
              label="Select option"
            ></Select>
            <Select options={timeSelectOptions} label="Select option"></Select>
          </div>
        </div>
        <Container>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={500}
              data={totalViews}
              margin={{ top: 30, right: 40, left: 0, bottom: 20 }}
            >
              <CartesianGrid stroke="#3B434F" vertical={false} />
              <Area
                dataKey="views"
                type="monotone"
                stroke="#3CBAB1"
                fill="#3CBAB1"
                connectNulls
              />
              <XAxis
                dataKey="date"
                tick={<CustomizedXAxisTick />}
                axisLine={{ stroke: "#A3B8C7" }}
              />
              <YAxis
                tick={{ fill: "#A3B8C7" }}
                axisLine={{ stroke: "#A3B8C7" }}
                allowDecimals={false}
                domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.2)]}
              />
              <Tooltip content={<CustomToolTip />} />
            </AreaChart>
          </ResponsiveContainer>
        </Container>
      </main>
    </>
  );
};

interface ContainerProps {
  children: React.ReactNode;
}

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

const CustomToolTip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-default-200 flex flex-col gap-1 rounded-md">
        <p className="text-lg text-emphasis">Visits</p>
        <p className="flex items-center gap-2">
          <span className="text-md text-primary">{label}</span>
          <span className="text-primary font-bold">
            {payload[0].value} visits
          </span>
        </p>
      </div>
    );
  }
};

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex justify-between items-center w-[70vw] h-96 bg-default-300 p-5 rounded-md shadow-outline shadow-black">
      {children}
    </div>
  );
};

export default Website;
