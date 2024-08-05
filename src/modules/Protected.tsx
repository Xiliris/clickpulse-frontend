import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

interface ProtectedProps {
  children: ReactNode;
}

const Protected: FC<ProtectedProps> = ({ children }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  return <CookiesProvider>{children}</CookiesProvider>;
};

export default Protected;
