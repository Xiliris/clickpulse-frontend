import { FC } from "react";
import { Helmet } from "react-helmet";

interface HeaderProps {
  title?: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title ? `Clickpulse - ${title}` : "Clickpulse"}</title>
    </Helmet>
  );
};

export default Header;
