
import React, { useEffect, useState } from 'react';

const UXEnhancer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Page load indicator
    const handleLoad = () => {
      setIsLoading(false);
    };

    // Scroll to top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    // Enhanced touch interactions for mobile
    const enhanceTouchInteractions = () => {
      document.addEventListener('touchstart', (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON' || target.role === 'button') {
          target.style.transform = 'scale(0.95)';
        }
      });

      document.addEventListener('touchend', (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON' || target.role === 'button') {
          setTimeout(() => {
            target.style.transform = 'scale(1)';
          }, 100);
        }
      });
    };

    // Smooth scrolling for anchor links
    const setupSmoothScrolling = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector((this as HTMLAnchorElement).getAttribute('href')!);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    enhanceTouchInteractions();
    setupSmoothScrolling();

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all z-40"
          aria-label="العودة للأعلى"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default UXEnhancer;
