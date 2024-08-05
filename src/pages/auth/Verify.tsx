import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../modules/axiosInstance";

import Navbar from "../../components/Navbar";
import Header from "../../components/header";

import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import verifyCode from "../../utils/validateCode";

const Verify: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  async function verify() {
    const code = ref.current?.value;

    const verify = verifyCode(parseInt(code!));

    if (verify) {
      setErrorMessage(verify);
      return;
    }

    try {
      const response: any = await axiosInstance.post("/auth/verify", { code });

      if (response.status === 200) {
        navigate("/login");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error: any) {
      setErrorMessage(error.data);
    }
  }

  return (
    <>
      <Navbar />
      <Header title="Verify" />
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="border-2 border-secondary-200 rounded-md flex flex-col gap-5 p-6">
          <h1 className="text-primary text-2xl text-center">Verify</h1>
          <Input
            placeholder="Verification Code"
            type="number"
            name="code"
            ref={ref}
            onChange={() => setErrorMessage("")}
          />
          <p className="text-red-400">{errorMessage}</p>
          <Button className="ml-auto" onClick={() => verify()}>
            Verify
          </Button>
        </div>
      </div>
    </>
  );
};

export default Verify;
