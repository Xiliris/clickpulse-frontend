import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { FC, useEffect } from 'react';

const Logout: FC = () => {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['token']);

  useEffect(() => {
    // Remove the cookie
    removeCookie('token', { path: '/' });

    // Navigate to the home page
    navigate('/');
  }, [navigate, removeCookie]);

  return null; // Return null as there is nothing to render
};

export default Logout;
