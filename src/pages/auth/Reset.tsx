import Logo from '../../assets/logo.png';
import Button from '../../components/form/Button';
import Input from '../../components/form/Input';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-default-200 text-center p-4">
      <img src={Logo} alt="Logo" className="w-24 mb-8" />
      <div className="p-8 rounded-2xl max-w-lg w-full text-xl">
        <h1 className="text-3xl font-bold text-primary mb-4">
          Reset Your Password
        </h1>
        <p className="text-secondary-100 mb-6">
          Enter your email address below, and we'll send you a link to
          reset your password.
        </p>
        <form className="flex flex-col items-center">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="mb-4"
          />
          <Button>Send</Button>
        </form>
        <div className="mt-4">
          <Link to="/login" className="text-base text-emphasis">
            <p className="cursor-pointer">Back to Log In</p>
          </Link>
        </div>
      </div>
      <footer className="mt-8 text-base text-secondary-100">
        &copy; {new Date().getFullYear()} Clickpulse. All rights
        reserved.
      </footer>
    </div>
  );
}
