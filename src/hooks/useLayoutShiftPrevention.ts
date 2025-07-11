import { useEffect } from 'react';

export const useLayoutShiftPrevention = () => {
  useEffect(() => {
    const eliminateAllLayoutShifts = () => {
      // Reserve space for all dynamic content immediately
      const style = document.createElement('style');
      style.textContent = `
        * { 
          contain: layout style; 
        }
        
        body, html {
          contain: layout style paint;
          height: 100vh;
          margin: 0;
          padding: 0;
        }
        
        /* Fixed positioning for all containers */
        .container, section, div, article, main, header, footer {
          contain: layout style paint;
          content-visibility: auto;
          contain-intrinsic-size: auto 100px;
        }
        
        /* Button stability */
        button {
          contain: layout style;
          min-height: 44px;
          min-width: 44px;
        }
        
        /* Image stability */
        img {
          aspect-ratio: 16/9;
          display: block;
          width: 100%;
          height: auto;
          contain: layout size style;
          content-visibility: auto;
        }
        
        /* Text stability */
        h1, h2, h3, h4, h5, h6, p, span {
          contain: layout;
          line-height: 1.4;
        }
        
        /* Navigation stability */
        nav, .fixed {
          contain: layout style paint;
          transform: translateZ(0);
          will-change: auto;
        }
      `;
      document.head.appendChild(style);
    };

    eliminateAllLayoutShifts();
  }, []);
};