import { useEffect } from 'react';

export const useAdvancedImageOptimization = () => {
  useEffect(() => {
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

      return () => {
        mutationObserver.disconnect();
      };
    };

    const cleanup = optimizeImages();
    return cleanup;
  }, []);
};