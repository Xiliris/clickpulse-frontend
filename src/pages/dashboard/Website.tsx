import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axiosInstance from '../../modules/axiosInstance';

const Website: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [totalVisits, setTotalVisits] = useState<{ date: string; views: number }[]>([]);
  const startDate = '2024-08-06';
  const endDate = '2024-09-20';

  useEffect(() => {
    async function getTotalPageViews() {
      try {
        const response = await axiosInstance.get(`/data/total-views/${id}?startDate=${startDate}&endDate=${endDate}`);
        const data = response.data;

        const filterData = data.map(({ date, views }: { date: string; views: number }) => ({ date, views }));
        setTotalVisits(filterData);
      } catch (error) {
        console.error("Error fetching total page views:", error);
      }
    }

    getTotalPageViews();
  }, [id, startDate, endDate]);

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-emphasis">Website</h1>

      <Container title="Total">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={totalVisits}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Container>
    </main>
  );
};

interface ContainerProps {
  children: React.ReactNode;
  title?: string;
}

const Container: FC<ContainerProps> = ({ children, title }) => {
  return (
    <>
      <h1 className="text-emphasis text-3xl mt-5 mb-2">{title}</h1>
      <div className="flex justify-between items-center w-1/2 border-2 border-emphasis p-5 rounded-lg">
        {children}
      </div>
    </>
  );
};

export default Website;
