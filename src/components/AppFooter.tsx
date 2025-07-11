import React from 'react';

interface AppFooterProps {
  isDarkMode: boolean;
}

const AppFooter: React.FC<AppFooterProps> = ({ isDarkMode }) => {
  return (
    <footer className={`py-20 mt-16 border-t-2 ${
      isDarkMode 
        ? 'border-amber-400/60 bg-gradient-to-b from-slate-900/98 to-slate-800' 
        : 'border-amber-300/60 bg-gradient-to-b from-amber-50/60 to-white'
    }`} role="contentinfo">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
          <div className={`p-6 rounded-2xl shadow-xl border-2 transition-all duration-500 hover:scale-105 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-amber-500/30' 
              : 'bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200'
          }`}>
            <img 
              src="/lovable-uploads/53c7547b-fc11-4442-b5f6-798e6e1aa08f.png" 
              alt="شاحنة السطحة الهيدروليكية" 
              className="w-16 h-16 object-contain filter brightness-110 animate-pulse"
            />
          </div>
        </div>
        <h3 className={`text-4xl font-black mb-4 ${
          isDarkMode ? 'text-white' : 'text-slate-800'
        }`}>
          سطحة هيدروليك احترافية
        </h3>
        <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded-full mb-6"></div>
        <p className={`text-lg font-semibold mb-8 ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          خدمة نقل السيارات الاحترافية © 2024
        </p>
        <p className={`text-sm ${
          isDarkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          جميع الحقوق محفوظة • تم التطوير بأعلى معايير الجودة والأمان
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;