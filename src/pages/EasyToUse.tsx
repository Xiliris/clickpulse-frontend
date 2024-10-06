import Navbar from '../components/Navbar';
import Footer from '../components/home/Footer';

const EasyToUse = () => {
  const sections = [
    {
      title: 'Easy to Use: Experience Simplicity with ClickPulse',
      content: (
        <>
          At ClickPulse, we believe that powerful analytics should not
          come with a steep learning curve. Our platform is designed
          to be user-friendly and intuitive, allowing users of all
          skill levels to harness the full potential of their data
          without the hassle. Whether you're a business owner,
          marketer, or developer, ClickPulse provides an
          easy-to-navigate experience that gets you up and running in
          no time.
        </>
      ),
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
    },
    {
      title: 'Seamless Integration',
      content: (
        <>
          ClickPulse integrates seamlessly with your existing tools
          and workflows. Whether you’re using popular CMS platforms,
          e-commerce solutions, or marketing software, our platform
          can be set up quickly with minimal effort. The
          straightforward integration process allows you to start
          collecting and analyzing data without the need for extensive
          technical expertise.
        </>
      ),
    },
    {
      title: 'Quick Setup',
      content: (
        <>
          Setting up ClickPulse is a breeze. Our step-by-step
          onboarding process guides you through the essentials,
          ensuring that you are ready to start tracking your analytics
          in no time. With clear instructions and helpful prompts, you
          won’t waste precious time figuring things out.
        </>
      ),
    },
    {
      title: 'Real-Time Analytics',
      content: (
        <>
          Understanding your data is crucial for making informed
          decisions. ClickPulse provides real-time analytics that
          allow you to monitor performance and trends as they happen.
          Our intuitive graphs and charts make it easy to interpret
          data, enabling you to focus on what matters most—growing
          your business.
        </>
      ),
    },
    {
      title: 'Comprehensive Support Resources',
      content: (
        <>
          We know that sometimes you might need a little extra help.
          That’s why ClickPulse offers a wealth of support resources,
          including detailed documentation, tutorials, and FAQs. Our
          dedicated support team is also just a message away, ready to
          assist you with any questions or issues that may arise. We
          are committed to ensuring you have a smooth and successful
          experience.
        </>
      ),
    },
    {
      title: 'Customization Made Simple',
      content: (
        <>
          ClickPulse allows you to customize your analytics experience
          to meet your unique needs. With simple options for setting
          up goals, tracking conversions, and generating reports, you
          can tailor your dashboard to focus on the metrics that
          matter most to your business. This flexibility ensures that
          you get the insights you need without unnecessary clutter.
        </>
      ),
    },
    {
      title: 'Mobile-Friendly Experience',
      content: (
        <>
          In today’s fast-paced world, having access to your analytics
          on the go is essential. ClickPulse is designed to be
          mobile-friendly, allowing you to view your data anytime,
          anywhere. Whether you’re in the office or out and about, you
          can stay updated on your performance with ease.
        </>
      ),
    },
    {
      title: 'User Feedback-Driven Development',
      content: (
        <>
          At ClickPulse, we continuously seek user feedback to enhance
          our platform. We listen to your suggestions and regularly
          implement improvements to ensure our analytics tools remain
          user-friendly and effective. Your experience matters to us,
          and we strive to provide the best tools for your analytics
          needs.
        </>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-default-200 min-h-screen py-10">
        <div className="w-[70vw] mx-auto mt-24 grid md:grid-cols-1 grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="text-default-100 p-4 rounded-lg w-fit"
            >
              <h2 className="text-2xl font-semibold text-emphasis">
                {section.title}
              </h2>
              <p className="text-primary mt-2">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EasyToUse;
