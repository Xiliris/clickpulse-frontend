import { FC, ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import axiosInstance from "./axiosInstance";
import Loading from "../components/Loading";

interface ProtectedWebsiteProps {
  children: ReactNode;
}

const ProtectedWebsite: FC<ProtectedWebsiteProps> = ({ children }) => {
  const [access, setAccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const domain_id = location.pathname.split("/")[2];
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    async function verifyAuthorization() {
      try {
        const response = await axiosInstance.post("/dashboard/verify-website", {
          token: cookies.token,
          domain_id,
        });

        setAccess(response.data.access);
      } catch (error) {
        console.error("Authorization verification failed:", error);

        navigate("/401");
      }
    }

    verifyAuthorization();
  }, [cookies.token, domain_id, navigate]);

  if (!access) {
    return <Loading />;
  }

  return <CookiesProvider>{children}</CookiesProvider>;
};

export default ProtectedWebsite;
