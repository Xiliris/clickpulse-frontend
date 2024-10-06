import Logo from '../../assets/logo.svg';
import Button from '../../components/form/Button';
import Input from '../../components/form/Input';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
  return (
    <>
      <Header title="Reset" />
      <main className="min-h-screen flex items-center justify-center bg-default-200">
        <div className="max-w-lg w-[90vw] space-y-10 bg-default-300 p-10 rounded-md">
          <Link
            to="/"
            className="text-emphasis cursor-pointer block text-xl"
          >
            <i className="fa-solid fa-arrow-left cursor-pointer"></i>
          </Link>
          <div className="text-center">
            <img
              className="mx-auto h-16 w-auto"
              src={Logo}
              alt="Logo"
            />
            <h2 className="mt-4 text-center text-2xl font-extrabold text-primary">
              Reset Your Password
            </h2>
            <p className="text-secondary-100 mb-6">
              Enter your email address below, and we'll send you a
              link to reset your password.
            </p>
          </div>
          <form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className="mb-4"
            />

            <div className="flex justify-end">
              <Button type="submit" className="text-center">
                Send
              </Button>
            </div>
          </form>
          <div className="mt-4 text-sm text-center">
            <Link
              to="/login"
              className="text-base text-emphasis hover:text-emphasis-light"
            >
              Back to Log In
            </Link>
          </div>
        </div>
      </main>
      <footer className="mt-8 text-base text-secondary-100 text-center">
        &copy; {new Date().getFullYear()} Clickpulse. All rights
        reserved.
      </footer>
    </>
  );
}
