import { ReactNode, FC } from "react";
import { HashLink } from "react-router-hash-link";

interface ItemProps {
  children: ReactNode;
  href: string;
  icon: string;
  className?: string;
}

const Item: FC<ItemProps> = ({ children, href, icon, className }) => {
  return (
    <HashLink
      to={href}
      className={`flex justify-start items-center gap-3 text-primary cursor-pointer whitespace-nowrap p-2 group hover:text-gray-300 transition-colors duration-300 ${className}`}
    >
      <i
        className={`fa-solid ${icon} group-hover:text-emphasis transition-colors duration-300 cursor-pointer w-4`}
      ></i>
      {children}
    </HashLink>
  );
};

export default Item;
