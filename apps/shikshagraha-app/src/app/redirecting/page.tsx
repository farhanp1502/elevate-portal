'use client';
import React, { useEffect } from 'react';
import { Layout } from '@shared-lib';
import { useRouter } from 'next/navigation';
const Redirecting = () => {
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem('accToken');
    let userId: any = localStorage.getItem('userId');
    localStorage.clear();
    document.cookie =
      'accToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; SameSite=Lax';
    document.cookie.split(';').forEach((cookie: any) => {
      const name = cookie.split('=')[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    localStorage.setItem('userId', userId);
    router.replace('/');
  }, [router]);
  return (
    <>
      <Layout
        showTopAppBar={{
          title: 'Redirecting to login',
          showMenuIcon: true,
          showBackIcon: false,
        }}
        isFooter={false}
        showLogo={false}
        showBack={false}
      >
        Redirecting
      </Layout>
    </>
  );
};
export default Redirecting;
