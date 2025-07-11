
import React, { useEffect } from 'react';

interface AccessibilityEnhancerProps {
  isDarkMode: boolean;
}

const AccessibilityEnhancer: React.FC<AccessibilityEnhancerProps> = ({ isDarkMode }) => {
  
  useEffect(() => {
    // Advanced keyboard navigation with ARIA support
    const handleKeyNavigation = (e: KeyboardEvent) => {
      // Enhanced focusable elements selector
      const focusableElements = document.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      
      // Skip links navigation (Tab key)
      if (e.key === 'Tab') {
        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          } else if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        }
      }
      
      // Arrow key navigation for menu items
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        const currentElement = document.activeElement as HTMLElement;
        if (currentElement?.getAttribute('role') === 'menuitem') {
          e.preventDefault();
          const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]')) as HTMLElement[];
          const currentIndex = menuItems.indexOf(currentElement);
          
          let nextIndex = currentIndex;
          if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % menuItems.length;
          } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
          }
          
          menuItems[nextIndex]?.focus();
        }
      }
      
      // Escape key to close modals/dropdowns
      if (e.key === 'Escape') {
        const openModal = document.querySelector('[aria-modal="true"]');
        const openDropdown = document.querySelector('[aria-expanded="true"]');
        
        if (openModal) {
          const closeButton = openModal.querySelector('[aria-label*="close"], [aria-label*="إغلاق"]') as HTMLElement;
          closeButton?.click();
        } else if (openDropdown) {
          (openDropdown as HTMLElement).click();
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

    // Enhanced skip links with multiple options
    const skipLinksContainer = document.createElement('div');
    skipLinksContainer.className = 'sr-only focus-within:not-sr-only fixed top-0 left-0 z-50 p-2 bg-slate-900 text-white rounded-br-lg';
    skipLinksContainer.setAttribute('role', 'navigation');
    skipLinksContainer.setAttribute('aria-label', 'روابط التنقل السريع');
    
    const skipLinks = [
      { href: '#main-content', text: 'انتقل إلى المحتوى الرئيسي' },
      { href: '#services', text: 'انتقل إلى الخدمات' },
      { href: '#contact', text: 'انتقل إلى التواصل' }
    ];
    
    skipLinks.forEach((link, index) => {
      const skipLink = document.createElement('a');
      skipLink.href = link.href;
      skipLink.textContent = link.text;
      skipLink.className = 'block px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 rounded transition-colors';
      skipLink.setAttribute('tabindex', (index + 1).toString());
      skipLinksContainer.appendChild(skipLink);
    });
    
    document.body.insertBefore(skipLinksContainer, document.body.firstChild);

    return () => {
      document.removeEventListener('keydown', handleKeyNavigation);
      mediaQuery.removeEventListener('change', handleReducedMotion);
      highContrastQuery.removeEventListener('change', handleHighContrast);
      if (skipLinksContainer.parentNode) {
        skipLinksContainer.parentNode.removeChild(skipLinksContainer);
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
