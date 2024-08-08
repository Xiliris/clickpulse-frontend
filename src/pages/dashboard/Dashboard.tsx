import { FC, useState, useEffect } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import axiosInstance from '../../modules/axiosInstance';

import Navbar from '../../components/Navbar';
import Header from '../../components/header';
import Button from '../../components/form/Button';
import { Link } from 'react-router-dom';

interface WebsiteData {
  domain: string;
  active: boolean;
  id: string;
}

const Dashboard: FC = () => {
  const [cookies] = useCookies(['token']);
  const [websites, setWebsites] = useState<WebsiteData[]>([]);

  useEffect(() => {
    getWebsites();
  }, []);

  async function getWebsites() {
    try {
      const response = await axiosInstance.get(
        `/dashboard/websites/${cookies.token}`
      );
      console.log(response.data);

      setWebsites(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CookiesProvider>
      <Navbar />
      <Header title="Dashboard" />
      <main className="mt-40 flex flex-col justify-center items-center w-[80%] m-auto">
        <h1 className="text-4xl text-emphasis">Select a website</h1>
        <p className="text-primary text-center w-full">
          Choose a website to view analytics and insights.
        </p>
        <div className="w-full mt-10 flex flex-col justify-center items-center">
          {websites && websites.length > 0 ? (
            websites.map((website, index) => (
              <Website
                key={index}
                domain={website.domain}
                active={website.active}
                id={website.id}
              />
            ))
          ) : (
            <p>No websites found</p>
          )}
        </div>
        <Link to="/dashboard/new">
          <Button className="mt-5">Add Website</Button>
        </Link>
      </main>
    </CookiesProvider>
  );
};

interface WebsiteProps {
  domain: string;
  active: boolean;
  id: string;
}

const Website: FC<WebsiteProps> = ({ domain, id }) => {
  return (
    <div className="w-full border-2 border-primary rounded-lg flex justify-between items-center px-5 py-2 mt-5">
      <p className="text-emphasis text-2xl">{domain}</p>

      <Link to={`/dashboard/${id}`}>
        <Button className="bg-emphasis text-background-100 px-6 py-2 rounded-md items-center font-medium">
          View
        </Button>
      </Link>
    </div>
  );
};

export default Dashboard;
