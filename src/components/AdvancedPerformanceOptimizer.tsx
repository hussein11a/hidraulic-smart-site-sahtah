
import React, { useEffect } from 'react';

const AdvancedPerformanceOptimizer: React.FC = () => {
  
  useEffect(() => {
    // Resource hints for better performance
    const addResourceHints = () => {
      const hints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
        { rel: 'dns-prefetch', href: '//images.unsplash.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossOrigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
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

    // Critical resource loading
    const loadCriticalResources = () => {
      const criticalCSS = `
        * { font-display: swap; }
        body { font-family: 'Tajawal', system-ui, sans-serif; }
        .loading { opacity: 0; }
        .loaded { opacity: 1; transition: opacity 0.3s ease; }
      `;
      
      const style = document.createElement('style');
      style.textContent = criticalCSS;
      document.head.appendChild(style);
    };

    // Image optimization
    const optimizeImages = () => {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              
              // Convert to WebP if supported
              if (img.dataset.src && !img.src) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (ctx && canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
                  // WebP is supported
                  if (img.dataset.src.includes('unsplash.com')) {
                    img.src = img.dataset.src + '&fm=webp&q=80';
                  } else {
                    img.src = img.dataset.src;
                  }
                } else {
                  img.src = img.dataset.src;
                }
                
                img.classList.add('loaded');
                imageObserver.unobserve(img);
              }
            }
          });
        }, {
          rootMargin: '50px 0px',
          threshold: 0.01
        });

        // Observe all images with data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    };

    // Service Worker registration for caching
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

    // Memory management
    const manageMemory = () => {
      // Clean up unused elements
      const cleanup = () => {
        const unusedElements = document.querySelectorAll('[data-cleanup="true"]');
        unusedElements.forEach(el => el.remove());
      };

      // Run cleanup every 5 minutes
      const cleanupInterval = setInterval(cleanup, 5 * 60 * 1000);
      
      return () => clearInterval(cleanupInterval);
    };

    // Preload next page resources
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

    // Initialize all optimizations
    addResourceHints();
    loadCriticalResources();
    optimizeImages();
    registerServiceWorker();
    const cleanupMemory = manageMemory();
    preloadNextPageResources();

    return cleanupMemory;
  }, []);

  return null;
};

export default AdvancedPerformanceOptimizer;
