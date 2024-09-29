import DesktopProfile from './DesktopProfile';
import { Link } from 'react-router-dom';
import Button from '../form/Button';

interface DesktopNavbarProps {
  user: any;
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ user }) => {
  return (
    <div className="w-full bg-default-200 py-4 shadow-lg z-40 relative mt-[64px]">
      <div className="flex absolute justify-between items-center w-[70vw] mx-auto">
        <div className="flex items-center space-x-8">
          <a
            href="#pricing" // Use href for scrolling to section
            className="hover:text-emphasis text-primary text-lg cursor-pointer"
          >
            Pricing
          </a>
        </div>
        <div className="flex items-center space-x-6">
          {user && user.username ? (
            <DesktopProfile user={user} />
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-emphasis text-primary text-lg cursor-pointer"
              >
                Log In
              </Link>
              <Link to="/signup">
                <Button>Sign In</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;
