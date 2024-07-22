import { FC } from "react";
import "./Loading.scss";

interface LoadingProps {
  height?: string;
}

const Loading: FC<LoadingProps> = ({ height }) => {
  return (
    <main className={`loading h-${height}`}>
      <div className="loader"></div>
    </main>
  );
};

export default Loading;
