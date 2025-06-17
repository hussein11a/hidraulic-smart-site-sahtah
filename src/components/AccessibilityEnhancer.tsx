
import React, { useEffect } from 'react';

interface AccessibilityEnhancerProps {
  isDarkMode: boolean;
}

const AccessibilityEnhancer: React.FC<AccessibilityEnhancerProps> = ({ isDarkMode }) => {
  
  useEffect(() => {
    // Enhanced keyboard navigation
    const handleKeyNavigation = (e: KeyboardEvent) => {
      // Skip links for keyboard users
      if (e.key === 'Tab' && !e.shiftKey) {
        const focusableElements = document.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // Reduced motion support
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReducedMotion = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01s');
      } else {
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
      }
    };

    // High contrast support
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    const handleHighContrast = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    };

    // Focus management
    const handleFocusVisible = () => {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-navigation');
        }
      });
      
      document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
      });
    };

    // Initialize
    document.addEventListener('keydown', handleKeyNavigation);
    mediaQuery.addEventListener('change', handleReducedMotion);
    highContrastQuery.addEventListener('change', handleHighContrast);
    handleFocusVisible();
    
    // Set initial states
    handleReducedMotion(mediaQuery as any);
    handleHighContrast(highContrastQuery as any);

    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'انتقل إلى المحتوى الرئيسي';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
    document.body.insertBefore(skipLink, document.body.firstChild);

    return () => {
      document.removeEventListener('keydown', handleKeyNavigation);
      mediaQuery.removeEventListener('change', handleReducedMotion);
      highContrastQuery.removeEventListener('change', handleHighContrast);
      if (skipLink.parentNode) {
        skipLink.parentNode.removeChild(skipLink);
      }
    };
  }, []);

  useEffect(() => {
    // Update ARIA attributes based on theme
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return null;
};

export default AccessibilityEnhancer;
