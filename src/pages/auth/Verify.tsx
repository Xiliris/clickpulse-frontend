import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../modules/axiosInstance";

import Header from "../../components/header";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import verifyCode from "../../utils/validateCode";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

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
      const response: any = await axiosInstance.post("/auth/verify", {
        code,
      });

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
      <Header title="Verify" />
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-default-200 p-6">
        <div className="p-8 w-full max-w-md">
          <img src={Logo} alt="Logo" className="w-24 h-auto mx-auto mb-6" />
          <h1 className="text-primary text-2xl font-bold mb-4 text-center">Verify Your Code</h1>
          <Input
            placeholder="Enter Verification Code"
            type="number"
            name="code"
            ref={ref}
            onChange={() => setErrorMessage("")}
          />
          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
          <div className="flex justify-center ">
            <Button className="mt-4" onClick={() => verify()}>
              Verify
            </Button>
          </div>
          <div className="mt-4 justify-center flex">
            <Link to="/" className="text-base text-emphasis">
              <p className="cursor-pointer">Back to Home</p>
            </Link>
          </div>
        </div>
        <footer className="mt-8 text-base text-secondary-100">
          &copy; {new Date().getFullYear()} Clickpulse. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Verify;
