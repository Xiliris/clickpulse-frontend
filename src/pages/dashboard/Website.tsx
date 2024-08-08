import { FC, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";

const MultiValue = lazy(() => import("../../components/dashboard/MultiValue"));
const SingleValue = lazy(() => import("../../components/dashboard/SingleValue"));

const Website: FC = () => {
  const { id } = useParams();

  const today = new Date().toISOString().slice(0, 10);

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-emphasis">Website</h1>

      <Container title="Total">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <SingleValue id={id} request={"total-views"} date={today} type={"views"} title={"Total Views"} />
        </Suspense>

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <SingleValue id={id} request={"total-views"} date={today} type={"page_views"} title={"Total Page Views"} />
        </Suspense>

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <SingleValue id={id} request={"bounce-rate"} date={today} type={"bounces"} title={"Bounce Rate"} />
        </Suspense>

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <SingleValue
            id={id}
            request={"session-duration"}
            date={today}
            type={"duration"}
            title={"Avarage Visit Duration"}
          />
        </Suspense>
      </Container>

      <Container title="Engagement Information">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <MultiValue id={id} request={"entry-page"} type={"path"} title={"Entry Pages"} />
        </Suspense>

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <MultiValue id={id} request={"exit-page"} type={"path"} title={"Exit Pages"} />
        </Suspense>

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <MultiValue id={id} request={"visited-page"} type={"path"} title={"Visited Pages"} />
        </Suspense>
      </Container>
      <Container title="Client Information">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <MultiValue id={id} request={"devices"} type={"device"} title={"Devices"} />
        </Suspense>

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <MultiValue id={id} request={"browsers"} type={"browser"} title={"Browsers"} />
        </Suspense>

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <MultiValue id={id} request={"os"} type={"os"} title={"Operating Systems"} />
        </Suspense>
      </Container>
    </main>
  );
};

interface ContainerProps {
  children: React.ReactNode;
  title?: string;
}

const Container: FC<ContainerProps> = ({ children, title }) => {
  return (
    <>
      <h1 className="text-emphasis text-3xl mt-5 mb-2">{title}</h1>
      <div className="flex justify-between items-center w-1/2 border-2 border-emphasis p-5 rounded-lg">{children}</div>
    </>
  );
};

export default Website;
