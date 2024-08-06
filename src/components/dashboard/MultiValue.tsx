import { FC, useState, useEffect } from "react";
import axiosInstance from "../../modules/axiosInstance";

interface MultiValueProps {
  id: any;
  request: string;
  type: string;
  title: string;
}

const MultiValue: FC<MultiValueProps> = ({ id, type, request, title }) => {
  const [page, setPage] = useState<any[]>([]);

  useEffect(() => {
    getPage();
  }, []);

  async function getPage() {
    try {
      const response = await axiosInstance.get(`/data/${request}/${id}`);

      setPage(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="text-white flex justify-between flex-col border-2 border-primary p-5 rounded-md">
      <h1>{title}</h1>
      {page.map((item, index) => (
        <div key={index} className="flex justify-between items-center gap-10 bg-secondary-200 p-3 rounded-md mt-3">
          <p>{item[type]}</p>
          <p>{item.views}</p>
        </div>
      ))}
    </div>
  );
};

export default MultiValue;
