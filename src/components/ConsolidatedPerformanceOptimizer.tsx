import React, { useEffect } from 'react';

const ConsolidatedPerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // Critical path optimization - immediate execution
    const optimizeCriticalPath = () => {
      // Preload critical fonts with highest priority
      const fontPreload = document.createElement('link');
      fontPreload.rel = 'preload';
      fontPreload.href = 'https://fonts.gstatic.com/s/tajawal/v11/Iura6YBj_oCad4k1nzGBC5xLhLE.woff2';
      fontPreload.as = 'font';
      fontPreload.type = 'font/woff2';
      fontPreload.crossOrigin = 'anonymous';
      fontPreload.fetchPriority = 'high';
      document.head.insertBefore(fontPreload, document.head.firstChild);

      // Optimize LCP image
      const lcpImage = document.querySelector('img[src*="53c7547b-fc11-4442-b5f6-798e6e1aa08f.png"]') as HTMLImageElement;
      if (lcpImage) {
        lcpImage.fetchPriority = 'high';
        lcpImage.loading = 'eager';
        lcpImage.decoding = 'sync';
        
        // Preload LCP image
        const imagePreload = document.createElement('link');
        imagePreload.rel = 'preload';
        imagePreload.as = 'image';
        imagePreload.href = lcpImage.src;
        imagePreload.fetchPriority = 'high';
        document.head.insertBefore(imagePreload, document.head.firstChild);
      }

      // Eliminate render-blocking CSS
      const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
      cssLinks.forEach(link => {
        const linkEl = link as HTMLLinkElement;
        if (linkEl.href.includes('fonts.googleapis.com')) {
          linkEl.media = 'print';
          linkEl.onload = () => { linkEl.media = 'all'; };
        }
      });
    };

    // Enhanced CLS prevention
    const preventLayoutShifts = () => {
      const style = document.createElement('style');
      style.textContent = `
        * { 
          contain: layout style; 
        }
        
        body, html {
          contain: layout style paint;
          height: 100vh;
          margin: 0;
          padding: 0;
        }
        
        .container, section, div, article, main, header, footer {
          contain: layout style paint;
          content-visibility: auto;
          contain-intrinsic-size: auto 100px;
        }
        
        button {
          contain: layout style;
          min-height: 44px;
          min-width: 44px;
        }
        
        img {
          aspect-ratio: 16/9;
          display: block;
          width: 100%;
          height: auto;
          contain: layout size style;
          content-visibility: auto;
        }
        
        nav, .fixed {
          contain: layout style paint;
          transform: translateZ(0);
          will-change: auto;
        }
      `;
      document.head.appendChild(style);
    };

    // Optimize interactivity
    const optimizeInteractivity = () => {
      // Use passive event listeners
      const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'wheel'];
      passiveEvents.forEach(eventType => {
        document.addEventListener(eventType, () => {}, { passive: true });
      });

      // Optimize click handlers
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.matches('button, a, [role="button"]')) {
          e.stopPropagation();
        }
      }, { passive: false });
    };

    // Service Worker registration
    const registerServiceWorker = () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Silent fail for service worker registration
        });
      }
    };

    // Real-time performance monitoring (lightweight)
    const monitorPerformance = () => {
      if ('PerformanceObserver' in window) {
        try {
          // Monitor LCP
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            if (lastEntry.startTime > 2500) {
              optimizeCriticalPath();
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // Monitor CLS
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            if (clsValue > 0.05) {
              preventLayoutShifts();
            }
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          // Silent fail for performance observers
        }
      }
    };

    // Execute all optimizations
    optimizeCriticalPath();
    preventLayoutShifts();
    optimizeInteractivity();
    registerServiceWorker();
    
    // Monitor performance after initial optimizations
    setTimeout(() => {
      monitorPerformance();
    }, 100);

    // Cleanup
    return () => {
      // Cleanup observers if needed
    };
  }, []);

  return null;
};

export default ConsolidatedPerformanceOptimizer;