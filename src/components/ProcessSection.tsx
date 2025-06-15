
import React from 'react';
import { Phone, MapPin, Truck, CheckCircle, Clock, Shield } from 'lucide-react';

interface ProcessSectionProps {
  isDarkMode: boolean;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ isDarkMode }) => {
  const steps = [
    {
      icon: Phone,
      title: 'اتصل بنا',
      description: 'اتصل بنا أو أرسل رسالة واتساب لطلب الخدمة',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500'
    },
    {
      icon: MapPin,
      title: 'حدد الموقع',
      description: 'أرسل لنا موقعك الحالي ووجهتك المطلوبة',
      color: 'text-green-500',
      bgColor: 'bg-green-500'
    },
    {
      icon: Truck,
      title: 'وصول السطحة',
      description: 'تصل إليك السطحة في الوقت المحدد مع السائق المحترف',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500'
    },
    {
      icon: CheckCircle,
      title: 'إتمام الخدمة',
      description: 'نقل آمن لسيارتك إلى الوجهة المطلوبة بكل احترافية',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500'
    }
  ];

  const features = [
    {
      icon: Clock,
      title: 'استجابة سريعة',
      description: '15-30 دقيقة وقت الوصول',
      color: 'text-blue-500'
    },
    {
      icon: Shield,
      title: 'ضمان شامل',
      description: 'تأمين كامل على السيارة',
      color: 'text-green-500'
    },
    {
      icon: CheckCircle,
      title: 'جودة عالية',
      description: 'معايير عالمية في الخدمة',
      color: 'text-amber-500'
    }
  ];

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-slate-800/30' : 'bg-white/50'}`} id="process">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-black mb-6 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            كيف تعمل الخدمة؟
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full mb-6 ${
            isDarkMode ? 'bg-gradient-to-r from-amber-400 to-blue-400' : 'bg-gradient-to-r from-amber-500 to-blue-500'
          }`}></div>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            خطوات بسيطة للحصول على خدمة نقل احترافية لسيارتك
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group relative text-center transition-all duration-500 hover:scale-105`}
            >
              {/* Connection Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className={`hidden lg:block absolute top-16 left-full w-full h-0.5 ${
                  isDarkMode ? 'bg-slate-600' : 'bg-slate-300'
                } z-0`}>
                  <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full ${
                    isDarkMode ? 'bg-slate-600' : 'bg-slate-300'
                  }`}></div>
                </div>
              )}

              <div className={`relative z-10 p-8 rounded-3xl shadow-lg border transition-all duration-500 group-hover:shadow-2xl ${
                isDarkMode
                  ? 'bg-slate-700/60 border-slate-600 hover:bg-slate-600/70'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}>
                {/* Step Number */}
                <div className={`absolute -top-4 -right-4 w-8 h-8 ${step.bgColor} text-white rounded-full flex items-center justify-center font-bold text-sm`}>
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className={`text-xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  {step.title}
                </h3>

                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl shadow-lg border text-center transition-all duration-500 hover:scale-105 ${
                isDarkMode
                  ? 'bg-slate-700/60 border-slate-600 hover:bg-slate-600/70'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <feature.icon className={`h-12 w-12 ${feature.color} mx-auto mb-4`} />
              <h3 className={`text-lg font-bold mb-3 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                {feature.title}
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className={`inline-block p-8 rounded-3xl shadow-2xl border-2 ${
            isDarkMode
              ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-400/50'
              : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              جاهز لطلب الخدمة؟
            </h3>
            <p className={`text-lg mb-6 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              تواصل معنا الآن واحصل على خدمة فورية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 text-green-500 font-semibold">
                <CheckCircle className="h-5 w-5" />
                <span>متاح 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-blue-500 font-semibold">
                <Shield className="h-5 w-5" />
                <span>مؤمن بالكامل</span>
              </div>
              <div className="flex items-center gap-2 text-amber-500 font-semibold">
                <Clock className="h-5 w-5" />
                <span>وصول سريع</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
