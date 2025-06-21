
import React from 'react';
import { Users, Clock, Award, CheckCircle } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

interface StatisticsSectionProps {
  isDarkMode: boolean;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ isDarkMode }) => {
  const statistics = [
    { icon: Users, value: 2500, label: 'عميل راضٍ', color: 'text-blue-500', suffix: '+' },
    { icon: Clock, value: 24, label: 'خدمة مستمرة', color: 'text-green-500', suffix: '/7' },
    { icon: Award, value: 5, label: 'سنوات خبرة', color: 'text-amber-500', suffix: '+' },
    { icon: CheckCircle, value: 99, label: 'نسبة نجاح', color: 'text-emerald-500', suffix: '%' }
  ];

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-slate-800/30' : 'bg-white/50'}`} id="statistics" data-animate>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-8 rounded-3xl shadow-xl transition-all duration-500 hover:scale-105 border-2 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-slate-700/60 to-slate-800/60 border-slate-600 hover:border-blue-500/50'
                  : 'bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-blue-300'
              }`}
            >
              <stat.icon className={`h-10 w-10 mx-auto mb-4 ${stat.color}`} />
              <div className={`text-3xl md:text-4xl font-black mb-2 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className={`text-sm font-bold ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
