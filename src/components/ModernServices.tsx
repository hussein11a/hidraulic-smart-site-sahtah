
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Clock, Shield, Star, CheckCircle } from 'lucide-react';

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
    <section className={`py-20 ${isDarkMode ? 'bg-slate-800/30' : 'bg-slate-50'}`} id="services">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-black mb-6 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            خدماتنا المتميزة
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded-full mb-6"></div>
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            نقدم مجموعة شاملة من خدمات نقل السيارات باستخدام أحدث التقنيات والمعدات
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className={`group relative overflow-hidden transition-all duration-500 hover:scale-105 border-2 cursor-pointer ${
                isDarkMode
                  ? 'bg-gradient-to-br from-slate-700/80 to-slate-800/80 border-slate-600 hover:border-blue-500/70 hover:shadow-blue-500/20'
                  : 'bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-blue-400 hover:shadow-blue-300/30'
              } ${hoveredService === service.id ? 'shadow-2xl scale-105' : 'shadow-lg'}`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Background Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                isDarkMode ? 'from-blue-400 to-amber-400' : 'from-blue-500 to-amber-500'
              }`}></div>

              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <div className={`w-full h-full rounded-full ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                }`}></div>
              </div>

              <div className="relative p-6 z-10">
                {/* Service Icon */}
                <div className="text-center mb-4">
                  <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-slate-600/60 to-slate-700/60 shadow-lg' 
                      : 'bg-gradient-to-br from-blue-50 to-indigo-100 shadow-md'
                  }`}>
                    {service.icon}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className={`text-lg font-bold mb-3 text-center leading-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className={`text-sm leading-relaxed text-center mb-4 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {service.description}
                </p>

                {/* Available Badge */}
                {service.available && (
                  <div className="text-center mb-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      isDarkMode 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-green-100 text-green-700 border border-green-200'
                    }`}>
                      <CheckCircle className="w-3 h-3" />
                      متاح الآن
                    </span>
                  </div>
                )}

                {/* Service Action Button */}
                <div className="text-center">
                  <Button
                    size="sm"
                    className={`w-full group transition-all duration-300 font-semibold ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-blue-500/30'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-400/40'
                    } hover:scale-105`}
                    onClick={handleWhatsApp}
                  >
                    <MessageCircle className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                    اطلب الخدمة
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className={`rounded-3xl p-8 text-center shadow-2xl border-2 ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-700/60 to-slate-800/60 border-slate-600'
            : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
        }`}>
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full ${
              isDarkMode ? 'bg-amber-500/20' : 'bg-amber-100'
            }`}>
              <Clock className={`w-8 h-8 ${
                isDarkMode ? 'text-amber-400' : 'text-amber-600'
              }`} />
            </div>
          </div>
          
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            خدمة على مدار 24 ساعة
          </h3>
          
          <p className={`text-lg mb-8 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            نحن متاحون في أي وقت لخدمتكم بأفضل جودة وأسرع استجابة
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button
              size="lg"
              onClick={handlePhoneCall}
              className={`flex-1 group transition-all duration-300 font-bold text-lg ${
                isDarkMode
                  ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl hover:shadow-green-500/40'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl hover:shadow-green-400/50'
              } hover:scale-105`}
            >
              <Phone className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              اتصل الآن
            </Button>
            
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className={`flex-1 group transition-all duration-300 font-bold text-lg ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-xl hover:shadow-blue-500/40'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-xl hover:shadow-blue-400/50'
              } hover:scale-105`}
            >
              <MessageCircle className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              واتساب
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-slate-300/20">
            <div className="flex items-center gap-2">
              <Shield className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              <span className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                ضمان شامل
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className={`w-5 h-5 ${isDarkMode ? 'text-amber-400' : 'text-amber-500'}`} />
              <span className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                تقييم 5 نجوم
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                خدمة سريعة
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernServices;
