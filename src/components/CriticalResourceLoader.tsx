import React, { useEffect } from 'react';

const CriticalResourceLoader: React.FC = () => {
  useEffect(() => {
    // Preload critical resources immediately
    const preloadCriticalResources = () => {
      const criticalResources = [
        {
          href: '/lovable-uploads/53c7547b-fc11-4442-b5f6-798e6e1aa08f.png',
          as: 'image',
          importance: 'high'
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap',
          as: 'style',
          importance: 'high'
        }
      ];

      criticalResources.forEach(resource => {
        const existing = document.querySelector(`link[href="${resource.href}"]`);
        if (!existing) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = resource.href;
          link.as = resource.as;
          if (resource.importance) {
            link.setAttribute('importance', resource.importance);
          }
          if (resource.as === 'style') {
            link.onload = () => {
              link.rel = 'stylesheet';
            };
          }
          document.head.appendChild(link);
        }
      });
    };

    // Optimize font loading
    const optimizeFontLoading = () => {
      if ('fonts' in document) {
        // Preload system fonts fallback
        document.fonts.ready.then(() => {
          document.documentElement.classList.add('fonts-loaded');
        });
      }
    };

    // Reduce layout shifts with size hints
    const preventLayoutShifts = () => {
      const images = document.querySelectorAll('img:not([width]):not([height])');
      images.forEach(img => {
        const element = img as HTMLImageElement;
        if (!element.style.aspectRatio) {
          element.style.aspectRatio = '16/9'; // Default aspect ratio
        }
      });
    };

    preloadCriticalResources();
    optimizeFontLoading();
    preventLayoutShifts();

  }, []);

  return null;
};

export default CriticalResourceLoader;