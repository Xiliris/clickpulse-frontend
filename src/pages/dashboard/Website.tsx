import { FC, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";

const MultiValue = lazy(() => import("../../components/dashboard/MultiValue"));
const SingleValue = lazy(() => import("../../components/dashboard/SingleValue"));

const Website: FC = () => {
  const { id } = useParams();

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-emphasis">Website</h1>

      <h1 className="text-emphasis text-3xl mt-5 mb-2">Total</h1>
      <div className="flex justify-between items-center w-1/2 border-2 border-emphasis p-5 rounded-lg">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <SingleValue id={id} request={"total-views"} date={"2024-08-06"} type={"views"} title={"Total Views"} />
        </Suspense>

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <SingleValue
            id={id}
            request={"total-views"}
            date={"2024-08-06"}
            type={"page_views"}
            title={"Total Page Views"}
          />
        </Suspense>

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <SingleValue id={id} request={"bounce-rate"} date={"2024-08-06"} type={"bounces"} title={"Bounce Rate"} />
        </Suspense>

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <SingleValue
            id={id}
            request={"session-duration"}
            date={"2024-08-06"}
            type={"duration"}
            title={"Avarage Visit Duration"}
          />
        </Suspense>
      </div>

      <h1 className="text-emphasis text-3xl mt-5 mb-2">Engagement Information</h1>
      <div className="flex justify-between items-center w-1/2 border-2 border-emphasis p-5 rounded-lg">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <MultiValue id={id} request={"entry-page"} type={"path"} title={"Entry Pages"} />
        </Suspense>

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <MultiValue id={id} request={"exit-page"} type={"path"} title={"Exit Pages"} />
        </Suspense>

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <MultiValue id={id} request={"visited-page"} type={"path"} title={"Visited Pages"} />
        </Suspense>
      </div>
      <h1 className="text-emphasis text-3xl mt-5 mb-2">Client Information</h1>
      <div className="flex justify-between items-center w-1/2 border-2 border-emphasis p-5 rounded-lg">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <MultiValue id={id} request={"devices"} type={"device"} title={"Devices"} />
        </Suspense>

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <MultiValue id={id} request={"browsers"} type={"browser"} title={"Browsers"} />
        </Suspense>

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <MultiValue id={id} request={"os"} type={"os"} title={"Operating Systems"} />
        </Suspense>
      </div>
    </main>
  );
};

export default Website;
