import { FC, useState, useEffect } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import axiosInstance from '../../modules/axiosInstance';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Home/Footer';
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
      <main className="mt-32 flex flex-col justify-center items-center w-[70vw] m-auto pb-16">
        <h1 className="text-4xl text-emphasis">Select a website</h1>
        <p className="text-primary text-center w-full">
          Choose a website to view analytics and insights.
        </p>
        <div className="w-full mt-10 flex flex-wrap justify-center items-center gap-5">
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
            <p className="text-primary"></p>
          )}
          <Website
            key={1}
            domain={'adnanskopljak'}
            active={true}
            id={'1'}
          />
          <Website
            key={2}
            domain={'paulpravdic'}
            active={true}
            id={'2'}
          />
          <Website
            key={3}
            domain={'twitter'}
            active={true}
            id={'3'}
          />
          <Website
            key={4}
            domain={'facebook'}
            active={true}
            id={'4'}
          />
        </div>
        <Link to="/dashboard/new">
          <Button className="mt-10">Add Website</Button>
        </Link>
      </main>
      <Footer />
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
    <div className="w-96 border-2 border-secondary-100 rounded-lg flex flex-col justify-between mt-5 min-h-[25vh] relative p-4">
      <p className="text-primary text-2xl text-center">{domain}</p>
      <div className="flex-1 flex items-center justify-center">
        <p className="text-secondary-100 text-2xl text-center">
          <span>iamfromazerbaijan.com</span>
        </p>
      </div>
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
