import { DEVICE_ID, USER_ID } from '@/constants/auth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([DEVICE_ID, USER_ID]);

  useEffect(() => {
    if (
      router &&
      !router.asPath.includes('login') &&
      !router.asPath.includes('forgot-password')
    ) {
      if (!cookies.deviceId || !cookies.userId) {
        router.push('/login');
      }
    }
  }, [router, cookies]);

  return <>{children}</>;
};
