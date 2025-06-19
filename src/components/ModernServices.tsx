
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Clock, Shield, Star, CheckCircle, ArrowRight, Sparkles, Zap, Award, ChevronDown, ChevronUp } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

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
  const [expandedServices, setExpandedServices] = useState<Set<number>>(new Set());

  const handlePhoneCall = () => {
    window.location.href = 'tel:+966501234567';
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('مرحبا، أحتاج خدمة سطحة هيدروليك');
    window.open(`https://wa.me/966501234567?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const toggleServiceExpansion = (serviceId: number) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedServices(newExpanded);
  };

  const getServiceFeatures = (service: Service) => {
    const features = {
      3: ['نقل آمن ومضمون', 'عناية خاصة بالسيارات الفاخرة', 'معدات متخصصة', 'تأمين شامل أثناء النقل'],
      4: ['متاح على مدار الساعة', 'استجابة فورية', 'فريق دائم الاستعداد', 'تغطية جميع مناطق المملكة'],
      6: ['أدوات تثبيت خاصة', 'حماية كاملة للدراجة', 'نقل احترافي', 'سائقين متخصصين'],
      7: ['خدمة من الباب للباب', 'تنسيق مع مراكز الصيانة', 'مواعيد مضمونة', 'متابعة حالة السيارة'],
      8: ['تقارير فنية دقيقة', 'تعامل مع شركات التأمين', 'توثيق الأضرار', 'خدمة سريعة'],
      9: ['حجز مواعيد الفحص', 'خدمة التوصيل والاستلام', 'متابعة نتائج الفحص', 'تذكير بمواعيد التجديد'],
      10: ['تغطية جميع مدن المملكة', 'نقل آمن لمسافات طويلة', 'تتبع مباشر للرحلة', 'ضمان الوصول في الموعد'],
      11: ['زلاجات خاصة للسحب', 'حماية علبة التروس', 'تجنب الأضرار الإضافية', 'خبرة في التعامل مع الأعطال المعقدة']
    };
    return features[service.id as keyof typeof features] || ['خدمة احترافية', 'جودة عالية', 'أمان مضمون', 'فريق متخصص'];
  };

  return (
    <section className={`py-32 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`} id="services">
      
      {/* Enhanced Background Effects */}
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
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Professional Header Section with Truck Image at Top */}
        <div className="text-center mb-24">
          {/* Truck Image - Moved to the very top */}
          <div className="flex justify-center mb-16 pt-8">
            <div className={`p-12 rounded-3xl shadow-2xl transition-all duration-700 hover:scale-110 border-4 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-700/90 to-slate-800/90 border-cyan-400/50 shadow-cyan-500/30' 
                : 'bg-gradient-to-br from-white/95 to-blue-50/95 border-blue-300/50 shadow-blue-400/30'
            } backdrop-blur-md`}>
              <OptimizedImage
                src="/lovable-uploads/53c7547b-fc11-4442-b5f6-798e6e1aa08f.png"
                alt="شاحنة السطحة الهيدروليكية"
                width={160}
                height={160}
                className="w-40 h-40 object-contain filter brightness-110 animate-pulse"
                priority={true}
              />
            </div>
          </div>

          {/* Title Section */}
          <h2 className={`text-7xl md:text-9xl font-black mb-12 leading-tight ${
            isDarkMode 
              ? 'bg-gradient-to-r from-white via-cyan-200 to-purple-200' 
              : 'bg-gradient-to-r from-slate-900 via-blue-700 to-purple-700'
          } bg-clip-text text-transparent drop-shadow-2xl`}>
            سطحة هيدروليك
          </h2>

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
              خدماتنا المتكاملة
            </span>
            <div className={`p-4 rounded-2xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-2 border-purple-400/50' 
                : 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300/50'
            } animate-pulse shadow-2xl`}>
              <Award className={`w-8 h-8 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`} />
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-6 mb-12">
            <div className="w-24 h-2 bg-gradient-to-r from-transparent to-cyan-500 rounded-full"></div>
            <div className="w-48 h-4 bg-gradient-to-r from-cyan-500 via-blue-500 via-purple-500 to-pink-500 rounded-full shadow-2xl"></div>
            <div className="w-24 h-2 bg-gradient-to-r from-pink-500 to-transparent rounded-full"></div>
          </div>
          
          <p className={`text-2xl max-w-5xl mx-auto leading-relaxed font-semibold ${
            isDarkMode ? 'text-slate-200' : 'text-slate-700'
          }`}>
            مجموعة متكاملة من خدمات نقل السيارات الاحترافية مع ضمان الجودة والأمان التام
          </p>
        </div>

        {/* Comprehensive Services Grid */}
        <div className="space-y-8 mb-28">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className={`group relative overflow-hidden transition-all duration-700 cursor-pointer ${
                hoveredService === service.id 
                  ? 'scale-105 z-10' 
                  : 'hover:scale-102'
              } ${
                isDarkMode
                  ? 'bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-2 border-slate-600/50 hover:border-cyan-400/70 shadow-2xl hover:shadow-cyan-500/50'
                  : 'bg-gradient-to-br from-white/95 to-slate-50/95 border-2 border-slate-200/80 hover:border-blue-400/70 shadow-2xl hover:shadow-blue-400/60'
              } backdrop-blur-md`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Background Effects */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-50 transition-all duration-700 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-cyan-500/30 via-blue-500/30 to-purple-500/30' 
                  : 'bg-gradient-to-br from-blue-400/25 via-purple-400/25 to-pink-400/25'
              }`}></div>

              <div className="relative p-12 z-10">
                {/* Service Header */}
                <div className="flex items-start gap-8 mb-8">
                  {/* Service Icon */}
                  <div className={`w-32 h-32 rounded-3xl flex items-center justify-center text-6xl transition-all duration-700 ${
                    hoveredService === service.id 
                      ? 'scale-110 rotate-6' 
                      : 'group-hover:scale-105 group-hover:rotate-3'
                  } ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-slate-700/90 to-slate-800/90 shadow-2xl border-2 border-slate-600/60' 
                      : 'bg-gradient-to-br from-blue-50/90 to-purple-100/90 shadow-2xl border-2 border-blue-200/60'
                  } backdrop-blur-md`}>
                    <span className="filter drop-shadow-2xl">{service.icon}</span>
                  </div>

                  <div className="flex-1">
                    {/* Service Title */}
                    <h3 className={`text-4xl font-black mb-4 leading-tight ${
                      isDarkMode ? 'text-white' : 'text-slate-800'
                    }`}>
                      {service.title}
                    </h3>

                    {/* Service Number Badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-bold ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-amber-500/40 to-orange-500/40 text-amber-300 border border-amber-400/50' 
                        : 'bg-gradient-to-r from-amber-100 to-orange-200 text-amber-700 border border-amber-300'
                    }`}>
                      خدمة رقم {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Available Status */}
                  {service.available && (
                    <div className={`flex items-center gap-3 px-6 py-3 rounded-full text-lg font-bold backdrop-blur-md shadow-xl ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-emerald-500/30 to-green-500/30 text-emerald-300 border-2 border-emerald-500/50' 
                        : 'bg-gradient-to-r from-emerald-100/90 to-green-100/90 text-emerald-700 border-2 border-emerald-300/70'
                    }`}>
                      <CheckCircle className="w-5 h-5 animate-pulse" />
                      متاح الآن
                    </div>
                  )}
                </div>

                {/* Service Description */}
                <p className={`text-xl leading-relaxed mb-8 font-medium ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {service.description}
                </p>

                {/* Service Features */}
                <div className="mb-8">
                  <h4 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
                    isDarkMode ? 'text-cyan-300' : 'text-blue-600'
                  }`}>
                    <Star className="w-6 h-6" />
                    مميزات الخدمة
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getServiceFeatures(service).map((feature, idx) => (
                      <div key={idx} className={`flex items-center gap-3 p-4 rounded-xl border-2 ${
                        isDarkMode 
                          ? 'bg-slate-700/50 border-slate-600/40 text-slate-200' 
                          : 'bg-blue-50/50 border-blue-200/40 text-slate-700'
                      }`}>
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        <span className="font-semibold">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expand/Collapse Button */}
                <button
                  onClick={() => toggleServiceExpansion(service.id)}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-xl border-2 backdrop-blur-md ${
                    expandedServices.has(service.id)
                      ? (isDarkMode 
                          ? 'bg-blue-600/50 text-blue-200 border-blue-400/50 hover:bg-blue-700/50' 
                          : 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200')
                      : (isDarkMode 
                          ? 'bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-blue-600/30' 
                          : 'bg-slate-100/50 text-slate-700 border-slate-300/50 hover:bg-blue-50')
                  } shadow-xl hover:shadow-2xl`}
                >
                  {expandedServices.has(service.id) ? 'إخفاء التفاصيل' : 'عرض المزيد من التفاصيل'}
                  {expandedServices.has(service.id) ? 
                    <ChevronUp className="w-6 h-6" /> : 
                    <ChevronDown className="w-6 h-6" />
                  }
                </button>

                {/* Expanded Content */}
                {expandedServices.has(service.id) && (
                  <div className={`mt-8 p-8 rounded-2xl border-2 ${
                    isDarkMode 
                      ? 'bg-slate-700/30 border-slate-600/50' 
                      : 'bg-blue-50/30 border-blue-200/50'
                  } animate-fade-in`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                          isDarkMode ? 'bg-blue-500/30' : 'bg-blue-100'
                        }`}>
                          <Clock className={`w-8 h-8 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} />
                        </div>
                        <h5 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                          وقت الاستجابة
                        </h5>
                        <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          15-30 دقيقة
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                          isDarkMode ? 'bg-emerald-500/30' : 'bg-emerald-100'
                        }`}>
                          <Shield className={`w-8 h-8 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'}`} />
                        </div>
                        <h5 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                          الضمان
                        </h5>
                        <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          ضمان شامل 100%
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                          isDarkMode ? 'bg-amber-500/30' : 'bg-amber-100'
                        }`}>
                          <Star className={`w-8 h-8 ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`} />
                        </div>
                        <h5 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                          التقييم
                        </h5>
                        <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          5 نجوم ⭐⭐⭐⭐⭐
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced Call to Action Section */}
        <div className={`rounded-3xl p-16 text-center shadow-2xl border-2 relative overflow-hidden backdrop-blur-md ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-slate-600/50'
            : 'bg-gradient-to-br from-white/95 to-slate-50/95 border-slate-200/70'
        }`}>
          
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
              فريقنا المتخصص متاح في جميع الأوقات لتقديم أفضل خدمة وأسرع استجابة
            </p>

            {/* Action Buttons */}
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

            {/* Trust Indicators */}
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
                }`}>
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
                }`}>
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
                }`}>
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
