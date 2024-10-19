import { FC, useState, useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import axiosInstance from "../../modules/axiosInstance";
import SplitSection from "../../components/SplitSection";
import Spinner from "../../components/Spinner";

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getWebsites();
  }, []);

  async function getWebsites() {
    try {
      const response = await axiosInstance.get(
        `/dashboard/websites/${cookies.token}`
      );

      setWebsites(response.data);
      setLoading(false);
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
        <div className="w-full flex flex-col justify-center items-center gap-5 mt-10 relative">
          {!loading &&
            (websites && websites.length > 0 ? (
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
            ))}
          {loading && (
            <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-default-200">
              <Spinner className="justify-center" />
            </div>
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
  const [cookies] = useCookies(["token"]);
  const [removeOverlay, setRemoveOverlay] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const name = domain.replace("https://", "").replace("http://", "");

  async function handleDelete() {
    try {
      const response: any = await axiosInstance.post("/dashboard/remove", {
        token: cookies.token,
        domain: name,
      });
      if (response.data) {
      }
    } catch (err) {
      console.log(err);
    }
    setDeleted(true);
    setRemoveOverlay(false);
  }

  return (
    <>
      {!deleted && (
        <div className=" bg-default-300  rounded-lg flex items-center justify-between relative p-5 px-5 w-full max-w-[500px]">
          <img
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
            className="w-16 md:w-8"
            height={80}
            width={80}
            alt={`favicon of ${domain}`}
          />
          <p className="text-emphasis font-bold text-2xl md:text-sm">{name}</p>
          {active ? (
            <Link to={`/dashboard/${id}`}>
              <Button className="md:text-sm md:px-3 md:py-1">View</Button>
            </Link>
          ) : (
            <Button disabled={true}>Pending</Button>
          )}
          <p className="flex justify-center items-center absolute right-0 top-0 translate-x-1/3 -translate-y-1/3">
            <i
              className="fa-solid fa-times text-white w-6 h-6 bg-red-500 rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => setRemoveOverlay(true)}
            ></i>
          </p>
        </div>
      )}
      {removeOverlay && (
        <div className="w-full h-full absolute flex flex-col justify-center items-center ">
          <div className="bg-default-100 p-10 rounded-md md:text-center max-w-[90vw]">
            <p className="text-primary text-2xl">
              Are you sure you want to remove{" "}
              <span className=" text-emphasis">{domain} </span>domain?
            </p>
            <p className="text-primary text-2xl">
              All data will be lost and you wont be able to get it back.
            </p>
            <div className="flex justify-end items-center gap-5 mt-5 md:justify-center">
              <Button onClick={() => setRemoveOverlay(false)}>Cancel</Button>
              <Button className="bg-red-500" onClick={() => handleDelete()}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Websites;
