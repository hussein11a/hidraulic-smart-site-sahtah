
import React from 'react';

interface FloatingElementsProps {
  isDarkMode: boolean;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ isDarkMode }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating truck icons */}
      <div className="absolute top-20 left-10 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '0s' }}>
        🚛
      </div>
      <div className="absolute top-60 right-20 text-3xl opacity-15 animate-bounce" style={{ animationDelay: '1s' }}>
        🔧
      </div>
      <div className="absolute bottom-40 left-20 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '2s' }}>
        ⚡
      </div>
      <div className="absolute bottom-20 right-40 text-3xl opacity-15 animate-bounce" style={{ animationDelay: '3s' }}>
        🛡️
      </div>
      
      {/* Geometric shapes */}
      <div className={`absolute top-32 right-32 w-20 h-20 rounded-full opacity-20 animate-pulse ${
        isDarkMode ? 'bg-amber-400' : 'bg-blue-400'
      }`} style={{ animationDelay: '0.5s' }}></div>
      <div className={`absolute bottom-32 left-32 w-16 h-16 rounded-full opacity-25 animate-pulse ${
        isDarkMode ? 'bg-blue-400' : 'bg-green-400'
      }`} style={{ animationDelay: '1.5s' }}></div>
      
      {/* Moving lines */}
      <div className={`absolute top-1/2 left-0 w-full h-px opacity-10 ${
        isDarkMode ? 'bg-gradient-to-r from-transparent via-amber-400 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-400 to-transparent'
      }`}></div>
    </div>
  );
};

export default FloatingElements;
