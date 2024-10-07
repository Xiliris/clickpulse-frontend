import { FC } from "react";
import "./Spinner.scss";

interface SpinnerProps {
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <main className={`spinner-parent ${className}`}>
      <div className="spinner"></div>
    </main>
  );
};

export default Spinner;
