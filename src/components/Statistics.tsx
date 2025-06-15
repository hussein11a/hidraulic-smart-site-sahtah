
import React, { useState, useEffect } from 'react';
import { Users, Clock, MapPin, Star } from 'lucide-react';

interface StatisticProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  isDarkMode: boolean;
}

const StatisticCard: React.FC<StatisticProps> = ({ icon, value, label, suffix = '', isDarkMode }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const increment = value / (duration / 50);
    const timer = setInterval(() => {
      setDisplayValue(prev => {
        const next = prev + increment;
        if (next >= value) {
          clearInterval(timer);
          return value;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className={`p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl transform hover:-translate-y-2 border-2 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-800/90 to-slate-700/90 border-amber-400/30 hover:border-amber-400/50' 
        : 'bg-gradient-to-br from-white to-amber-50/30 border-amber-300/50 hover:border-amber-400'
    }`}>
      <div className="text-center">
        <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
          isDarkMode ? 'bg-amber-400/20 text-amber-400' : 'bg-amber-100 text-amber-600'
        }`}>
          {icon}
        </div>
        <div className={`text-5xl font-black mb-4 ${
          isDarkMode ? 'text-white' : 'text-slate-800'
        }`}>
          {Math.floor(displayValue)}{suffix}
        </div>
        <div className={`text-xl font-semibold ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {label}
        </div>
      </div>
    </div>
  );
};

interface StatisticsProps {
  isDarkMode: boolean;
}

const Statistics: React.FC<StatisticsProps> = ({ isDarkMode }) => {
  const stats = [
    {
      icon: <Users className="h-10 w-10" />,
      value: 2500,
      label: 'عميل راضٍ',
      suffix: '+'
    },
    {
      icon: <Clock className="h-10 w-10" />,
      value: 15,
      label: 'دقيقة متوسط الوصول'
    },
    {
      icon: <MapPin className="h-10 w-10" />,
      value: 50,
      label: 'مدينة نغطيها',
      suffix: '+'
    },
    {
      icon: <Star className="h-10 w-10" />,
      value: 98,
      label: 'نسبة الرضا',
      suffix: '%'
    }
  ];

  return (
    <section className={`py-24 lg:py-32 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900/90 via-slate-800/95 to-slate-900/90' 
        : 'bg-gradient-to-br from-amber-50/50 via-white to-slate-50/80'
    }`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)]"></div>
      
      <div className="container mx-auto px-8 relative z-10">
        <div className="text-center mb-20">
          <div className={`inline-block px-6 py-3 rounded-full mb-6 border-2 ${
            isDarkMode 
              ? 'bg-slate-800/50 border-amber-400/30 text-amber-300' 
              : 'bg-white border-amber-300 text-amber-700'
          }`}>
            <span className="text-lg font-semibold">إحصائيات مميزة</span>
          </div>
          <h2 className={`text-6xl lg:text-7xl font-black mb-8 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            أرقام تتحدث عن نفسها
          </h2>
          <div className={`w-40 h-2 mx-auto rounded-full mb-10 shadow-lg ${
            isDarkMode ? 'bg-gradient-to-r from-amber-400 to-slate-300' : 'bg-gradient-to-r from-amber-500 to-slate-600'
          }`}></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatisticCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
