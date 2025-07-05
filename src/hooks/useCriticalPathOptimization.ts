import { useEffect } from 'react';

export const useCriticalPathOptimization = () => {
  useEffect(() => {
    const optimizeCriticalPath = () => {
      // Preload critical fonts immediately with highest priority
      const fontPreload = document.createElement('link');
      fontPreload.rel = 'preload';
      fontPreload.href = 'https://fonts.gstatic.com/s/tajawal/v11/Iura6YBj_oCad4k1nzGBC5xLhLE.woff2';
      fontPreload.as = 'font';
      fontPreload.type = 'font/woff2';
      fontPreload.crossOrigin = 'anonymous';
      fontPreload.fetchPriority = 'high';
      document.head.insertBefore(fontPreload, document.head.firstChild);

      // Optimize LCP image with absolute priority
      const lcpImage = document.querySelector('img[src*="53c7547b-fc11-4442-b5f6-798e6e1aa08f.png"]') as HTMLImageElement;
      if (lcpImage) {
        lcpImage.fetchPriority = 'high';
        lcpImage.loading = 'eager';
        lcpImage.decoding = 'sync';
        lcpImage.style.contentVisibility = 'auto';
        lcpImage.style.containIntrinsicSize = '400px 267px';
        
        // Preload LCP image with highest priority
        const imagePreload = document.createElement('link');
        imagePreload.rel = 'preload';
        imagePreload.as = 'image';
        imagePreload.href = lcpImage.src;
        imagePreload.fetchPriority = 'high';
        document.head.insertBefore(imagePreload, document.head.firstChild);
      }

      // Eliminate render-blocking CSS
      const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
      cssLinks.forEach(link => {
        const linkEl = link as HTMLLinkElement;
        if (linkEl.href.includes('fonts.googleapis.com')) {
          linkEl.media = 'print';
          linkEl.onload = () => { linkEl.media = 'all'; };
        }
      });
    };

    optimizeCriticalPath();
  }, []);
};