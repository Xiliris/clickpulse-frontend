export default function Hero() {
  const statistics = [
    { name: "Unique Visitors", description: "You had XXX Unique Visitors this month." },
    { name: "Total Visitors", description: "You had XXX Total Visitors this month." },
    { name: "Total Page views", description: "You had XXX Total page views this month." },
    { name: "Bounce Rate", description: "Your bounce rate this month was XXX" },
    { name: "Visit Duration", description: "Visit durations avg this month XXX" },
    { name: "Top Sources", description: "Came from FB, IG, Directly, ...." },
    { name: "Top Pages Visited", description: "Register, Login, ...." },
    { name: "Avg loading time", description: "Pages avg loading time was XXX" },
    { name: "HH", description: "Description for HH" },
  ];

  return (
    <section className="bg-default-200 py-12 px-4 h-screen z-10 mt-7">
      <div className="max-w-6xl mx-auto text-center relative">
        <h2 className="relative text-4xl font-bold text-emphasis py-2 px-4 rounded-lg pb-3">
          Tracking
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-emphasis rounded-sm"></span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-default-100 p-6 rounded-lg shadow-md h-40 flex flex-col">
              <h4 className="text-xl font-semibold text-emphasis mb-4">{stat.name}</h4>
              <p className="text-sm text-primary">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}