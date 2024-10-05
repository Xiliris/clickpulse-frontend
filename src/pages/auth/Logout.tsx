import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { FC, useEffect } from 'react';

const Logout: FC = () => {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['token']);

  useEffect(() => {
    removeCookie('token', { path: '/' });

    navigate('/');
  }, [navigate, removeCookie]);

  return null;
};

export default Logout;
