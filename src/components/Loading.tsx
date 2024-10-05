import { FC } from "react";
import "./Loading.scss";

const Loading: FC = () => {
  return (
    <main className={`loading w-screen h-screen`}>
      <div className="loader"></div>
    </main>
  );
};

export default Loading;
