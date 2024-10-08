import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import { motion } from "framer-motion";
import axiosInstance from "../../modules/axiosInstance";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Button from "../../components/form/Button";

import validateDomain from "../../utils/form/validateDomain";
import { apiBaseUrl } from "../../../config.json";

const AddWebsite: FC = () => {
  const domainRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [domain, setDomain] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);

  const [copied, setCopied] = useState({
    border: "border-primary",
    color: "text-primary",
  });

  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  function handleNext() {
    const domainValue = domainRef.current?.value.toString();

    if (!domainValue) {
      setError("Domain is required");
      return;
    }

    const domainError = validateDomain(domainValue);
    if (domainError) {
      setError(domainError);
      return;
    }

    setDomain(domainValue);
    setStep(2);
  }

  function handleCopy() {
    navigator.clipboard.writeText(
      `<script defer type="module" data-domain="https://${domain}" src="${apiBaseUrl}/script.mjs"></script>`
    );

    setCopied({ border: "border-emphasis", color: "text-emphasis" });
  }

  async function handleDomainSubmission() {
    try {
      await axiosInstance.post("/dashboard/new", {
        token: cookies.token,
        domain: `https://${domain}`,
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
      setError(error.response.data);
    }
  }

  return (
    <CookiesProvider>
      <Navbar />
      <Header title="Add Website" />
      <main className="mt-40 flex flex-col justify-center items-center w-[80%] m-auto">
        {/* Steps in creating */}
        <div className="flex justify-center items-center mb-10 w-full max-w-lg">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex justify-center items-center rounded-full ${
                step === 1 ? "bg-emphasis text-white" : "bg-emphasis text-white"
              }`}
            >
              1
            </div>
          </div>

          <motion.div
            className="flex-grow h-1 bg-default-100 relative mx-4"
            initial={{ width: "0%" }}
            animate={{ width: step === 2 ? "100%" : "0%" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute top-0 left-0 h-full bg-emphasis"
              initial={{ width: "0%" }}
              animate={{ width: step === 2 ? "100%" : "0%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          <div className="flex flex-col items-center">
            <motion.div
              className={`w-10 h-10 flex justify-center items-center rounded-full ${
                step === 2 ? "text-white" : "text-primary"
              }`}
              initial={{ backgroundColor: "bg-default-100" }}
              animate={{
                backgroundColor: step === 2 ? "#3CBAB1" : "#252A34",
              }}
              transition={{
                delay: step === 2 ? 0.6 : 0,
                duration: 0.3,
              }}
            >
              2
            </motion.div>
          </div>
        </div>

        {/* Step 1: Domain Entry */}
        {step === 1 && (
          <div className="mt-12 flex bg-default-300 flex-col justify-center items-center max-w-lg mx-auto p-5 rounded-md">
            <h2 className="text-emphasis text-3xl font-semibold pb-4">
              Enter Website Domain
            </h2>

            <p className="text-primary text-lg text-center mb-6">
              Enter the domain of your website (e.g., clickpulse.xyz).
            </p>

            <div className="w-full flex justify-between items-center border border-secondary-100 rounded-lg overflow-hidden bg-transparent focus-within:border-emphasis transition-all">
              <span className="text-emphasis text-lg px-4 py-2 bg-default-100 font-medium h-full">
                https://
              </span>
              <input
                type="text"
                placeholder="clickpulse.xyz"
                className="bg-transparent text-xl text-primary w-full px-4 py-3 outline-none"
                ref={domainRef}
                onChange={() => setError(null)}
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
            )}

            <div className="w-full flex justify-end mt-5 p-2">
              <Button onClick={handleNext}>Next</Button>
            </div>
          </div>
        )}

        {/* Step 2: Script Copy */}
        {step === 2 && (
          <div className="mt-10 flex flex-col justify-center items-start p-5 rounded-md min-w-96">
            <h2 className="text-emphasis text-2xl mb-5">Website Details</h2>
            <p className="text-primary mb-1">
              Add script in <code>&lt;head&gt;</code> of your HTML document.
            </p>
            <p
              className={`w-full flex justify-start items-center border border-secondary-100 rounded-md overflow-hidden resize-none bg-transparent text-primary py-2 px-4 ${copied.border}`}
            >
              {`<script defer type="module" data-domain="https://${domain}" src="${apiBaseUrl}/script.mjs"></script>`}
              <i
                className={`fa-solid fa-copy ml-3 cursor-pointer ${copied.color}`}
                onClick={handleCopy}
              ></i>
            </p>
            {error && <p className="text-red-400 mt-3">{error}</p>}

            <Button
              className="p-2 mt-5 ml-auto"
              onClick={handleDomainSubmission}
            >
              Next
            </Button>
          </div>
        )}
      </main>
    </CookiesProvider>
  );
};

export default AddWebsite;
