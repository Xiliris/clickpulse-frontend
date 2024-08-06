import { FC, useState, useEffect } from "react";
import axiosInstance from "../../modules/axiosInstance";

interface SingleValueProps {
  id: any;
  request: string;
  type: string;
  title: string;
  date: string;
}

const SingleValue: FC<SingleValueProps> = ({ id, type, request, title, date }) => {
  const [page, setPage] = useState<any>({});

  useEffect(() => {
    getPage();
  }, []);

  async function getPage() {
    try {
      const response = await axiosInstance.get(`/data/${request}/${id}/${date}`);

      console.log(response.data);

      setPage(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="text-white flex justify-between flex-col border-2 border-primary p-5 rounded-md">
      <h1>{title}</h1>
      <div className="flex justify-between items-center gap-10 bg-secondary-200 p-3 rounded-md mt-3">
        <p>{page[type]}</p>
      </div>
    </div>
  );
};

export default SingleValue;
