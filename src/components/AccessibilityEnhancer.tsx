
import React, { useEffect } from 'react';

const AccessibilityEnhancer: React.FC = () => {
  useEffect(() => {
    // Enhanced keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    // Skip to main content link
    const addSkipLink = () => {
      const existingSkipLink = document.getElementById('skip-to-main');
      if (!existingSkipLink) {
        const skipLink = document.createElement('a');
        skipLink.id = 'skip-to-main';
        skipLink.href = '#main-content';
        skipLink.textContent = 'تخطي إلى المحتوى الرئيسي';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
        document.body.insertBefore(skipLink, document.body.firstChild);
      }
    };

    // ARIA labels for better screen reader support
    const enhanceARIA = () => {
      document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').forEach(button => {
        const text = button.textContent?.trim();
        if (text) {
          button.setAttribute('aria-label', text);
        }
      });

      document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])').forEach(input => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (label) {
          input.setAttribute('aria-labelledby', input.id + '-label');
          label.id = input.id + '-label';
        }
      });
    };

    // High contrast mode detection
    const handleHighContrast = () => {
      const mediaQuery = window.matchMedia('(prefers-contrast: high)');
      if (mediaQuery.matches) {
        document.body.classList.add('high-contrast');
      }
    };

    // Reduced motion support
    const handleReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        document.body.classList.add('reduced-motion');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    
    addSkipLink();
    enhanceARIA();
    handleHighContrast();
    handleReducedMotion();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return null;
};

export default AccessibilityEnhancer;
