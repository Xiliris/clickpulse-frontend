import Button from "../form/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ReactNode, FC } from "react";

export default function Hero() {
  return (
    <section className="bg-default-100 py-12 px-4 h-screen">
      <div className="max-w-6xl mx-auto text-center h-full flex flex-col justify-center">
        <h2 className="relative text-4xl font-bold text-emphasis py-2 px-4 rounded-lg mb-12 pb-3">
          Our Pricing Plans
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-emphasis rounded-sm"></span>
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* Basic */}
          <div className="relative flex flex-col gap-4 p-4 w-76 bg-default-200 rounded-xl shadow-inner flex-grow">
            <div className="relative flex flex-col ">
              <span className="text-primary text-3xl">Free Plan</span>
              <p className="mt-1 text-secondary-100 text-4xl">Free</p>
            </div>
            <hr className=" border-secondary-200" />
            <ul className="flex flex-col gap-2 flex-grow">
              <PlanButton>Inf bas plana</PlanButton>
              <PlanButton>Inf bas plana</PlanButton>
              <PlanButton>Inf bas plana</PlanButton>
            </ul>
            <Button addClass="flex justify-between w-full">Upgrade now<FontAwesomeIcon icon={faArrowRight} /></Button>
          </div>

          {/* Premium */}
          <div className="relative flex flex-col gap-4 p-4 w-76 bg-default-200 rounded-xl shadow-inner flex-grow">
            <div className="relative flex flex-col ">
              <span className="text-primary text-3xl">Basic Plan</span>
              <p className="mt-1 text-secondary-100 text-4xl">$19.99</p>
            </div>
            <hr className="border-[#4C5366]" />
            <ul className="flex flex-col gap-2 flex-grow">
              <PlanButton>Inf bas plana</PlanButton>
              <PlanButton>Inf bas plana</PlanButton>
              <PlanButton>Inf bas plana</PlanButton>
              <PlanButton>Inf bas plana</PlanButton>
              <PlanButton>Inf bas plana</PlanButton>
              {/* Add more list items as needed */}
            </ul>
            <Button addClass="flex justify-between w-full">Upgrade now<FontAwesomeIcon icon={faArrowRight} /></Button>
          </div>

          {/* Premium + */}
          <div className="relative flex flex-col gap-4 p-4 w-76 bg-default-200 rounded-xl shadow-inner flex-grow">
            <div className="relative flex flex-col ">
              <span className="text-primary text-3xl">Premium Plan</span>
              <p className="mt-1 text-secondary-100 text-4xl">$39.99</p>
            </div>
            <hr className="border-[#4C5366]" />
            <ul className="flex flex-col gap-2 flex-grow">
              <PlanButton>Inf bas plana</PlanButton>
              <PlanButton>Inf bas plana</PlanButton>
              <PlanButton>Inf bas plana</PlanButton>
              <PlanButton>Inf bas plana</PlanButton>
              <PlanButton>Inf bas plana</PlanButton>
              <PlanButton>Inf bas plana</PlanButton>
              <PlanButton>Inf bas plana</PlanButton>
              {/* Add more list items as needed */}
            </ul>
            <Button addClass="flex justify-between w-full">Upgrade now<FontAwesomeIcon icon={faArrowRight} /></Button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ItemInterface {
  children: ReactNode
}

const PlanButton: FC<ItemInterface> = ({ children }) => {
  return (
    <li className="flex gap-2">
      <span className="flex items-center justify-center w-4 h-4 bg-emphasis rounded-full">
        <svg className="w-3 h-3 text-default-200" fill="currentColor" viewBox="0 0 16 16">
          <path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
        </svg>
      </span>
      <span className="text-primary text-sm">{children}</span>
    </li>
  )
}