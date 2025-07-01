import React, { useEffect } from 'react';

interface MobileOptimizerProps {
  isDarkMode: boolean;
  isMobile: boolean;
}

const MobileOptimizer: React.FC<MobileOptimizerProps> = ({ isDarkMode, isMobile }) => {
  
  useEffect(() => {
    if (!isMobile) return;

    // Fix viewport height issues on mobile
    const setVhProperty = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Prevent zoom on input focus
    const preventZoom = () => {
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }
    };

    // Optimize touch events
    const optimizeTouchEvents = () => {
      // Prevent context menu on long press for buttons
      const buttons = document.querySelectorAll('button, a');
      buttons.forEach(button => {
        button.addEventListener('contextmenu', (e) => {
          e.preventDefault();
        }, { passive: false });
      });

      // Add touch feedback
      const touchElements = document.querySelectorAll('button, a, [role="button"]');
      touchElements.forEach(element => {
        const htmlElement = element as HTMLElement;
        htmlElement.addEventListener('touchstart', () => {
          htmlElement.style.transform = 'scale(0.98)';
          htmlElement.style.opacity = '0.8';
        }, { passive: true });

        htmlElement.addEventListener('touchend', () => {
          setTimeout(() => {
            htmlElement.style.transform = '';
            htmlElement.style.opacity = '';
          }, 150);
        }, { passive: true });
      });
    };

    // Fix scroll performance on mobile
    const optimizeScrolling = () => {
      document.body.style.overflow = 'auto';
      (document.body.style as any).webkitOverflowScrolling = 'touch';
      
      // Reduce animation frequency on scroll
      let ticking = false;
      const updateScrollEffects = () => {
        // Debounce scroll effects
        ticking = false;
      };

      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(updateScrollEffects);
          ticking = true;
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    };

    // Initialize optimizations
    setVhProperty();
    preventZoom();
    optimizeTouchEvents();
    const cleanupScroll = optimizeScrolling();

    // Update vh on resize
    window.addEventListener('resize', setVhProperty);
    window.addEventListener('orientationchange', setVhProperty);

    return () => {
      window.removeEventListener('resize', setVhProperty);
      window.removeEventListener('orientationchange', setVhProperty);
      if (cleanupScroll) cleanupScroll();
    };
  }, [isMobile]);

  // Add mobile-specific CSS
  useEffect(() => {
    if (!isMobile) return;

    const style = document.createElement('style');
    style.textContent = `
      /* Mobile-specific optimizations */
      * {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
      }
      
      body {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      
      /* Fix mobile input styling */
      input, textarea, select {
        -webkit-appearance: none;
        border-radius: 0;
        font-size: 16px; /* Prevent zoom on iOS */
      }
      
      /* Improve button touch targets */
      button, a {
        min-height: 44px;
        min-width: 44px;
      }
      
      /* Fix sticky positioning issues on mobile */
      .mobile-sticky {
        position: -webkit-sticky;
        position: sticky;
      }
      
      /* Optimize text rendering on mobile */
      p, span, div {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [isMobile]);

  return null;
};

export default MobileOptimizer;