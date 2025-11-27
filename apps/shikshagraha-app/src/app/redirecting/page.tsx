'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Redirecting = () => {
  const router = useRouter();
  useEffect(() => {
    // Clear authentication data immediately
    localStorage.removeItem('accToken');
    let userId: any = localStorage.getItem('userId');
    localStorage.clear();

    // Clear cookies
    document.cookie =
      'accToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; SameSite=Lax';
    document.cookie.split(';').forEach((cookie: any) => {
      const name = cookie.split('=')[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    // Restore userId if it exists
    if (userId) {
      localStorage.setItem('userId', userId);
    }

    // Redirect immediately to login page with unAuth parameter
    router.replace('/?unAuth=true');
  }, [router]);

  // Return null to prevent any UI from rendering
  return null;
};

export default Redirecting;
