// src/lib/nextjs-shim/router.tsx
// Adapter untuk fungsi router dari Next.js agar kompatibel dengan Astro
import { useState, useEffect } from 'react';

interface Route {
  pathname: string;
  asPath: string; // Tambahkan asPath sesuai dengan Next.js router
  query: Record<string, string | string[]>;
}

const useRouter = () => {
  const [route, setRoute] = useState<Route>({
    pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
    asPath: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/',
    query: typeof window !== 'undefined' 
      ? Object.fromEntries(
          new URLSearchParams(window.location.search).entries()
        ) 
      : {}
  });

  useEffect(() => {
    const handlePopState = () => {
      setRoute({
        pathname: window.location.pathname,
        asPath: window.location.pathname + window.location.search,
        query: Object.fromEntries(
          new URLSearchParams(window.location.search).entries()
        )
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return {
    ...route,
    push: (url: string) => {
      window.history.pushState({}, '', url);
      window.dispatchEvent(new PopStateEvent('popstate'));
    },
    replace: (url: string) => {
      window.history.replaceState({}, '', url);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };
};

export { useRouter };