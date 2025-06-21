
import React, { useEffect } from 'react';

const EnhancedPerformanceOptimizer: React.FC = () => {
  
  useEffect(() => {
    // Resource hints for better performance
    const addResourceHints = () => {
      const hints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//images.unsplash.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossOrigin: 'anonymous' }
      ];

      hints.forEach(hint => {
        const existing = document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`);
        if (!existing) {
          const link = document.createElement('link');
          link.rel = hint.rel;
          link.href = hint.href;
          if (hint.crossOrigin) {
            link.crossOrigin = hint.crossOrigin;
          }
          document.head.appendChild(link);
        }
      });
    };

    // Image optimization
    const optimizeImages = () => {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              
              if (img.dataset.src && !img.src) {
                if (img.dataset.src.includes('unsplash.com')) {
                  img.src = img.dataset.src + '&fm=webp&q=80';
                } else {
                  img.src = img.dataset.src;
                }
                
                img.classList.add('loaded');
                imageObserver.unobserve(img);
              }
            }
          });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    };

    // Service Worker registration
    const registerServiceWorker = () => {
      if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
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
    };

    addResourceHints();
    optimizeImages();
    registerServiceWorker();
  }, []);

  return null;
};

export default EnhancedPerformanceOptimizer;
