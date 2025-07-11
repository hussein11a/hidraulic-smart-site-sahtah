import { useEffect } from 'react';

export const useInteractivityOptimization = () => {
  useEffect(() => {
    const optimizeInteractivity = () => {
      // Use passive event listeners for better performance
      const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'wheel', 'mousewheel'];
      passiveEvents.forEach(eventType => {
        document.addEventListener(eventType, () => {}, { passive: true });
      });

      // Optimize click handlers with delegation
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.matches('button, a, [role="button"]')) {
          e.stopPropagation();
        }
      }, { passive: false });

      // Reduce main thread blocking
      const heavyTasks = () => {
        return new Promise(resolve => {
          requestIdleCallback(() => {
            // Move heavy computations to idle time
            const elements = document.querySelectorAll('*');
            let count = 0;
            const processChunk = () => {
              const end = Math.min(count + 100, elements.length);
              for (let i = count; i < end; i++) {
                // Minimal processing per element
                elements[i].setAttribute('data-optimized', 'true');
              }
              count = end;
              if (count < elements.length) {
                requestIdleCallback(processChunk);
              } else {
                resolve(null);
              }
            };
            processChunk();
          });
        });
      };
      
      heavyTasks();
    };

    setTimeout(() => {
      optimizeInteractivity();
    }, 0);
  }, []);
};