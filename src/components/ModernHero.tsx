
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Shield, Clock, Award, Zap } from 'lucide-react';

interface ModernHeroProps {
  isDarkMode: boolean;
  onPhoneCall: () => void;
  onWhatsApp: () => void;
}

const ModernHero: React.FC<ModernHeroProps> = ({ isDarkMode, onPhoneCall, onWhatsApp }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: Shield, text: 'ضمان شامل' },
    { icon: Clock, text: 'خدمة 24/7' },
    { icon: Award, text: 'فريق محترف' },
    { icon: Zap, text: 'استجابة فورية' }
  ];

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
      isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-amber-50'
    }`}>
      
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute top-20 left-20 w-72 h-72 rounded-full ${
          isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
        } animate-pulse`}></div>
        <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full ${
          isDarkMode ? 'bg-amber-500' : 'bg-amber-400'
        } animate-pulse delay-1000`}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          {/* Main Title */}
          <h1 className={`text-5xl md:text-7xl font-black mb-6 leading-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              سطحة هيدروليك
            </span>
            <br />
            <span className={`text-3xl md:text-5xl font-bold ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              احترافية
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-medium ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            خدمة نقل السيارات المعطلة والمساعدة على الطريق
            <br />
            <span className="text-lg">سريع • آمن • موثوق • 24 ساعة</span>
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/60 border-slate-700 hover:bg-slate-700/70' 
                    : 'bg-white/80 border-slate-200 hover:bg-white/90'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className={`w-8 h-8 mx-auto mb-2 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <p className={`text-sm font-semibold ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  {feature.text}
                </p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onPhoneCall}
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              اتصل الآن
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-12 group-hover:translate-x-[200%] transition-transform duration-700"></div>
            </Button>

            <Button
              onClick={onWhatsApp}
              size="lg"
              variant="outline"
              className={`group relative overflow-hidden px-8 py-4 text-lg font-bold rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'border-green-500 text-green-400 hover:bg-green-500 hover:text-white' 
                  : 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
              }`}
            >
              <MessageCircle className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              واتساب
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className={`mt-12 text-center ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <p className="text-sm font-medium mb-2">موثوق من قبل أكثر من</p>
            <div className="flex justify-center items-center gap-8">
              <div className="text-center">
                <div className={`text-2xl font-black ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>2500+</div>
                <div className="text-xs">عميل راضٍ</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-black ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}>99%</div>
                <div className="text-xs">نسبة نجاح</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-black ${
                  isDarkMode ? 'text-amber-400' : 'text-amber-600'
                }`}>5+</div>
                <div className="text-xs">سنوات خبرة</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
