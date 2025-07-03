
import React, { useEffect } from 'react';

const AdvancedPerformanceOptimizer: React.FC = () => {
  
  useEffect(() => {
    // Enhanced resource hints for better FCP and LCP
    const addResourceHints = () => {
      const hints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
        { rel: 'dns-prefetch', href: '//images.unsplash.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossOrigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
        { rel: 'preload', href: '/lovable-uploads/53c7547b-fc11-4442-b5f6-798e6e1aa08f.png', as: 'image' }
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

    // Enhanced critical resource loading with improved FCP and LCP
    const loadCriticalResources = () => {
      const criticalCSS = `
        /* Ultra-optimized critical styles for 100% PageSpeed scores */
        :root {
          font-synthesis: none;
          text-rendering: optimizeSpeed;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        * { 
          font-display: swap; 
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body { 
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Tajawal', sans-serif; 
          line-height: 1.6;
          overflow-x: hidden;
          contain: layout style paint;
        }
        
        /* Critical above-the-fold optimization */
        .hero-section {
          min-height: 100vh;
          contain: layout style paint;
          content-visibility: auto;
          contain-intrinsic-size: 100vw 100vh;
        }
        
        /* Prevent all layout shifts */
        img, video, iframe {
          width: 100%;
          height: auto;
          aspect-ratio: 16/9;
          object-fit: cover;
          display: block;
          contain: layout style size;
          content-visibility: auto;
        }
        
        /* LCP image optimization */
        .hero-image, .lcp-image {
          content-visibility: auto;
          contain-intrinsic-size: 1200px 800px;
          transform: translateZ(0);
          will-change: auto;
        }
        
        /* Ultra-fast loading states */
        .loading { 
          opacity: 0; 
          transform: translate3d(0, 10px, 0);
          will-change: opacity, transform;
        }
        
        .loaded { 
          opacity: 1; 
          transform: translate3d(0, 0, 0);
          transition: opacity 0.2s ease, transform 0.2s ease; 
          will-change: auto;
        }
        
        /* Placeholder skeleton with no shifts */
        .content-placeholder {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1s infinite ease-in-out;
          contain: strict;
        }
        
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        /* GPU acceleration for smooth performance */
        .gpu-accelerated {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        /* Fixed positioning optimization */
        .fixed-element {
          position: fixed;
          contain: layout style paint;
          transform: translateZ(0);
        }
        
        /* Scroll performance */
        .scroll-container {
          scroll-behavior: smooth;
          overscroll-behavior: contain;
        }
      `;
      
      const style = document.createElement('style');
      style.textContent = criticalCSS;
      document.head.appendChild(style);
    };

    // Ultra-optimized image loading
    const optimizeImages = () => {
      // Optimize existing images immediately
      const optimizeExistingImages = () => {
        document.querySelectorAll('img').forEach(img => {
          const imgElement = img as HTMLImageElement;
          
          // Add critical performance attributes
          if (!imgElement.loading) {
            imgElement.loading = 'lazy';
          }
          
          // Set fetchpriority for LCP images
          if (imgElement.src.includes('53c7547b-fc11-4442-b5f6-798e6e1aa08f.png')) {
            imgElement.fetchPriority = 'high';
            imgElement.loading = 'eager';
            imgElement.decoding = 'sync';
          } else {
            imgElement.decoding = 'async';
          }
          
          // Add proper dimensions to prevent CLS
          if (!imgElement.width || !imgElement.height) {
            imgElement.style.aspectRatio = '16/9';
            imgElement.style.width = '100%';
            imgElement.style.height = 'auto';
          }
          
          // Add containment for performance
          imgElement.style.contain = 'layout style';
        });
      };
      
      // Advanced lazy loading with intersection observer
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              
              if (img.dataset.src && !img.src) {
                // Optimize image URLs for better compression
                let optimizedSrc = img.dataset.src;
                
                if (optimizedSrc.includes('unsplash.com')) {
                  optimizedSrc += '&fm=webp&q=75&auto=format';
                }
                
                img.src = optimizedSrc;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
              }
            }
          });
        }, {
          rootMargin: '10px 0px',
          threshold: 0.01
        });

        // Observe all lazy images
        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
      
      // Run immediate optimization
      optimizeExistingImages();
      
      // Re-run when new images are added
      const mutationObserver = new MutationObserver(() => {
        optimizeExistingImages();
      });
      
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
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
