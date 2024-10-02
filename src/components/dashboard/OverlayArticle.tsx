import { FC, useEffect, useRef } from "react";
import { formatDuration, formatNumber } from "../../utils/dashboard/functions";

interface OverlayArticleProps {
  title: string | undefined;
  trackingTitle: any[string];
  trackingContent: any;
  close: () => void;
}

const OverlayArticle: FC<OverlayArticleProps> = ({
  title,
  trackingTitle,
  trackingContent,
  close,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close the modal if clicked outside the inner container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={modalRef} // Attach the ref to the inner container
        className="w-[90vw] h-[80vh] bg-default-100 rounded-md p-4 overflow-auto relative"
      >
        <div className="pb-4 mb-4 border-b border-secondary-200 flex justify-between items-center px-2">
          <h2 className="text-emphasis font-bold uppercase text-xl">{title}</h2>
          <i
            className="fa-solid fa-xmark fa-xl text-secondary-100 hover:text-emphasis transition-colors duration-200 ease-linear cursor-pointer"
            onClick={close}
          ></i>
        </div>
        <ul className="flex justify-between items-center overflow-auto px-2 py-1 rounded-sm">
          {trackingTitle.length != 0 &&
            trackingTitle.map((item: string, index: number) => (
              <li
                key={index}
                className="text-secondary-100 capitalize w-full text-right first:text-left"
              >
                {item.replace("_", " ")}
              </li>
            ))}
        </ul>
        <ul className="flex flex-col">
          {trackingContent.length != 0 &&
            trackingContent.map((item: any, index: any) => (
              <li
                key={index}
                className="flex justify-between items-center odd:bg-default-300 even:bg-default-100 px-2 py-1 rounded-sm"
              >
                {Object.entries(item).map(([key, value]: any) => (
                  <p
                    key={key}
                    className="text-primary w-full text-right first:text-left "
                  >
                    {formatOverlayContent(key, value, item.visits)}
                  </p>
                ))}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

function formatOverlayContent(type: string, value: number, visits: number) {
  if (type === "bounce_rate") {
    return ((value / visits) * 100).toFixed(1) + "%";
  } else if (type === "time_spent") {
    return formatDuration(Math.round(value / visits));
  } else if (type === "visits") {
    return formatNumber(visits);
  } else return value;
}

export default OverlayArticle;
