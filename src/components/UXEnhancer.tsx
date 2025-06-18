
import React, { useEffect, useState } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';

interface UXEnhancerProps {
  isDarkMode: boolean;
}

const UXEnhancer: React.FC<UXEnhancerProps> = ({ isDarkMode }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    // Smooth scroll behavior
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    // Page loading indicator
    const handlePageTransition = () => {
      setIsPageLoading(true);
      setTimeout(() => setIsPageLoading(false), 500);
    };

    // Enhanced touch gestures for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;

      // Pull to refresh simulation
      if (diff < -100 && window.scrollY === 0) {
        document.body.style.paddingTop = '20px';
        document.body.style.background = isDarkMode ? 
          'linear-gradient(to bottom, #1e293b, #0f172a)' : 
          'linear-gradient(to bottom, #f8fafc, #e2e8f0)';
      }
    };

    const handleTouchEnd = () => {
      document.body.style.paddingTop = '0';
      document.body.style.background = '';
    };

    // Intersection Observer for animations
    const animateOnScroll = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
      });
    };

    // Progressive loading indicators
    const addLoadingStates = () => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          if (!button.disabled) {
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            
            const ripple = document.createElement('span');
            ripple.className = 'absolute inset-0 bg-white/20 rounded-full scale-0 animate-ping';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
          }
        });
      });
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Initialize
    animateOnScroll();
    addLoadingStates();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDarkMode]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Page Loading Indicator */}
      {isPageLoading && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-blue-500 to-amber-500">
          <div className="h-full bg-white/30 animate-pulse"></div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            isDarkMode 
              ? 'bg-slate-700 hover:bg-slate-600 text-white' 
              : 'bg-white hover:bg-slate-50 text-slate-800'
          }`}
          aria-label="العودة إلى الأعلى"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default UXEnhancer;
