import React, { useEffect } from 'react';

const LayoutShiftPrevention: React.FC = () => {
  useEffect(() => {
    // Add size containers for dynamic content
    const addSizeContainers = () => {
      const dynamicElements = document.querySelectorAll('[data-dynamic-content]');
      dynamicElements.forEach(element => {
        const el = element as HTMLElement;
        if (!el.style.minHeight) {
          el.style.minHeight = '200px'; // Prevent collapse
        }
      });
    };

    // Observe and fix layout shifts
    const observeLayoutShifts = () => {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'layout-shift') {
                const shift = entry as any;
                if (shift.value > 0.1 && !shift.hadRecentInput) {
                  console.warn('Large layout shift detected:', shift.value);
                }
              }
            }
          });

          observer.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
          console.log('Layout shift observation not supported');
        }
      }
    };

    // Stabilize image dimensions
    const stabilizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.width || !img.height) {
          img.style.aspectRatio = '16/9';
          img.style.objectFit = 'cover';
        }
        
        // Add loading placeholder
        if (!img.complete) {
          img.style.backgroundColor = 'hsl(var(--muted))';
          img.onload = () => {
            img.style.backgroundColor = 'transparent';
          };
        }
      });
    };

    // Reserve space for dynamic content
    const reserveSpaceForContent = () => {
      const containers = document.querySelectorAll('.container');
      containers.forEach(container => {
        const el = container as HTMLElement;
        el.style.containIntrinsicSize = 'auto 500px';
        el.style.contentVisibility = 'auto';
      });
    };

    addSizeContainers();
    observeLayoutShifts();
    stabilizeImages();
    reserveSpaceForContent();

    // Re-run on content changes
    const mutationObserver = new MutationObserver(() => {
      stabilizeImages();
      addSizeContainers();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      mutationObserver.disconnect();
    };
  }, []);

  return null;
};

export default LayoutShiftPrevention;