import Logo from "../../public/logo.png";

export default function Maintenance() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-default-200 text-center p-4">
      <img src={Logo} alt="Logo" className="w-24 mb-8" />
      <div className=" p-8 rounded-2xl max-w-lg w-full">
        <h1 className="text-3xl font-bold text-primary mb-4">We'll be back soon!</h1>
        <p className="text-secondary-100 mb-6">
          Our website is currently under maintenance.<br></br>
          Please be patient we will be back online ASAP.
        </p>
        <p className="text-secondary-100 mb-4">
          If you need to contact us, please reach out at
          <a href="mailto:support@example.com" className="text-emphasis"> clickpulse@support.com </a>
        </p>
      </div>
      <footer className="mt-8 text-secondary-100">
        &copy; {new Date().getFullYear()} Clickpulse. All rights reserved.
      </footer>
    </div>
  );
}