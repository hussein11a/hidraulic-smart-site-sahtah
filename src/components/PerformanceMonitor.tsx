
import React, { useEffect } from 'react';

const PerformanceMonitor: React.FC = () => {
  
  useEffect(() => {
    // Monitor Core Web Vitals
    const reportWebVitals = () => {
      if ('PerformanceObserver' in window) {
        // Monitor Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log('LCP:', entry.startTime);
            // You can send this data to analytics
          }
        });

        // Monitor First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const fidEntry = entry as PerformanceEventTiming;
            const fid = fidEntry.processingStart - fidEntry.startTime;
            console.log('FID:', fid);
          }
        });

        // Monitor Cumulative Layout Shift (CLS)
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const clsEntry = entry as PerformanceEntry & { value?: number };
            if (clsEntry.value) {
              console.log('CLS:', clsEntry.value);
            }
          }
        });

        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
          fidObserver.observe({ entryTypes: ['first-input'] });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
          console.log('Performance monitoring not supported');
        }

        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      }
    };

    // Resource loading optimization
    const optimizeResources = () => {
      // Preload critical resources
      const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap'
      ];

      criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'style';
        document.head.appendChild(link);
      });

      // Lazy load non-critical images
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
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

        // Observe all images with data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    };

    // Memory usage monitoring
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memoryInfo = (performance as any).memory;
        console.log('Memory Usage:', {
          used: Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024) + ' MB',
          total: Math.round(memoryInfo.totalJSHeapSize / 1024 / 1024) + ' MB',
          limit: Math.round(memoryInfo.jsHeapSizeLimit / 1024 / 1024) + ' MB'
        });
      }
    };

    // Initialize monitoring
    const cleanup = reportWebVitals();
    optimizeResources();
    
    // Monitor memory every 30 seconds
    const memoryInterval = setInterval(monitorMemory, 30000);

    return () => {
      if (cleanup) cleanup();
      clearInterval(memoryInterval);
    };
  }, []);

  return null;
};

export default PerformanceMonitor;
