import Logo from '../assets/logo.png';

export default function Maintenance() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-default-200 text-center p-4">
      <img src={Logo} alt="Logo" className="w-24 mb-8" />
      <div className="p-8 rounded-2xl max-w-lg w-full text-base">
        <h1 className="text-4xl font-bold text-primary mb-4">
          We'll be back soon!
        </h1>
        <p className="text-xl text-secondary-100 mb-6">
          Our website is currently under maintenance.<br></br>
          Please be patient we will be back online ASAP.
        </p>
        <p className="text-xl text-secondary-100 mb-4">
          If you need to contact us, please reach out at
          <a
            href="mailto:support@example.com"
            className="text-emphasis"
          >
            {' '}
            clickpulse@support.com{' '}
          </a>
        </p>
      </div>
      <footer className="mt-8 text-base text-secondary-100">
        &copy; {new Date().getFullYear()} Clickpulse. All rights
        reserved.
      </footer>
    </div>
  );
}
