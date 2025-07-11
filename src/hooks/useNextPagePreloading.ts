import { useEffect } from 'react';

export const useNextPagePreloading = () => {
  useEffect(() => {
    const preloadNextPageResources = () => {
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          const href = (link as HTMLAnchorElement).href;
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'prefetch';
          preloadLink.href = href;
          document.head.appendChild(preloadLink);
        }, { once: true });
      });
    };

    preloadNextPageResources();
  }, []);
};