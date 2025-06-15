
import React, { useState } from 'react';
import { ChevronRight, Star, Clock, Shield, Zap } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  available: boolean;
  sort_order: number;
  features?: string[];
  responseTime?: string;
  rating?: number;
}

interface InteractiveServicesProps {
  services: Service[];
  isDarkMode: boolean;
}

const InteractiveServices: React.FC<InteractiveServicesProps> = ({ services, isDarkMode }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getServiceFeatures = (service: Service) => {
    const defaultFeatures = [
      "خدمة احترافية متخصصة",
      "معدات حديثة ومتطورة",
      "فريق ذو خبرة عالية",
      "ضمان الجودة والأمان"
    ];
    return service.features || defaultFeatures;
  };

  return (
    <section className="py-32 lg:py-48 relative overflow-hidden" id="services">
      {/* Background Effects */}
      <div className={`absolute inset-0 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95' 
          : 'bg-gradient-to-br from-slate-50/90 via-white/95 to-amber-50/80'
      }`}></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl ${
          isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
        } animate-pulse`}></div>
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl ${
          isDarkMode ? 'bg-amber-500' : 'bg-amber-400'
        } animate-pulse`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-24">
          <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-full mb-8 border-2 shadow-xl ${
            isDarkMode 
              ? 'bg-slate-800/60 border-slate-600/50 text-slate-300' 
              : 'bg-white/80 border-slate-200/60 text-slate-600'
          }`}>
            <Shield className="w-6 h-6" />
            <span className="text-xl font-bold">خدماتنا المتميزة</span>
            <Star className="w-6 h-6 text-amber-500" />
          </div>
          
          <h2 className={`text-7xl lg:text-8xl font-black mb-12 leading-none ${
            isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-blue-300 to-amber-300' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-600 to-amber-600'
          }`}>
            حلول متكاملة
          </h2>
          
          <div className={`w-48 h-3 mx-auto rounded-full mb-12 shadow-2xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-400 via-amber-400 to-slate-300' 
              : 'bg-gradient-to-r from-blue-600 via-amber-500 to-slate-600'
          }`}></div>
          
          <p className={`text-3xl lg:text-4xl max-w-5xl mx-auto leading-relaxed font-medium ${
            isDarkMode ? 'text-slate-200' : 'text-slate-700'
          }`}>
            نقدم مجموعة شاملة من الخدمات الاحترافية بأحدث التقنيات والمعدات المتطورة
          </p>
        </div>

        {/* Interactive Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative overflow-hidden rounded-3xl transition-all duration-700 cursor-pointer transform ${
                hoveredIndex === index ? 'scale-110 -translate-y-4' : 'hover:scale-105 hover:-translate-y-2'
              } ${
                selectedService?.id === service.id 
                  ? 'ring-4 ring-blue-400/50 shadow-3xl' 
                  : 'shadow-2xl hover:shadow-3xl'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedService(selectedService?.id === service.id ? null : service)}
            >
              {/* Card Background */}
              <div className={`absolute inset-0 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-800/95 to-slate-700/95' 
                  : 'bg-gradient-to-br from-white/95 to-slate-50/90'
              } backdrop-blur-sm`}></div>
              
              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-blue-500/20 to-amber-500/20' 
                  : 'bg-gradient-to-br from-blue-100/60 to-amber-100/60'
              }`}></div>

              {/* Content */}
              <div className="relative z-10 p-10">
                {/* Service Icon */}
                <div className={`text-8xl mb-8 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 p-6 rounded-2xl ${
                  hoveredIndex === index 
                    ? (isDarkMode ? 'bg-blue-400/20 shadow-2xl' : 'bg-blue-50/80 shadow-xl')
                    : ''
                }`}>
                  {service.icon}
                </div>

                {/* Service Title */}
                <h3 className={`text-2xl lg:text-3xl font-bold mb-6 transition-all duration-300 ${
                  isDarkMode 
                    ? 'text-white group-hover:text-blue-300' 
                    : 'text-slate-800 group-hover:text-blue-600'
                }`}>
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className={`text-lg leading-relaxed mb-8 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {service.description}
                </p>

                {/* Status & Features */}
                <div className="space-y-4">
                  {service.available && (
                    <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-base font-bold border-2 shadow-lg ${
                      isDarkMode 
                        ? 'bg-emerald-600/30 text-emerald-300 border-emerald-400/50' 
                        : 'bg-emerald-100 text-emerald-700 border-emerald-300'
                    }`}>
                      <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse shadow-lg"></div>
                      متاح الآن
                      <Clock className="w-4 h-4" />
                    </div>
                  )}

                  {/* Expand Button */}
                  <button className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-lg border-2 ${
                    selectedService?.id === service.id
                      ? (isDarkMode 
                          ? 'bg-blue-600/50 text-blue-200 border-blue-400/50' 
                          : 'bg-blue-100 text-blue-700 border-blue-300')
                      : (isDarkMode 
                          ? 'bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-blue-600/30 hover:border-blue-400/50' 
                          : 'bg-slate-100/50 text-slate-700 border-slate-300/50 hover:bg-blue-50 hover:border-blue-300')
                  }`}>
                    {selectedService?.id === service.id ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                      selectedService?.id === service.id ? 'rotate-90' : ''
                    }`} />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedService?.id === service.id && (
                <div className={`absolute inset-x-0 top-full z-20 p-8 rounded-b-3xl border-2 border-t-0 shadow-2xl ${
                  isDarkMode 
                    ? 'bg-slate-800/95 border-slate-600/50 text-slate-200' 
                    : 'bg-white/95 border-slate-200/60 text-slate-700'
                } backdrop-blur-sm animate-fade-in`}>
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    مميزات الخدمة
                  </h4>
                  <ul className="space-y-2">
                    {getServiceFeatures(service).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className={`inline-flex items-center gap-4 px-12 py-6 rounded-2xl border-3 transition-all duration-300 hover:scale-110 shadow-2xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-600/30 to-amber-600/30 text-blue-300 border-blue-400/50 hover:shadow-blue-400/30' 
              : 'bg-gradient-to-r from-blue-50 to-amber-50 text-blue-700 border-blue-300 hover:shadow-blue-200'
          }`}>
            <Star className="w-8 h-8 text-amber-500" />
            <span className="text-2xl font-bold">اختر الخدمة المناسبة لك</span>
            <Shield className="w-8 h-8" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveServices;
