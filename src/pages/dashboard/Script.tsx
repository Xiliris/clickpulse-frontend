import { FC, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../modules/axiosInstance";

import Navbar from "../../components/Navbar";
import Header from "../../components/header";
import Button from "../../components/form/Button";

import { websiteUrl } from "../../../config.json";

const Script: FC = () => {
  const [error, setError] = useState<string | null>(null);

  const [copied, setCopied] = useState({
    border: "border-primary",
    color: "text-primary",
  });
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const location = useLocation();
  const { domain } = location.state || {};

  function handleCopy() {
    navigator.clipboard.writeText(
      `<script defer data-domain="https://${domain}" src="${websiteUrl}/js/script.js"></script>`
    );

    setCopied({ border: "border-emphasis", color: "text-emphasis" });
  }

  async function handleDomain() {
    try {
      await axiosInstance.post("/dashboard/new", {
        token: cookies.token,
        domain: `https://${domain}`,
      });

      navigate("/dashboard");
    } catch (error: any) {
      setError(error.response.data);
    }
  }

  return (
    <CookiesProvider>
      <Navbar />
      <Header title="New" />
      <main className="mt-40 flex flex-col justify-center items-center w-[80%] m-auto">
        <div className="mt-10 flex flex-col justify-center items-start p-5 rounded-md border-2 border-primary min-w-96">
          <h2 className="text-emphasis text-2xl mb-5">Website Details</h2>
          <p className="text-primary mb-1">
            Add script in <head></head> of your html document.
          </p>
          <p
            className={`w-full flex justify-start items-center border-2 rounded-md overflow-hidden resize-none bg-transparent text-primary py-2 px-4 ${copied.border}`}
          >
            {`<script defer data-domain="${domain}" src="https://${websiteUrl}/js/script.js"></script>`}
            <i className={`fa-solid fa-copy ml-3 cursor-pointer ${copied.color}`} onClick={() => handleCopy()}></i>
          </p>
          {error && <p className="text-red-400 mt-3">{error}</p>}

          <Button className="p-2 mt-5 ml-auto" onClick={() => handleDomain()}>
            Next
          </Button>
        </div>
      </main>
    </CookiesProvider>
  );
};

export default Script;
