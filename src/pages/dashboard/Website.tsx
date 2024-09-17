import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../modules/axiosInstance';

const Website: FC = () => {
  const { id } = useParams();
  const startDate = '2024-08-06';
  const endDate = '2024-09-20';

  useEffect(() => {
    async function getTotalPageViews() {
      const response = await axiosInstance.get(`/data/total-views/${id}?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.data;

      console.log('Total Page Views:', data);
    };


    getTotalPageViews();
  }, [startDate, endDate]);

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-emphasis">Website</h1>

      <Container title="Total">
              <p className='text-white'>Testing</p>
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
