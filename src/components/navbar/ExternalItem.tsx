import { ReactNode, FC } from "react";
interface ItemProps {
  children: ReactNode;
  href: string;
  icon: string;
  className?: string;
}

const ExternalItem: FC<ItemProps> = ({ children, href, icon, className }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex justify-start items-center gap-3 text-primary cursor-pointer whitespace-nowrap p-2 group hover:text-gray-300 transition-colors duration-300 ${className}`}
    >
      <i
        className={`fa-solid ${icon} group-hover:text-emphasis transition-colors duration-300 cursor-pointer w-4`}
      ></i>
      {children}
    </a>
  );
};

export default ExternalItem;
