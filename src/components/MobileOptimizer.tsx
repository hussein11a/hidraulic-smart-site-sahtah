import React, { useEffect } from 'react';

interface MobileOptimizerProps {
  isDarkMode: boolean;
  isMobile: boolean;
}

const MobileOptimizer: React.FC<MobileOptimizerProps> = ({ isDarkMode, isMobile }) => {
  
  useEffect(() => {
    if (!isMobile) return;

    // Enhanced viewport management for mobile
    const setVhProperty = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Set safe area insets for modern mobile devices
      document.documentElement.style.setProperty('--safe-area-inset-top', 'env(safe-area-inset-top, 0px)');
      document.documentElement.style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom, 0px)');
    };

    // Advanced input zoom prevention
    const preventZoom = () => {
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
      }
      
      // Additional zoom prevention for iOS Safari
      document.addEventListener('gesturestart', (e) => e.preventDefault());
      document.addEventListener('gesturechange', (e) => e.preventDefault());
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

    // Enhanced mobile CSS optimizations
  useEffect(() => {
    if (!isMobile) return;

    const style = document.createElement('style');
    style.textContent = `
      /* Advanced mobile optimizations */
      * {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      /* Allow text selection for readable content */
      p, span, div[role="text"], h1, h2, h3, h4, h5, h6 {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
      
      body {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        /* Use safe area for padding */
        padding-top: var(--safe-area-inset-top);
        padding-bottom: var(--safe-area-inset-bottom);
      }
      
      /* Enhanced input styling for mobile */
      input, textarea, select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 0;
        font-size: 16px; /* Prevent zoom on iOS */
        /* Improve input performance */
        transform: translateZ(0);
        backface-visibility: hidden;
      }
      
      /* Improved touch targets */
      button, a, [role="button"] {
        min-height: 44px;
        min-width: 44px;
        /* Better tap response */
        touch-action: manipulation;
      }
      
      /* Enhanced sticky positioning */
      .mobile-sticky {
        position: -webkit-sticky;
        position: sticky;
        /* Improve sticky performance */
        will-change: transform;
        transform: translateZ(0);
      }
      
      /* Optimized text rendering */
      p, span, div, h1, h2, h3, h4, h5, h6 {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }
      
      /* Performance optimizations */
      .animate-element {
        will-change: transform, opacity;
        transform: translateZ(0);
      }
      
      /* Reduce motion for accessibility */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
      
      /* High contrast mode support */
      @media (prefers-contrast: high) {
        * {
          outline: 2px solid;
          outline-offset: 2px;
        }
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