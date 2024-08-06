import Logo from '../assets/logo.png';

export default function Maintenance() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-default-200 text-center p-4">
      <img src={Logo} alt="Logo" className="mb-8 sm:w-32 w-24" />
      <div className="p-4 sm:p-8 rounded-2xl max-w-lg w-full text-base">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
          We'll be back soon!
        </h1>
        <p className="text-lg sm:text-xl text-secondary-100 mb-6">
          Our website is currently under maintenance.<br></br>
          Please be patient we will be back online ASAP.
        </p>
        <p className="text-lg sm:text-xl text-secondary-100 mb-4">
          If you need to contact us, please reach out at
          <a
            href="mailto:clickpulse.service@gmail.com"
            target="_blank"
            rel="opener noopener"
            className="text-emphasis cursor-pointer"
          >
            {' '}
            <br />
            clickpulse.service@gmail.com
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
