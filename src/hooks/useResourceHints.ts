import { useEffect } from 'react';

export const useResourceHints = () => {
  useEffect(() => {
    const addResourceHints = () => {
      const hints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
        { rel: 'dns-prefetch', href: '//images.unsplash.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossOrigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
        { rel: 'preload', href: '/lovable-uploads/53c7547b-fc11-4442-b5f6-798e6e1aa08f.png', as: 'image' }
      ];

      hints.forEach(hint => {
        const existing = document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`);
        if (!existing) {
          const link = document.createElement('link');
          link.rel = hint.rel;
          link.href = hint.href;
          if (hint.crossOrigin) {
            link.crossOrigin = hint.crossOrigin;
          }
          document.head.appendChild(link);
        }
      });
    };

    addResourceHints();
  }, []);
};