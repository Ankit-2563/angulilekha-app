'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      router.push('/auth/login');
    }
  }, [router]);

  return <div>{children}</div>;
};

export default AuthLayout;
