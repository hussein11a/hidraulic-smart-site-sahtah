import React from 'react';
import { Shield, Zap, Award } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FeaturesProps {
  isDarkMode: boolean;
}

const Features: React.FC<FeaturesProps> = ({ isDarkMode }) => {
  const isMobile = useIsMobile();

  const features = [
    {
      icon: Shield,
      title: 'ضمان شامل',
      description: 'نضمن سلامة سيارتك أثناء النقل',
      color: 'bg-blue-500'
    },
    {
      icon: Zap,
      title: 'استجابة فورية',
      description: 'نصل إليك في أسرع وقت ممكن',
      color: 'bg-green-500'
    },
    {
      icon: Award,
      title: 'فريق محترف',
      description: 'سائقين ذوي خبرة عالية ومدربين',
      color: 'bg-amber-500'
    },
    {
      icon: Shield,
      title: 'جودة عالية',
      description: 'معدات حديثة ومعايير عالمية',
      color: 'bg-purple-500'
    }
  ];

  return (
    <section className={`${isMobile ? 'py-12' : 'py-20'} ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`} id="features" data-animate>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}>
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-6xl'} font-black mb-6 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            مميزاتنا الخاصة
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded-full mb-6"></div>
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            ما يجعلنا الخيار الأول لعملائنا
          </p>
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${isMobile ? 'gap-4' : 'gap-8'}`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group ${isMobile ? 'p-6' : 'p-8'} rounded-2xl md:rounded-3xl shadow-xl transition-all duration-500 hover:scale-105 border-2 text-center ${
                isDarkMode
                  ? 'bg-gradient-to-br from-slate-700/60 to-slate-800/60 border-slate-600 hover:border-blue-500/50'
                  : 'bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-10 w-10 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                {feature.title}
              </h3>
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;