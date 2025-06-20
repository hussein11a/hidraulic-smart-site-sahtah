
import React, { useEffect } from 'react';

const EnhancedPerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    const performanceOptimizer = {
      init() {
        this.optimizeImages();
        this.preloadCriticalResources();
        this.monitorPerformance();
      },
      
      optimizeImages() {
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
      },
      
      preloadCriticalResources() {
        const criticalResources = [
          '/src/main.tsx',
          '/src/index.css'
        ];
        
        criticalResources.forEach(resource => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = resource;
          link.as = resource.endsWith('.tsx') ? 'script' : 'style';
          document.head.appendChild(link);
        });
      },
      
      monitorPerformance() {
        if ('PerformanceObserver' in window) {
          try {
            const observer = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (entry.entryType === 'largest-contentful-paint') {
                  console.log('LCP:', entry.startTime);
                }
              }
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
          } catch (e) {
            console.log('Performance monitoring not supported');
          }
        }
      }
    };

    performanceOptimizer.init();

    // Service Worker registration
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return null;
};

export default EnhancedPerformanceOptimizer;
