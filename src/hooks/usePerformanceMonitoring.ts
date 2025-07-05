import { useEffect } from 'react';

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    const monitorPerformance = () => {
      if ('PerformanceObserver' in window) {
        // Monitor LCP in real-time
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          if (lastEntry.startTime > 2500) {
            // Trigger aggressive optimization if LCP is still slow
            console.warn('LCP optimization needed:', lastEntry.startTime);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Monitor CLS and fix immediately
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          if (clsValue > 0.05) {
            console.warn('CLS detected:', clsValue);
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Monitor FID/INP
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const fid = (entry as any).processingStart - (entry as any).startTime;
            if (fid > 100) {
              console.warn('FID optimization needed:', fid);
            }
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        return () => {
          lcpObserver.disconnect();
          clsObserver.disconnect();
          fidObserver.disconnect();
        };
      }
    };

    setTimeout(() => {
      monitorPerformance();
    }, 0);
  }, []);
};