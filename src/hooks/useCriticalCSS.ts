import { useEffect } from 'react';

export const useCriticalCSS = () => {
  useEffect(() => {
    const loadCriticalResources = () => {
      const criticalCSS = `
        /* Ultra-optimized critical styles for 100% PageSpeed scores */
        :root {
          font-synthesis: none;
          text-rendering: optimizeSpeed;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        * { 
          font-display: swap; 
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body { 
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Tajawal', sans-serif; 
          line-height: 1.6;
          overflow-x: hidden;
          contain: layout style paint;
        }
        
        /* Critical above-the-fold optimization */
        .hero-section {
          min-height: 100vh;
          contain: layout style paint;
          content-visibility: auto;
          contain-intrinsic-size: 100vw 100vh;
        }
        
        /* Prevent all layout shifts */
        img, video, iframe {
          width: 100%;
          height: auto;
          aspect-ratio: 16/9;
          object-fit: cover;
          display: block;
          contain: layout style size;
          content-visibility: auto;
        }
        
        /* LCP image optimization */
        .hero-image, .lcp-image {
          content-visibility: auto;
          contain-intrinsic-size: 1200px 800px;
          transform: translateZ(0);
          will-change: auto;
        }
        
        /* Ultra-fast loading states */
        .loading { 
          opacity: 0; 
          transform: translate3d(0, 10px, 0);
          will-change: opacity, transform;
        }
        
        .loaded { 
          opacity: 1; 
          transform: translate3d(0, 0, 0);
          transition: opacity 0.2s ease, transform 0.2s ease; 
          will-change: auto;
        }
        
        /* Placeholder skeleton with no shifts */
        .content-placeholder {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1s infinite ease-in-out;
          contain: strict;
        }
        
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        /* GPU acceleration for smooth performance */
        .gpu-accelerated {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        /* Fixed positioning optimization */
        .fixed-element {
          position: fixed;
          contain: layout style paint;
          transform: translateZ(0);
        }
        
        /* Scroll performance */
        .scroll-container {
          scroll-behavior: smooth;
          overscroll-behavior: contain;
        }
      `;
      
      const style = document.createElement('style');
      style.textContent = criticalCSS;
      document.head.appendChild(style);
    };

    loadCriticalResources();
  }, []);
};