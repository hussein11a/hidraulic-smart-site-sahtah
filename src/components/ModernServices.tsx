
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Clock, Shield, Star, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  available: boolean;
  sort_order: number;
}

interface ModernServicesProps {
  services: Service[];
  isDarkMode: boolean;
}

const ModernServices: React.FC<ModernServicesProps> = ({ services, isDarkMode }) => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const handlePhoneCall = () => {
    window.location.href = 'tel:+966501234567';
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('مرحبا، أحتاج خدمة سطحة هيدروليك');
    window.open(`https://wa.me/966501234567?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'}`} id="services">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 right-20 w-72 h-72 rounded-full opacity-10 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'} blur-3xl`}></div>
        <div className={`absolute bottom-20 left-20 w-96 h-96 rounded-full opacity-10 ${isDarkMode ? 'bg-amber-400' : 'bg-amber-500'} blur-3xl`}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className={`w-8 h-8 ${isDarkMode ? 'text-amber-400' : 'text-amber-500'} animate-pulse`} />
            <span className={`text-lg font-bold px-4 py-2 rounded-full border-2 ${
              isDarkMode 
                ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' 
                : 'text-amber-600 border-amber-500/30 bg-amber-50'
            }`}>
              خدماتنا المتميزة
            </span>
            <Sparkles className={`w-8 h-8 ${isDarkMode ? 'text-amber-400' : 'text-amber-500'} animate-pulse`} />
          </div>
          
          <h2 className={`text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r ${
            isDarkMode 
              ? 'from-white via-blue-200 to-amber-200' 
              : 'from-slate-900 via-blue-800 to-amber-700'
          } bg-clip-text text-transparent leading-tight`}>
            نخدمك بأفضل ما لدينا
          </h2>
          
          <div className="w-32 h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 mx-auto rounded-full mb-8 shadow-lg"></div>
          
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            مجموعة شاملة ومتطورة من خدمات نقل السيارات المتخصصة باستخدام أحدث التقنيات الهيدروليكية والمعدات المتطورة
          </p>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className={`group relative overflow-hidden transition-all duration-700 cursor-pointer transform-gpu ${
                hoveredService === service.id 
                  ? 'scale-110 rotate-1' 
                  : 'hover:scale-105 hover:-rotate-1'
              } ${
                isDarkMode
                  ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-slate-600/50 hover:border-blue-400/70 shadow-2xl hover:shadow-blue-500/30'
                  : 'bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 hover:border-blue-400 shadow-xl hover:shadow-blue-400/40'
              }`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-30 transition-all duration-700 ${
                isDarkMode 
                  ? 'from-blue-500/40 via-purple-500/40 to-amber-500/40' 
                  : 'from-blue-400/30 via-purple-400/30 to-amber-400/30'
              }`}></div>

              {/* Floating Decoration */}
              <div className="absolute -top-6 -right-6 w-24 h-24 opacity-20 group-hover:opacity-40 transition-all duration-500 group-hover:rotate-12">
                <div className={`w-full h-full rounded-full ${
                  isDarkMode ? 'bg-gradient-to-br from-blue-400 to-purple-500' : 'bg-gradient-to-br from-blue-500 to-purple-600'
                } blur-sm`}></div>
              </div>

              <div className="relative p-8 z-10">
                {/* Enhanced Service Icon */}
                <div className="text-center mb-6">
                  <div className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-5xl transition-all duration-500 ${
                    hoveredService === service.id 
                      ? 'scale-125 rotate-12' 
                      : 'group-hover:scale-110 group-hover:rotate-6'
                  } ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-slate-700/80 to-slate-800/80 shadow-2xl border-2 border-slate-600/50' 
                      : 'bg-gradient-to-br from-blue-50 to-indigo-100 shadow-xl border-2 border-blue-200/50'
                  }`}>
                    <span className="filter drop-shadow-lg">{service.icon}</span>
                  </div>
                </div>

                {/* Enhanced Service Title */}
                <h3 className={`text-xl font-black mb-4 text-center leading-tight group-hover:scale-105 transition-transform duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  {service.title}
                </h3>

                {/* Enhanced Service Description */}
                <p className={`text-sm leading-relaxed text-center mb-6 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {service.description}
                </p>

                {/* Enhanced Available Badge */}
                {service.available && (
                  <div className="text-center">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 group-hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-2 border-green-500/40' 
                        : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-2 border-green-300'
                    }`}>
                      <CheckCircle className="w-4 h-4 animate-pulse" />
                      متاح الآن
                    </span>
                  </div>
                )}

                {/* Order Service Button */}
                <div className="mt-6 text-center">
                  <Button
                    onClick={handleWhatsApp}
                    className={`w-full group/btn transition-all duration-300 font-bold ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-xl hover:shadow-blue-500/50'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-blue-400/60'
                    } hover:scale-105`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      اطلب الخدمة
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced Call to Action Section */}
        <div className={`rounded-3xl p-10 text-center shadow-2xl border-2 relative overflow-hidden ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-600/50'
            : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
        }`}>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className={`w-full h-full ${
              isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
            }`} style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              <div className={`p-6 rounded-full border-4 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-amber-500/30 to-orange-600/30 border-amber-400/50' 
                  : 'bg-gradient-to-br from-amber-100 to-orange-200 border-amber-300'
              } animate-pulse`}>
                <Clock className={`w-12 h-12 ${
                  isDarkMode ? 'text-amber-400' : 'text-amber-600'
                }`} />
              </div>
            </div>
            
            <h3 className={`text-3xl md:text-5xl font-black mb-6 bg-gradient-to-r ${
              isDarkMode 
                ? 'from-white via-amber-200 to-blue-200' 
                : 'from-slate-900 via-amber-700 to-blue-800'
            } bg-clip-text text-transparent`}>
              خدمة مستمرة على مدار الساعة
            </h3>
            
            <p className={`text-xl mb-10 leading-relaxed ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              فريقنا المتخصص متاح في جميع الأوقات لتقديم أفضل خدمة وأسرع استجابة لمساعدتكم
            </p>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
              <Button
                size="lg"
                onClick={handlePhoneCall}
                className={`flex-1 group/phone transition-all duration-500 font-black text-lg py-4 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white shadow-2xl hover:shadow-green-500/60'
                    : 'bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-green-400/70'
                } hover:scale-110 transform-gpu`}
              >
                <Phone className="w-6 h-6 mr-3 group-hover/phone:animate-bounce" />
                اتصل فوراً
              </Button>
              
              <Button
                size="lg"
                onClick={handleWhatsApp}
                className={`flex-1 group/whats transition-all duration-500 font-black text-lg py-4 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 hover:from-blue-700 hover:via-indigo-800 hover:to-purple-800 text-white shadow-2xl hover:shadow-blue-500/60'
                    : 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 text-white shadow-xl hover:shadow-blue-400/70'
                } hover:scale-110 transform-gpu`}
              >
                <MessageCircle className="w-6 h-6 mr-3 group-hover/whats:animate-pulse" />
                واتساب
              </Button>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t-2 border-dashed border-slate-300/30">
              <div className="flex items-center gap-3 group">
                <div className={`p-2 rounded-full ${isDarkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                  <Shield className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'} group-hover:animate-pulse`} />
                </div>
                <span className={`text-lg font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  ضمان شامل 100%
                </span>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className={`p-2 rounded-full ${isDarkMode ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
                  <Star className={`w-6 h-6 ${isDarkMode ? 'text-amber-400' : 'text-amber-500'} group-hover:animate-spin`} />
                </div>
                <span className={`text-lg font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  تقييم ممتاز 5 نجوم
                </span>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className={`p-2 rounded-full ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                  <CheckCircle className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} group-hover:animate-bounce`} />
                </div>
                <span className={`text-lg font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  استجابة فورية
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernServices;
