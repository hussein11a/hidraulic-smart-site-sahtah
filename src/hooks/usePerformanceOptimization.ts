
import { useEffect, useCallback } from 'react';

export const usePerformanceOptimization = () => {
  // Lazy loading for images
  const setupLazyLoading = useCallback(() => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }, []);

  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap';
    link.as = 'style';
    document.head.appendChild(link);
  }, []);

  // Optimize scroll performance
  const optimizeScrollPerformance = useCallback(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Handle scroll events efficiently
          const scrolled = window.scrollY;
          document.documentElement.style.setProperty('--scroll', scrolled.toString());
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setupLazyLoading();
    preloadCriticalResources();
    const cleanupScroll = optimizeScrollPerformance();

    return cleanupScroll;
  }, [setupLazyLoading, preloadCriticalResources, optimizeScrollPerformance]);

  return {
    setupLazyLoading,
    preloadCriticalResources,
    optimizeScrollPerformance
  };
};
