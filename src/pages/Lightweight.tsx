import Navbar from '../components/Navbar';
import Footer from '../components/home/Footer';

const Lightweight = () => {
  const sections = [
    {
      title: 'Our Offering: Lightweight Script',
      content: (
        <>
          At Clickpulse, we are committed to providing you with
          powerful analytics tools that respect your users' privacy
          while being incredibly easy to implement and use. One of our
          standout features is our lightweight script, designed to
          optimize your website's performance and user experience.
        </>
      ),
      icon: 'fa-solid fa-code',
    },
    {
      title: 'Why Choose a Lightweight Script?',
      content: (
        <>
          In today's fast-paced digital world, website performance is
          crucial for maintaining user engagement and satisfaction. A
          lightweight script means that your website loads faster.
          This is essential not only for user experience but also for
          SEO rankings. Search engines prioritize fast-loading pages,
          which can significantly impact your visibility and traffic.
        </>
      ),
      icon: 'fa-solid fa-bolt',
    },
    {
      title: 'Seamless Integration',
      content: (
        <>
          Our script can be effortlessly integrated into any website,
          regardless of its size or complexity. Whether you're running
          a simple blog or a large e-commerce platform, our
          lightweight solution ensures that adding analytics
          capabilities won’t disrupt your site's functionality. This
          simplicity in integration allows you to get started quickly
          without any technical hassles.
        </>
      ),

      icon: `fa-solid fa-cogs`,
    },
    {
      title: 'Minimized Impact on Performance',
      content: (
        <>
          Unlike heavier analytics solutions that can slow down your
          site, Clickpulse's lightweight script is optimized for speed
          and efficiency. This means less loading time, a lower bounce
          rate, and higher conversion rates. Users can interact with
          your content without the lag that often accompanies more
          bloated analytics systems.
        </>
      ),
      icon: 'fa-solid fa-chart-line',
    },
    {
      title: 'Mobile Optimization',
      content: (
        <>
          With a significant amount of web traffic coming from mobile
          devices, having a lightweight script is even more critical.
          Our solution is not only lightweight on desktops but also
          optimized for mobile, ensuring that users experience fast
          load times on their smartphones and tablets. This
          mobile-friendly approach caters to the growing number of
          users who browse and shop on-the-go.
        </>
      ),

      icon: 'fa-solid fa-mobile-alt',
    },
    {
      title: 'Reduced Data Transfer',
      content: (
        <>
          Our lightweight script minimizes the amount of data
          transferred between the server and the client. This
          reduction in data usage is not only beneficial for your
          website’s performance but also for users with limited
          bandwidth or data plans. By using Clickpulse, you’re
          contributing to a more efficient internet by reducing
          unnecessary data consumption.
        </>
      ),
      icon: 'fa-solid fa-plug',
    },
    {
      title: 'Real-Time Insights',
      content: (
        <>
          With our lightweight script, you can access real-time
          analytics without compromising speed. Get immediate feedback
          on user behavior, traffic sources, and engagement levels,
          allowing you to make informed decisions swiftly. The faster
          your analytics load, the quicker you can react to trends and
          adjust your strategies.
        </>
      ),
      icon: `fa-solid fa-sync-alt`,
    },
    {
      title: 'Future-Proofing Your Site',
      content: (
        <>
          As web technologies evolve, so does the need for agility and
          performance. A lightweight script ensures that your website
          can adapt to future changes in technology and user
          expectations without needing a complete overhaul. You can
          scale your analytics needs as your business grows, all while
          maintaining optimal performance.
        </>
      ),
      icon: ' fa-solid fa-shield',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-default-200 min-h-screen py-10">
        <div className="w-[70vw] mx-auto mt-24 grid lg:grid-cols-1 grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-default-300 p-6 rounded-md"
            >
              <div className="flex items-center mb-4">
                <i
                  className={`${section.icon} text-3xl text-emphasis mr-4`}
                ></i>
                <h2 className="text-2xl font-semibold text-emphasis">
                  {section.title}
                </h2>
              </div>
              <p className="text-primary">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Lightweight;
