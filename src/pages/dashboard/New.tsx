import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import validateDomain from "../../utils/validateDomain";

import Navbar from "../../components/Navbar";
import Header from "../../components/header";
import Button from "../../components/form/Button";

const New: FC = () => {
  const domainRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  function handleNext() {
    const domain = domainRef.current?.value.toString();

    if (!domain) {
      setError("Domain is required");
      return;
    }

    const domainError = validateDomain(domain);
    if (domainError) {
      setError(domainError);
      return;
    }

    navigate("/dashboard/script", { state: { domain } });
  }

  return (
    <>
      <Navbar />
      <Header title="New" />
      <main className="mt-40 flex flex-col justify-center items-center w-[80%] m-auto">
        <div className="mt-10 flex flex-col justify-center items-start p-5 rounded-md border-2 border-primary">
          <h2 className="text-emphasis text-2xl">Website Details</h2>

          <p className="text-emphasis mt-5">Domain</p>
          <div className="w-full flex justify-start items-center border-2 border-primary rounded-md overflow-hidden">
            <p className="text-emphasis text-xl px-3 py-2 border-r-2 border-emphasis bg-secondary-200 font-medium">
              https://
            </p>
            <input
              type="text"
              placeholder="clickpulse.xyz"
              className="bg-transparent text-xl text-primary w-full px-3 py-2"
              ref={domainRef}
              onChange={() => setError(null)}
            />
          </div>

          {error && <p className="text-red-400 mt-3">{error}</p>}

          <Button className="p-2 mt-3" onClick={() => handleNext()}>
            Next
          </Button>
        </div>
      </main>
    </>
  );
};

export default New;
