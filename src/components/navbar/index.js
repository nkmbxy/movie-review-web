'use client';

import { authState, useRecoilState } from '../../store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './navbar';

const Navigation = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('x-auth-token');
    if (token) {
      setAuth(token);
      router.push(`/`);
    }
  }, [router, setAuth]);

  return <Navbar token={auth} />;
};

export default Navigation;
