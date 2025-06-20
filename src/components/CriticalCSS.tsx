
import React, { useEffect } from 'react';

const CriticalCSS: React.FC = () => {
  useEffect(() => {
    const criticalCSS = `
      /* Critical path CSS for immediate rendering */
      * {
        font-family: 'Tajawal', 'Segoe UI', system-ui, -apple-system, Arial, sans-serif;
        font-display: swap;
      }
      
      html {
        font-size: 16px;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      
      body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        scroll-behavior: smooth;
        text-rendering: optimizeLegibility;
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        margin: 0;
        padding: 0;
        min-width: 100%;
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
      
      /* Desktop-first responsive container */
      .desktop-container {
        min-width: 1200px;
        width: 100%;
        margin: 0 auto;
        position: relative;
      }
      
      /* Enhanced loading animation */
      .loading {
        display: inline-block;
        width: 24px;
        height: 24px;
        border: 3px solid #f3f4f6;
        border-radius: 50%;
        border-top-color: #3b82f6;
        animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* Optimized scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(45deg, #3b82f6, #f59e0b);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-corner {
        background: rgba(0, 0, 0, 0.05);
      }
      
      /* Enhanced focus indicators for accessibility */
      *:focus-visible {
        outline: 2px solid #f59e0b;
        outline-offset: 2px;
        border-radius: 4px;
      }
      
      /* Prevent layout shift */
      img, video {
        max-width: 100%;
        height: auto;
        content-visibility: auto;
      }
      
      /* Professional desktop layout styles */
      @media screen and (max-width: 1199px) {
        body {
          transform-origin: top left;
          transform: scale(0.8);
          width: 125%;
          height: 125%;
        }
      }
      
      @media screen and (max-width: 767px) {
        body {
          transform: scale(0.6);
          width: 166.67%;
          height: 166.67%;
        }
      }
      
      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        body {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #f8fafc;
        }
      }
      
      /* Reduced motion for accessibility */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
      
      /* Touch optimization */
      button, a, [role="button"] {
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default CriticalCSS;
