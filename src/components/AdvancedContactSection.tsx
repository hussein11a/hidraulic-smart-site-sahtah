
import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Clock, Star, Shield, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdvancedContactSectionProps {
  isDarkMode: boolean;
  buttonsData: {
    phone: {
      text: string;
      number: string;
      enabled: boolean;
      color: string;
    };
    whatsapp: {
      text: string;
      number: string;
      message: string;
      enabled: boolean;
      color: string;
    };
  };
  handlePhoneCall: () => void;
  handleWhatsApp: () => void;
}

const AdvancedContactSection: React.FC<AdvancedContactSectionProps> = ({
  isDarkMode,
  buttonsData,
  handlePhoneCall,
  handleWhatsApp
}) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "خدمة 24/7",
      description: "متاحون على مدار الساعة طوال أيام الأسبوع"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "استجابة سريعة",
      description: "متوسط وقت الوصول 15 دقيقة فقط"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "مؤمن بالكامل",
      description: "جميع عملياتنا مغطاة بالتأمين الشامل"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "خدمة مميزة",
      description: "تقييم 5 نجوم من أكثر من 2500 عميل"
    }
  ];

  const serviceAreas = [
    "الرياض والمناطق المحيطة",
    "جدة ومكة المكرمة",
    "الدمام والخبر",
    "المدينة المنورة",
    "الطائف وأبها",
    "تبوك والقصيم"
  ];

  return (
    <section className={`py-32 lg:py-48 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900/98 via-slate-800/95 to-slate-900/98' 
        : 'bg-gradient-to-br from-slate-50/90 via-white/95 to-amber-50/80'
    }`} id="contact">
      
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl ${
          isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
        } animate-pulse`}></div>
        <div className={`absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-5 blur-3xl ${
          isDarkMode ? 'bg-amber-500' : 'bg-amber-400'
        } animate-pulse`} style={{ animationDelay: '2s' }}></div>
        
        {/* Grid Pattern */}
        <div className={`absolute inset-0 opacity-5 ${
          isDarkMode ? 'bg-white' : 'bg-slate-900'
        }`} style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center gap-4 px-10 py-5 rounded-full mb-10 border-3 shadow-2xl ${
            isDarkMode 
              ? 'bg-slate-800/70 border-amber-400/50 text-amber-300' 
              : 'bg-white/90 border-amber-300/60 text-amber-700'
          } backdrop-blur-sm`}>
            <Phone className="w-7 h-7" />
            <span className="text-2xl font-bold">تواصل معنا الآن</span>
            <MessageSquare className="w-7 h-7" />
          </div>
          
          <h2 className={`text-8xl lg:text-9xl font-black mb-12 leading-none ${
            isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-blue-300 to-amber-300' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-600 to-amber-600'
          }`}>
            نحن هنا لخدمتك
          </h2>
          
          <div className={`w-56 h-4 mx-auto rounded-full mb-12 shadow-2xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-400 via-amber-400 to-slate-300' 
              : 'bg-gradient-to-r from-blue-600 via-amber-500 to-slate-600'
          }`}></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          
          {/* Contact Information & Features */}
          <div className="space-y-12">
            {/* Emergency Notice */}
            <div className={`p-8 rounded-3xl border-3 shadow-2xl ${
              isDarkMode 
                ? 'bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-400/50' 
                : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-300/60'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-red-600' : 'bg-red-500'
                }`}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-3xl font-bold ${
                  isDarkMode ? 'text-red-300' : 'text-red-700'
                }`}>
                  حالات الطوارئ
                </h3>
              </div>
              <p className={`text-xl leading-relaxed ${
                isDarkMode ? 'text-red-200' : 'text-red-600'
              }`}>
                في حالات الطوارئ، نصل إليك في أقل من 15 دقيقة داخل المدن الرئيسية
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2 ${
                    isDarkMode 
                      ? 'bg-slate-800/80 border-slate-600/50 hover:border-blue-400/50' 
                      : 'bg-white/90 border-slate-200/60 hover:border-blue-300'
                  } backdrop-blur-sm`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                    isDarkMode ? 'bg-blue-600/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {feature.icon}
                  </div>
                  <h4 className={`text-xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {feature.title}
                  </h4>
                  <p className={`text-lg ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Actions & Service Areas */}
          <div className="space-y-12">
            
            {/* Contact Buttons */}
            <div className="space-y-6">
              <h3 className={`text-4xl font-bold text-center mb-8 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                اتصل بنا الآن
              </h3>
              
              {/* Phone Button */}
              {buttonsData.phone?.enabled && (
                <Button
                  onClick={handlePhoneCall}
                  onMouseEnter={() => setHoveredButton('phone')}
                  onMouseLeave={() => setHoveredButton(null)}
                  className={`w-full h-20 text-2xl font-bold rounded-2xl transition-all duration-500 border-3 shadow-2xl ${
                    hoveredButton === 'phone' ? 'scale-105 shadow-3xl' : ''
                  } ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white border-amber-400/50' 
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-4">
                    <Phone className="w-8 h-8" />
                    <span>{buttonsData.phone.text}</span>
                    <span className="text-xl opacity-90">{buttonsData.phone.number}</span>
                  </div>
                </Button>
              )}

              {/* WhatsApp Button */}
              {buttonsData.whatsapp?.enabled && (
                <Button
                  onClick={handleWhatsApp}
                  onMouseEnter={() => setHoveredButton('whatsapp')}
                  onMouseLeave={() => setHoveredButton(null)}
                  className={`w-full h-20 text-2xl font-bold rounded-2xl transition-all duration-500 border-3 shadow-2xl ${
                    hoveredButton === 'whatsapp' ? 'scale-105 shadow-3xl' : ''
                  } ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-green-400/50' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-green-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-4">
                    <MessageSquare className="w-8 h-8" />
                    <span>{buttonsData.whatsapp.text}</span>
                    <span className="text-xl opacity-90">واتساب</span>
                  </div>
                </Button>
              )}
            </div>

            {/* Service Areas */}
            <div className={`p-8 rounded-3xl shadow-2xl border-2 ${
              isDarkMode 
                ? 'bg-slate-800/80 border-slate-600/50' 
                : 'bg-white/90 border-slate-200/60'
            } backdrop-blur-sm`}>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h4 className={`text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  مناطق الخدمة
                </h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceAreas.map((area, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-4 rounded-xl ${
                      isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'
                    }`}
                  >
                    <CheckCircle className={`w-5 h-5 ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`} />
                    <span className={`text-lg ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className={`inline-flex items-center gap-6 px-12 py-6 rounded-3xl border-4 transition-all duration-500 hover:scale-110 shadow-3xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-600/40 to-amber-600/40 text-blue-300 border-blue-400/60 hover:shadow-blue-400/40' 
              : 'bg-gradient-to-r from-blue-50 to-amber-50 text-blue-700 border-blue-300/80 hover:shadow-blue-200'
          } backdrop-blur-sm`}>
            <Star className="w-10 h-10 text-amber-500 fill-amber-500" />
            <div className="text-center">
              <div className="text-3xl font-bold">خدمة احترافية موثقة</div>
              <div className="text-xl opacity-90">أكثر من 10 سنوات من الخبرة</div>
            </div>
            <Shield className="w-10 h-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedContactSection;
