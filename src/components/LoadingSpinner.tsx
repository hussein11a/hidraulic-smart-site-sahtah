
import React from 'react';

interface LoadingSpinnerProps {
  isDarkMode?: boolean;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  isDarkMode = false, 
  size = 'md',
  message = 'جاري التحميل...'
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
      <div className="text-center">
        {/* Primary Spinner */}
        <div className="relative mb-8">
          <div className={`animate-spin rounded-full ${sizeClasses[size]} border-4 border-amber-200 border-t-amber-600 mx-auto`}></div>
          
          {/* Secondary Spinner */}
          <div className={`absolute inset-0 animate-spin rounded-full ${sizeClasses[size]} border-4 border-transparent border-r-blue-500 mx-auto`} style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
          
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl animate-pulse">🚛</div>
          </div>
        </div>

        {/* Loading Text */}
        <p className={`${textSizeClasses[size]} font-semibold ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        } animate-pulse`}>
          {message}
        </p>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
