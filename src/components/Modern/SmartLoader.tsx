import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SmartLoaderProps {
  isDarkMode: boolean;
}

const SmartLoader: React.FC<SmartLoaderProps> = ({ isDarkMode }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('جاري التحميل...');
  const [isVisible, setIsVisible] = useState(true);

  const loadingSteps = [
    { progress: 20, text: 'تحميل البيانات...' },
    { progress: 40, text: 'تجهيز الواجهة...' },
    { progress: 60, text: 'تحسين الأداء...' },
    { progress: 80, text: 'التشفير الآمن...' },
    { progress: 100, text: 'مرحباً بك!' }
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setProgress(loadingSteps[currentStep].progress);
        setLoadingText(loadingSteps[currentStep].text);
        currentStep++;
      } else {
        setTimeout(() => setIsVisible(false), 500);
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500",
      isDarkMode 
        ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" 
        : "bg-gradient-to-br from-blue-50 via-white to-blue-50"
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 bg-repeat"></div>
      </div>

      <div className="relative text-center">
        {/* Logo Animation */}
        <div className="mb-8">
          <div className={cn(
            "w-24 h-24 mx-auto rounded-full flex items-center justify-center relative overflow-hidden",
            isDarkMode 
              ? "bg-gradient-to-r from-blue-600 to-purple-600" 
              : "bg-gradient-to-r from-blue-500 to-cyan-500"
          )}>
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
            <svg
              className="w-12 h-12 text-white animate-pulse"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
            </svg>
          </div>
        </div>

        {/* Company Name */}
        <h1 className={cn(
          "text-3xl font-bold mb-4 animate-fade-in",
          isDarkMode ? "text-white" : "text-slate-800"
        )}>
          سطحة هيدروليك
        </h1>

        {/* Loading Text */}
        <p className={cn(
          "text-lg mb-8 animate-pulse",
          isDarkMode ? "text-gray-300" : "text-slate-600"
        )}>
          {loadingText}
        </p>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className={cn(
            "w-full h-2 rounded-full overflow-hidden",
            isDarkMode ? "bg-slate-700" : "bg-gray-200"
          )}>
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
          <div className={cn(
            "text-sm mt-2",
            isDarkMode ? "text-gray-400" : "text-slate-500"
          )}>
            {progress}%
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center mt-8 space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "w-3 h-3 rounded-full animate-bounce",
                isDarkMode ? "bg-blue-400" : "bg-blue-500"
              )}
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartLoader;