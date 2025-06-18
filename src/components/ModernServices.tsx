
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Clock, Shield, Star, CheckCircle, ArrowRight, Sparkles, Zap, Award } from 'lucide-react';

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
    <section className={`py-32 relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'}`} id="services">
      
      {/* Enhanced Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-10 right-10 w-96 h-96 rounded-full opacity-5 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'} blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-10 left-10 w-80 h-80 rounded-full opacity-5 ${isDarkMode ? 'bg-amber-400' : 'bg-amber-500'} blur-3xl animate-pulse`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-3 ${isDarkMode ? 'bg-purple-400' : 'bg-purple-500'} blur-3xl animate-pulse`}></div>
        
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className={`w-full h-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'}`} style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Premium Section Header */}
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`p-3 rounded-full ${isDarkMode ? 'bg-amber-500/20 border-2 border-amber-400/50' : 'bg-amber-100 border-2 border-amber-300'} animate-pulse`}>
              <Sparkles className={`w-6 h-6 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
            </div>
            <span className={`text-xl font-black px-6 py-3 rounded-full border-2 backdrop-blur-sm ${
              isDarkMode 
                ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' 
                : 'text-amber-700 border-amber-500/30 bg-amber-50/80'
            }`}>
              خدماتنا المتميزة
            </span>
            <div className={`p-3 rounded-full ${isDarkMode ? 'bg-amber-500/20 border-2 border-amber-400/50' : 'bg-amber-100 border-2 border-amber-300'} animate-pulse`}>
              <Award className={`w-6 h-6 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
            </div>
          </div>
          
          <h2 className={`text-6xl md:text-8xl font-black mb-10 bg-gradient-to-r ${
            isDarkMode 
              ? 'from-white via-blue-200 to-amber-200' 
              : 'from-slate-900 via-blue-800 to-amber-700'
          } bg-clip-text text-transparent leading-tight`}>
            نخدمك بأفضل ما لدينا
          </h2>
          
          <div className="flex justify-center items-center gap-4 mb-10">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
            <div className="w-40 h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 rounded-full shadow-lg"></div>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></div>
          </div>
          
          <p className={`text-2xl max-w-4xl mx-auto leading-relaxed font-medium ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            مجموعة شاملة ومتطورة من خدمات نقل السيارات المتخصصة باستخدام أحدث التقنيات الهيدروليكية والمعدات المتطورة لضمان أقصى درجات الأمان والاحترافية
          </p>

          {/* Professional Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 backdrop-blur-sm ${
              isDarkMode ? 'bg-blue-500/10 border-blue-400/30 text-blue-300' : 'bg-blue-50/80 border-blue-300/50 text-blue-700'
            }`}>
              <Shield className="w-5 h-5" />
              <span className="font-bold">ضمان 100%</span>
            </div>
            <div className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 backdrop-blur-sm ${
              isDarkMode ? 'bg-green-500/10 border-green-400/30 text-green-300' : 'bg-green-50/80 border-green-300/50 text-green-700'
            }`}>
              <Clock className="w-5 h-5" />
              <span className="font-bold">خدمة 24/7</span>
            </div>
            <div className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 backdrop-blur-sm ${
              isDarkMode ? 'bg-amber-500/10 border-amber-400/30 text-amber-300' : 'bg-amber-50/80 border-amber-300/50 text-amber-700'
            }`}>
              <Star className="w-5 h-5" />
              <span className="font-bold">تقييم ممتاز</span>
            </div>
          </div>
        </div>

        {/* Premium Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-24">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className={`group relative overflow-hidden transition-all duration-700 cursor-pointer transform-gpu ${
                hoveredService === service.id 
                  ? 'scale-110 rotate-1 z-10' 
                  : 'hover:scale-105 hover:-rotate-1'
              } ${
                isDarkMode
                  ? 'bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-2 border-slate-600/50 hover:border-blue-400/70 shadow-2xl hover:shadow-blue-500/40 backdrop-blur-sm'
                  : 'bg-gradient-to-br from-white to-slate-50/90 border-2 border-slate-200/80 hover:border-blue-400/70 shadow-xl hover:shadow-blue-400/50 backdrop-blur-sm'
              }`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Enhanced Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-40 transition-all duration-700 ${
                isDarkMode 
                  ? 'from-blue-500/30 via-purple-500/30 to-amber-500/30' 
                  : 'from-blue-400/20 via-purple-400/20 to-amber-400/20'
              }`}></div>

              {/* Premium Floating Decoration */}
              <div className="absolute -top-8 -right-8 w-32 h-32 opacity-20 group-hover:opacity-50 transition-all duration-700 group-hover:rotate-45">
                <div className={`w-full h-full rounded-3xl ${
                  isDarkMode ? 'bg-gradient-to-br from-blue-400 via-purple-500 to-amber-400' : 'bg-gradient-to-br from-blue-500 via-purple-600 to-amber-500'
                } blur-xl`}></div>
              </div>

              <div className="relative p-10 z-10">
                {/* Premium Service Icon */}
                <div className="text-center mb-8">
                  <div className={`w-28 h-28 mx-auto rounded-3xl flex items-center justify-center text-6xl transition-all duration-700 ${
                    hoveredService === service.id 
                      ? 'scale-125 rotate-12' 
                      : 'group-hover:scale-115 group-hover:rotate-6'
                  } ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-slate-700/90 to-slate-800/90 shadow-2xl border-2 border-slate-600/60 backdrop-blur-sm' 
                      : 'bg-gradient-to-br from-blue-50/90 to-indigo-100/90 shadow-xl border-2 border-blue-200/60 backdrop-blur-sm'
                  }`}>
                    <span className="filter drop-shadow-2xl group-hover:drop-shadow-2xl transition-all duration-500">{service.icon}</span>
                  </div>
                </div>

                {/* Premium Service Title */}
                <h3 className={`text-2xl font-black mb-6 text-center leading-tight group-hover:scale-105 transition-transform duration-500 ${
                  isDarkMode ? 'text-white drop-shadow-lg' : 'text-slate-800'
                }`}>
                  {service.title}
                </h3>

                {/* Premium Service Description */}
                <p className={`text-base leading-relaxed text-center mb-8 font-medium ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {service.description}
                </p>

                {/* Premium Available Badge */}
                {service.available && (
                  <div className="text-center mb-6">
                    <span className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-base font-black transition-all duration-500 group-hover:scale-110 backdrop-blur-sm ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-300 border-2 border-green-500/50 shadow-lg' 
                        : 'bg-gradient-to-r from-green-100/90 to-emerald-100/90 text-green-700 border-2 border-green-300/70 shadow-md'
                    }`}>
                      <CheckCircle className="w-5 h-5 animate-pulse" />
                      متاح الآن
                    </span>
                  </div>
                )}

                {/* Premium Service Number Badge */}
                <div className="absolute top-6 left-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-500 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-amber-500/30 to-orange-500/30 text-amber-300 border-2 border-amber-400/50' 
                      : 'bg-gradient-to-br from-amber-100 to-orange-200 text-amber-700 border-2 border-amber-300'
                  } group-hover:scale-110`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Premium Corner Accent */}
                <div className="absolute bottom-6 right-6">
                  <div className={`w-6 h-6 rounded-full transition-all duration-500 group-hover:scale-125 ${
                    isDarkMode ? 'bg-gradient-to-br from-blue-400 to-purple-500' : 'bg-gradient-to-br from-blue-500 to-purple-600'
                  } opacity-30 group-hover:opacity-70`}></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced Premium Call to Action Section */}
        <div className={`rounded-3xl p-12 text-center shadow-2xl border-2 relative overflow-hidden backdrop-blur-sm ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-600/50'
            : 'bg-gradient-to-br from-white/90 to-slate-50/90 border-slate-200/70'
        }`}>
          
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className={`w-full h-full ${
              isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
            }`} style={{
              backgroundImage: 'radial-gradient(circle at 3px 3px, currentColor 1.5px, transparent 0)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          {/* Floating Accent Elements */}
          <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 animate-pulse"></div>
          <div className="absolute bottom-8 right-8 w-20 h-20 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 animate-pulse"></div>

          <div className="relative z-10">
            <div className="flex justify-center mb-10">
              <div className={`p-8 rounded-full border-4 backdrop-blur-sm ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-amber-500/40 to-orange-600/40 border-amber-400/60' 
                  : 'bg-gradient-to-br from-amber-100/90 to-orange-200/90 border-amber-300/80'
              } animate-pulse shadow-2xl`}>
                <Clock className={`w-16 h-16 ${
                  isDarkMode ? 'text-amber-300' : 'text-amber-600'
                }`} />
              </div>
            </div>
            
            <h3 className={`text-4xl md:text-6xl font-black mb-8 bg-gradient-to-r ${
              isDarkMode 
                ? 'from-white via-amber-200 to-blue-200' 
                : 'from-slate-900 via-amber-700 to-blue-800'
            } bg-clip-text text-transparent leading-tight`}>
              خدمة مستمرة على مدار الساعة
            </h3>
            
            <p className={`text-2xl mb-12 leading-relaxed font-medium max-w-3xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              فريقنا المتخصص متاح في جميع الأوقات لتقديم أفضل خدمة وأسرع استجابة لمساعدتكم بأعلى معايير الجودة والاحترافية
            </p>

            {/* Premium Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center max-w-2xl mx-auto mb-12">
              <Button
                size="lg"
                onClick={handlePhoneCall}
                className={`flex-1 group/phone transition-all duration-700 font-black text-xl py-6 px-8 rounded-2xl ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white shadow-2xl hover:shadow-green-500/70'
                    : 'bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-green-400/80'
                } hover:scale-110 transform-gpu backdrop-blur-sm`}
              >
                <Phone className="w-7 h-7 mr-4 group-hover/phone:animate-bounce" />
                اتصل فوراً
                <Zap className="w-6 h-6 ml-3 group-hover/phone:animate-pulse" />
              </Button>
              
              <Button
                size="lg"
                onClick={handleWhatsApp}
                className={`flex-1 group/whats transition-all duration-700 font-black text-xl py-6 px-8 rounded-2xl ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 hover:from-blue-700 hover:via-indigo-800 hover:to-purple-800 text-white shadow-2xl hover:shadow-blue-500/70'
                    : 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 text-white shadow-xl hover:shadow-blue-400/80'
                } hover:scale-110 transform-gpu backdrop-blur-sm`}
              >
                <MessageCircle className="w-7 h-7 mr-4 group-hover/whats:animate-pulse" />
                واتساب
                <ArrowRight className="w-6 h-6 ml-3 group-hover/whats:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>

            {/* Premium Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-10 pt-10 border-t-2 border-dashed border-slate-300/40">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className={`p-4 rounded-full transition-all duration-500 group-hover:scale-110 ${isDarkMode ? 'bg-green-500/20 border-2 border-green-400/40' : 'bg-green-100/80 border-2 border-green-300/60'} backdrop-blur-sm`}>
                  <Shield className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'} group-hover:animate-pulse`} />
                </div>
                <span className={`text-xl font-black ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} group-hover:scale-105 transition-transform duration-300`}>
                  ضمان شامل 100%
                </span>
              </div>
              
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className={`p-4 rounded-full transition-all duration-500 group-hover:scale-110 ${isDarkMode ? 'bg-amber-500/20 border-2 border-amber-400/40' : 'bg-amber-100/80 border-2 border-amber-300/60'} backdrop-blur-sm`}>
                  <Star className={`w-8 h-8 ${isDarkMode ? 'text-amber-400' : 'text-amber-500'} group-hover:animate-spin`} />
                </div>
                <span className={`text-xl font-black ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} group-hover:scale-105 transition-transform duration-300`}>
                  تقييم ممتاز 5 نجوم
                </span>
              </div>
              
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className={`p-4 rounded-full transition-all duration-500 group-hover:scale-110 ${isDarkMode ? 'bg-blue-500/20 border-2 border-blue-400/40' : 'bg-blue-100/80 border-2 border-blue-300/60'} backdrop-blur-sm`}>
                  <CheckCircle className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} group-hover:animate-bounce`} />
                </div>
                <span className={`text-xl font-black ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} group-hover:scale-105 transition-transform duration-300`}>
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
