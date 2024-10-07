import Navbar from '../components/Navbar';
import Footer from '../components/home/Footer';

const EasyToUse = () => {
  const sections = [
    {
      title: 'Easy to Use: Experience Simplicity with Clickpulse',
      content: (
        <>
          At Clickpulse, we believe that powerful analytics should not
          come with a steep learning curve. Our platform is designed
          to be user-friendly and intuitive, allowing users of all
          skill levels to harness the full potential of their data
          without the hassle. Whether you're a business owner,
          marketer, or developer, Clickpulse provides an
          easy-to-navigate experience that gets you up and running in
          no time.
        </>
      ),
      icon: 'fa-solid fa-tasks',
    },
    {
      title: 'Intuitive Interface',
      content: (
        <>
          Our user interface is crafted with simplicity in mind. The
          dashboard is clean, organized, and visually appealing,
          enabling you to access critical metrics at a glance. With
          clearly labeled sections and straightforward navigation, you
          can easily find the data you need without getting lost in
          complex menus.
        </>
      ),
      icon: 'fa-solid fa-desktop',
    },
    {
      title: 'Seamless Integration',
      content: (
        <>
          Clickpulse integrates seamlessly with your existing tools
          and workflows. Whether you’re using popular CMS platforms,
          e-commerce solutions, or marketing software, our platform
          can be set up quickly with minimal effort. The
          straightforward integration process allows you to start
          collecting and analyzing data without the need for extensive
          technical expertise.
        </>
      ),
      icon: 'fa-solid fa-plug',
    },
    {
      title: 'Quick Setup',
      content: (
        <>
          Setting up Clickpulse is a breeze. Our step-by-step
          onboarding process guides you through the essentials,
          ensuring that you are ready to start tracking your analytics
          in no time. With clear instructions and helpful prompts, you
          won’t waste precious time figuring things out.
        </>
      ),
      icon: 'fa-solid fa-cogs',
    },
    {
      title: 'Real-Time Analytics',
      content: (
        <>
          Understanding your data is crucial for making informed
          decisions. Clickpulse provides real-time analytics that
          allow you to monitor performance and trends as they happen.
          Our intuitive graphs and charts make it easy to interpret
          data, enabling you to focus on what matters most—growing
          your business.
        </>
      ),
      icon: 'fa-solid fa-chart-line',
    },
    {
      title: 'Comprehensive Support Resources',
      content: (
        <>
          We know that sometimes you might need a little extra help.
          That’s why Clickpulse offers a wealth of support resources,
          including detailed documentation, tutorials, and FAQs. Our
          dedicated support team is also just a message away, ready to
          assist you with any questions or issues that may arise. We
          are committed to ensuring you have a smooth and successful
          experience.
        </>
      ),
      icon: 'fa-solid fa-life-ring',
    },
    {
      title: 'Customization Made Simple',
      content: (
        <>
          Clickpulse allows you to customize your analytics experience
          to meet your unique needs. With simple options for setting
          up goals, tracking conversions, and generating reports, you
          can tailor your dashboard to focus on the metrics that
          matter most to your business. This flexibility ensures that
          you get the insights you need without unnecessary clutter.
        </>
      ),
      icon: 'fa-solid fa-sliders-h',
    },
    {
      title: 'Mobile-Friendly Experience',
      content: (
        <>
          In today’s fast-paced world, having access to your analytics
          on the go is essential. Clickpulse is designed to be
          mobile-friendly, allowing you to view your data anytime,
          anywhere. Whether you’re in the office or out and about, you
          can stay updated on your performance with ease.
        </>
      ),
      icon: 'fa-solid fa-mobile-alt',
    },
    {
      title: 'User Feedback-Driven Development',
      content: (
        <>
          At Clickpulse, we continuously seek user feedback to enhance
          our platform. We listen to your suggestions and regularly
          implement improvements to ensure our analytics tools remain
          user-friendly and effective. Your experience matters to us,
          and we strive to provide the best tools for your analytics
          needs.
        </>
      ),
      icon: 'fa-solid fa-comments',
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

export default EasyToUse;
