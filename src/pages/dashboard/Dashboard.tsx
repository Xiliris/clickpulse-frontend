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
      <main className="mt-32 flex flex-col justify-center items-center w-[70vw] m-auto">
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
            <p className="text-primary">No websites found</p>
          )}
          <Website
            key={1}
            domain={'website.domain'}
            active={true}
            id={'1'}
          />
          <Website
            key={1}
            domain={'website.domain'}
            active={true}
            id={'1'}
          />
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
    <div className="w-full border-2 border-secondary-100 rounded-lg flex justify-between items-center mt-5 min-h-[25vh] relative">
      <p className="text-primary text-2xl absolute top-2 left-1/2 transform -translate-x-1/2">
        {domain}
      </p>
      <p className="text-secondary-100 absolute top-16 left-1/2 text-2xl transform -translate-x-1/2">
        <span>URL TU NEKI NEK IDE .COM</span>
      </p>
      <Link
        to={`/dashboard/${id}`}
        className="absolute bottom-2 right-2"
      >
        <Button>View</Button>
      </Link>
    </div>
  );
};

export default Dashboard;
