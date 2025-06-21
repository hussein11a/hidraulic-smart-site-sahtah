
import React, { useEffect, ReactNode } from 'react';

interface SecurityProviderProps {
  children: ReactNode;
}

const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  
  useEffect(() => {
    // Disable developer tools shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Console warning
    console.clear();
    console.log(
      '%c🚫 تحذير أمني!',
      'color: red; font-size: 30px; font-weight: bold;'
    );
    console.log(
      '%cهذا المحتوى محمي بحقوق الطبع والنشر.',
      'color: red; font-size: 14px; font-weight: bold;'
    );

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <>{children}</>;
};

export default SecurityProvider;
