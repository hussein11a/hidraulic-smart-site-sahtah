
import React, { useEffect } from 'react';

const EnhancedSecurity: React.FC = () => {
  useEffect(() => {
    const securityMeasures = {
      init() {
        this.disableDevTools();
        this.protectConsole();
        this.preventTextSelection();
        this.addWatermark();
      },
      
      disableDevTools() {
        document.addEventListener('keydown', (e) => {
          if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
            (e.ctrlKey && e.key === 'u')
          ) {
            e.preventDefault();
            return false;
          }
        });
      },
      
      protectConsole() {
        if (window.location.hostname !== 'localhost') {
          Object.defineProperty(console, 'log', { value: () => {} });
          Object.defineProperty(console, 'warn', { value: () => {} });
          Object.defineProperty(console, 'error', { value: () => {} });
          Object.defineProperty(console, 'info', { value: () => {} });
        }
      },
      
      preventTextSelection() {
        document.addEventListener('selectstart', (e) => e.preventDefault());
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        document.addEventListener('dragstart', (e) => e.preventDefault());
      },
      
      addWatermark() {
        console.log('%c🔐 محتوى محمي', 'color: #ff0000; font-size: 20px; font-weight: bold;');
        console.log('%cهذا الموقع محمي بحقوق الطبع والنشر', 'color: #ff0000; font-size: 14px;');
      }
    };

    securityMeasures.init();
  }, []);

  return null;
};

export default EnhancedSecurity;
