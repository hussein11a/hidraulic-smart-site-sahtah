
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
    <section className={`py-32 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`} id="services">
      
      {/* Enhanced Background with Modern Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-10 right-10 w-96 h-96 rounded-full opacity-20 ${
          isDarkMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-blue-400 to-purple-500'
        } blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-10 left-10 w-80 h-80 rounded-full opacity-20 ${
          isDarkMode ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-purple-400 to-pink-500'
        } blur-3xl animate-pulse`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-15 ${
          isDarkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-cyan-400 to-blue-500'
        } blur-3xl animate-pulse`}></div>
        
        {/* Modern Geometric Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className={`w-full h-full ${
            isDarkMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-purple-600'
          }`} style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Redesigned Section Header with Enhanced Typography */}
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className={`p-4 rounded-2xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-2 border-cyan-400/50' 
                : 'bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300/50'
            } animate-pulse shadow-2xl`}>
              <Sparkles className={`w-8 h-8 ${isDarkMode ? 'text-cyan-300' : 'text-blue-600'}`} />
            </div>
            <span className={`text-2xl font-black px-8 py-4 rounded-2xl border-2 backdrop-blur-md shadow-2xl ${
              isDarkMode 
                ? 'text-cyan-300 border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20' 
                : 'text-blue-700 border-blue-400/40 bg-gradient-to-r from-blue-50/90 to-purple-50/90'
            }`}>
              خدماتنا المتميزة
            </span>
            <div className={`p-4 rounded-2xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-2 border-purple-400/50' 
                : 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300/50'
            } animate-pulse shadow-2xl`}>
              <Award className={`w-8 h-8 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`} />
            </div>
          </div>
          
          <h2 className={`text-7xl md:text-9xl font-black mb-12 leading-tight ${
            isDarkMode 
              ? 'bg-gradient-to-r from-white via-cyan-200 to-purple-200' 
              : 'bg-gradient-to-r from-slate-900 via-blue-700 to-purple-700'
          } bg-clip-text text-transparent drop-shadow-2xl`}>
            نخدمك بأفضل ما لدينا
          </h2>
          
          <div className="flex justify-center items-center gap-6 mb-12">
            <div className="w-24 h-2 bg-gradient-to-r from-transparent to-cyan-500 rounded-full"></div>
            <div className="w-48 h-4 bg-gradient-to-r from-cyan-500 via-blue-500 via-purple-500 to-pink-500 rounded-full shadow-2xl"></div>
            <div className="w-24 h-2 bg-gradient-to-r from-pink-500 to-transparent rounded-full"></div>
          </div>
          
          <p className={`text-2xl max-w-5xl mx-auto leading-relaxed font-semibold ${
            isDarkMode ? 'text-slate-200' : 'text-slate-700'
          }`}>
            مجموعة شاملة ومتطورة من خدمات نقل السيارات المتخصصة باستخدام أحدث التقنيات الهيدروليكية والمعدات المتطورة لضمان أقصى درجات الأمان والاحترافية
          </p>

          {/* Enhanced Professional Stats */}
          <div className="flex flex-wrap justify-center gap-10 mt-16">
            <div className={`flex items-center gap-4 px-8 py-4 rounded-2xl border-2 backdrop-blur-md shadow-2xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-400/40 text-emerald-300' 
                : 'bg-gradient-to-r from-emerald-50/90 to-green-50/90 border-emerald-300/60 text-emerald-700'
            }`}>
              <Shield className="w-6 h-6" />
              <span className="font-black text-lg">ضمان 100%</span>
            </div>
            <div className={`flex items-center gap-4 px-8 py-4 rounded-2xl border-2 backdrop-blur-md shadow-2xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/40 text-blue-300' 
                : 'bg-gradient-to-r from-blue-50/90 to-cyan-50/90 border-blue-300/60 text-blue-700'
            }`}>
              <Clock className="w-6 h-6" />
              <span className="font-black text-lg">خدمة 24/7</span>
            </div>
            <div className={`flex items-center gap-4 px-8 py-4 rounded-2xl border-2 backdrop-blur-md shadow-2xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-400/40 text-amber-300' 
                : 'bg-gradient-to-r from-amber-50/90 to-yellow-50/90 border-amber-300/60 text-amber-700'
            }`}>
              <Star className="w-6 h-6" />
              <span className="font-black text-lg">تقييم ممتاز</span>
            </div>
          </div>
        </div>

        {/* Enhanced Services Grid with Modern Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mb-28">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className={`group relative overflow-hidden transition-all duration-700 cursor-pointer transform-gpu ${
                hoveredService === service.id 
                  ? 'scale-110 rotate-1 z-10' 
                  : 'hover:scale-105 hover:-rotate-1'
              } ${
                isDarkMode
                  ? 'bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-2 border-slate-600/50 hover:border-cyan-400/70 shadow-2xl hover:shadow-cyan-500/50 backdrop-blur-md'
                  : 'bg-gradient-to-br from-white/95 to-slate-50/95 border-2 border-slate-200/80 hover:border-blue-400/70 shadow-2xl hover:shadow-blue-400/60 backdrop-blur-md'
              }`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Enhanced Animated Background with Modern Gradients */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-50 transition-all duration-700 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-cyan-500/30 via-blue-500/30 to-purple-500/30' 
                  : 'bg-gradient-to-br from-blue-400/25 via-purple-400/25 to-pink-400/25'
              }`}></div>

              {/* Modern Floating Decoration */}
              <div className="absolute -top-8 -right-8 w-32 h-32 opacity-20 group-hover:opacity-60 transition-all duration-700 group-hover:rotate-45">
                <div className={`w-full h-full rounded-3xl ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500' 
                    : 'bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500'
                } blur-xl`}></div>
              </div>

              <div className="relative p-12 z-10">
                {/* Enhanced Service Icon with Modern Styling */}
                <div className="text-center mb-10">
                  <div className={`w-32 h-32 mx-auto rounded-3xl flex items-center justify-center text-7xl transition-all duration-700 ${
                    hoveredService === service.id 
                      ? 'scale-125 rotate-12' 
                      : 'group-hover:scale-115 group-hover:rotate-6'
                  } ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-slate-700/90 to-slate-800/90 shadow-2xl border-2 border-slate-600/60 backdrop-blur-md' 
                      : 'bg-gradient-to-br from-blue-50/90 to-purple-100/90 shadow-2xl border-2 border-blue-200/60 backdrop-blur-md'
                  }`}>
                    <span className="filter drop-shadow-2xl group-hover:drop-shadow-2xl transition-all duration-500">{service.icon}</span>
                  </div>
                </div>

                {/* Enhanced Service Title with Better Typography */}
                <h3 className={`text-2xl font-black mb-8 text-center leading-tight group-hover:scale-105 transition-transform duration-500 ${
                  isDarkMode ? 'text-white drop-shadow-lg' : 'text-slate-800'
                }`}>
                  {service.title}
                </h3>

                {/* Enhanced Service Description */}
                <p className={`text-lg leading-relaxed text-center mb-10 font-medium ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {service.description}
                </p>

                {/* Enhanced Available Badge */}
                {service.available && (
                  <div className="text-center mb-8">
                    <span className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-black transition-all duration-500 group-hover:scale-110 backdrop-blur-md shadow-2xl ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-emerald-500/30 to-green-500/30 text-emerald-300 border-2 border-emerald-500/50' 
                        : 'bg-gradient-to-r from-emerald-100/90 to-green-100/90 text-emerald-700 border-2 border-emerald-300/70'
                    }`}>
                      <CheckCircle className="w-6 h-6 animate-pulse" />
                      متاح الآن
                    </span>
                  </div>
                )}

                {/* Enhanced Service Number Badge */}
                <div className="absolute top-8 left-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black transition-all duration-500 shadow-2xl ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-amber-500/40 to-orange-500/40 text-amber-300 border-2 border-amber-400/50' 
                      : 'bg-gradient-to-br from-amber-100 to-orange-200 text-amber-700 border-2 border-amber-300'
                  } group-hover:scale-110`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Enhanced Corner Accent */}
                <div className="absolute bottom-8 right-8">
                  <div className={`w-8 h-8 rounded-full transition-all duration-500 group-hover:scale-125 shadow-xl ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-cyan-400 to-purple-500' 
                      : 'bg-gradient-to-br from-blue-500 to-purple-600'
                  } opacity-40 group-hover:opacity-80`}></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced Call to Action Section with Modern Design */}
        <div className={`rounded-3xl p-16 text-center shadow-2xl border-2 relative overflow-hidden backdrop-blur-md ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-slate-600/50'
            : 'bg-gradient-to-br from-white/95 to-slate-50/95 border-slate-200/70'
        }`}>
          
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className={`w-full h-full ${
              isDarkMode 
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600'
            }`} style={{
              backgroundImage: 'radial-gradient(circle at 3px 3px, currentColor 1.5px, transparent 0)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          {/* Modern Floating Accent Elements */}
          <div className="absolute top-8 left-8 w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 animate-pulse"></div>
          <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-500/20 animate-pulse"></div>

          <div className="relative z-10">
            <div className="flex justify-center mb-12">
              <div className={`p-10 rounded-3xl border-4 backdrop-blur-md shadow-2xl ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-amber-500/50 to-orange-600/50 border-amber-400/60' 
                  : 'bg-gradient-to-br from-amber-100/90 to-orange-200/90 border-amber-300/80'
              } animate-pulse`}>
                <Clock className={`w-20 h-20 ${
                  isDarkMode ? 'text-amber-300' : 'text-amber-600'
                }`} />
              </div>
            </div>
            
            <h3 className={`text-5xl md:text-7xl font-black mb-10 leading-tight ${
              isDarkMode 
                ? 'bg-gradient-to-r from-white via-cyan-200 to-purple-200' 
                : 'bg-gradient-to-r from-slate-900 via-amber-700 to-purple-800'
            } bg-clip-text text-transparent drop-shadow-2xl`}>
              خدمة مستمرة على مدار الساعة
            </h3>
            
            <p className={`text-2xl mb-16 leading-relaxed font-semibold max-w-4xl mx-auto ${
              isDarkMode ? 'text-slate-200' : 'text-slate-700'
            }`}>
              فريقنا المتخصص متاح في جميع الأوقات لتقديم أفضل خدمة وأسرع استجابة لمساعدتكم بأعلى معايير الجودة والاحترافية
            </p>

            {/* Enhanced Action Buttons with Modern Gradients */}
            <div className="flex flex-col sm:flex-row gap-10 justify-center max-w-3xl mx-auto mb-16">
              <Button
                size="lg"
                onClick={handlePhoneCall}
                className={`flex-1 group/phone transition-all duration-700 font-black text-2xl py-8 px-10 rounded-3xl shadow-2xl hover:shadow-2xl transform-gpu backdrop-blur-md ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-emerald-600 via-green-700 to-teal-700 hover:from-emerald-700 hover:via-green-800 hover:to-teal-800 text-white hover:shadow-emerald-500/70'
                    : 'bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 hover:from-emerald-600 hover:via-green-700 hover:to-teal-700 text-white hover:shadow-emerald-400/80'
                } hover:scale-110 border-2 border-emerald-400/30`}
              >
                <Phone className="w-8 h-8 mr-4 group-hover/phone:animate-bounce" />
                اتصل فوراً
                <Zap className="w-7 h-7 ml-3 group-hover/phone:animate-pulse" />
              </Button>
              
              <Button
                size="lg"
                onClick={handleWhatsApp}
                className={`flex-1 group/whats transition-all duration-700 font-black text-2xl py-8 px-10 rounded-3xl shadow-2xl hover:shadow-2xl transform-gpu backdrop-blur-md ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 via-cyan-700 to-purple-700 hover:from-blue-700 hover:via-cyan-800 hover:to-purple-800 text-white hover:shadow-blue-500/70'
                    : 'bg-gradient-to-r from-blue-500 via-cyan-600 to-purple-600 hover:from-blue-600 hover:via-cyan-700 hover:to-purple-700 text-white hover:shadow-blue-400/80'
                } hover:scale-110 border-2 border-blue-400/30`}
              >
                <MessageCircle className="w-8 h-8 mr-4 group-hover/whats:animate-pulse" />
                واتساب
                <ArrowRight className="w-7 h-7 ml-3 group-hover/whats:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>

            {/* Enhanced Trust Indicators with Modern Design */}
            <div className="flex flex-wrap items-center justify-center gap-12 pt-12 border-t-2 border-dashed border-slate-300/40">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className={`p-5 rounded-2xl transition-all duration-500 group-hover:scale-110 shadow-2xl ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-emerald-500/30 to-green-500/30 border-2 border-emerald-400/50' 
                    : 'bg-gradient-to-r from-emerald-100/90 to-green-100/90 border-2 border-emerald-300/70'
                } backdrop-blur-md`}>
                  <Shield className={`w-10 h-10 ${
                    isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                  } group-hover:animate-pulse`} />
                </div>
                <span className={`text-2xl font-black ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-800'
                } group-hover:scale-105 transition-transform duration-300`}>
                  ضمان شامل 100%
                </span>
              </div>
              
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className={`p-5 rounded-2xl transition-all duration-500 group-hover:scale-110 shadow-2xl ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-amber-500/30 to-yellow-500/30 border-2 border-amber-400/50' 
                    : 'bg-gradient-to-r from-amber-100/90 to-yellow-100/90 border-2 border-amber-300/70'
                } backdrop-blur-md`}>
                  <Star className={`w-10 h-10 ${
                    isDarkMode ? 'text-amber-300' : 'text-amber-600'
                  } group-hover:animate-spin`} />
                </div>
                <span className={`text-2xl font-black ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-800'
                } group-hover:scale-105 transition-transform duration-300`}>
                  تقييم ممتاز 5 نجوم
                </span>
              </div>
              
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className={`p-5 rounded-2xl transition-all duration-500 group-hover:scale-110 shadow-2xl ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border-2 border-blue-400/50' 
                    : 'bg-gradient-to-r from-blue-100/90 to-cyan-100/90 border-2 border-blue-300/70'
                } backdrop-blur-md`}>
                  <CheckCircle className={`w-10 h-10 ${
                    isDarkMode ? 'text-blue-300' : 'text-blue-600'
                  } group-hover:animate-bounce`} />
                </div>
                <span className={`text-2xl font-black ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-800'
                } group-hover:scale-105 transition-transform duration-300`}>
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
