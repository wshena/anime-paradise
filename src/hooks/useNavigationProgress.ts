'use client'

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

export const useNavigationProgress = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleDone = () => NProgress.done();

    // Listen to Next.js navigation events
    if (typeof window !== 'undefined') {
      // Simulate navigation events (Next.js 13+ doesn't have built-in events)
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;

      // Override pushState
      history.pushState = function (...args) {
        handleStart();
        return originalPushState.apply(this, args);
      };

      // Override replaceState
      history.replaceState = function (...args) {
        handleStart();
        return originalReplaceState.apply(this, args);
      };

      // Handle browser back/forward
      window.addEventListener('popstate', handleStart);
    }

    // Clean up on component unmount
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', handleStart);
        history.pushState = history.pushState;
        history.replaceState = history.replaceState;
      }
    };
  }, []);

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);
};