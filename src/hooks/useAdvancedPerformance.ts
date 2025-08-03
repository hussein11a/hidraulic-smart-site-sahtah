import { useEffect } from 'react';

export const useAdvancedPerformance = () => {
  useEffect(() => {
    // Critical performance optimizations
    const optimizePerformance = () => {
      // 1. Optimize images
      const optimizeImages = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
          }
          if (!img.hasAttribute('decoding')) {
            img.setAttribute('decoding', 'async');
          }
        });
      };

      // 2. Preload critical resources
      const preloadCriticalResources = () => {
        const criticalResources = [
          'https://fonts.gstatic.com/s/tajawal/v11/Iura6YBj_oCad4k1nzGBC5xLhLE.woff2',
          '/lovable-uploads/53c7547b-fc11-4442-b5f6-798e6e1aa08f.png'
        ];

        criticalResources.forEach(resource => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = resource;
          if (resource.includes('.woff2')) {
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
          } else {
            link.as = 'image';
          }
          document.head.appendChild(link);
        });
      };

      // 3. Enable passive listeners
      const enablePassiveListeners = () => {
        const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'wheel'];
        passiveEvents.forEach(event => {
          document.addEventListener(event, () => {}, { passive: true });
        });
      };

      // 4. Optimize CSS
      const optimizeCSS = () => {
        const style = document.createElement('style');
        style.textContent = `
          * {
            contain: layout style;
          }
          
          img, video {
            content-visibility: auto;
            contain-intrinsic-size: auto 300px;
          }
          
          .lazy-load {
            opacity: 0;
            transition: opacity 0.3s;
          }
          
          .lazy-load.loaded {
            opacity: 1;
          }
        `;
        document.head.appendChild(style);
      };

      // 5. Service Worker Registration
      const registerServiceWorker = () => {
        if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
          navigator.serviceWorker.register('/sw.js').catch(() => {});
        }
      };

      // Execute optimizations
      optimizeImages();
      preloadCriticalResources();
      enablePassiveListeners();
      optimizeCSS();
      registerServiceWorker();
    };

    // Run optimizations after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizePerformance);
    } else {
      optimizePerformance();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', optimizePerformance);
    };
  }, []);
};