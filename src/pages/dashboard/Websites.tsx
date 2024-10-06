import { FC, useState, useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import axiosInstance from "../../modules/axiosInstance";
import SplitSection from "../../components/SplitSection";
import Background from "../../assets/Background2.jpg";

import Navbar from "../../components/Navbar";
import Footer from "../../components/home/Footer";
import Header from "../../components/Header";
import Button from "../../components/form/Button";
import { Link } from "react-router-dom";

interface WebsiteData {
  domain: string;
  active: boolean;
  id: string;
}

const Websites: FC = () => {
  const [cookies] = useCookies(["token"]);
  const [websites, setWebsites] = useState<WebsiteData[]>([]);

  useEffect(() => {
    getWebsites();
  }, []);

  async function getWebsites() {
    try {
      const response = await axiosInstance.get(
        `/dashboard/websites/${cookies.token}`
      );

      setWebsites(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CookiesProvider>
      <Navbar />
      <Header title="Dashboard" />
      <main className="flex flex-col justify-between items-center w-[70vw] min-h-screen m-auto py-32">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl text-emphasis">Select a website</h1>
          <p className="text-primary text-center w-full">
            Choose a website to view analytics and insights.
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-5 mt-10">
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
            <p className="text-primary">Please add a website.</p>
          )}
        </div>
        <Link to="/dashboard/add-website">
          <Button className="mt-10">Add Website</Button>
        </Link>
      </main>
      <SplitSection>
        If you have any questions or need assistance, please contact us at.
      </SplitSection>
      <Footer />
    </CookiesProvider>
  );
};

interface WebsiteProps {
  domain: string;
  active: boolean;
  id: string;
}

const Website: FC<WebsiteProps> = ({ domain, id, active }) => {
  const name = domain.replace("https://", "").replace("http://", "");
  return (
    <div className=" bg-default-300  rounded-lg flex items-center gap-5 justify-between relative p-5 px-10 ">
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
        className="w-16 md:w-8"
        height={80}
        width={80}
        alt={`favicon of ${domain}`}
      />
      <p className="text-emphasis font-bold text-2xl md:text-base">{name}</p>
      {active ? (
        <Link to={`/dashboard/${id}`}>
          <Button className="md:text-sm md:px-3 md:py-1">View</Button>
        </Link>
      ) : (
        <Button disabled={true}>Pending</Button>
      )}
    </div>
  );
};

export default Websites;
