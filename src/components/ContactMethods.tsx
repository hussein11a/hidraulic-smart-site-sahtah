
import React from 'react';
import { Phone, MessageSquare, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactMethodsProps {
  isDarkMode: boolean;
  onPhoneCall: () => void;
  onWhatsApp: () => void;
}

const ContactMethods: React.FC<ContactMethodsProps> = ({ 
  isDarkMode, 
  onPhoneCall, 
  onWhatsApp 
}) => {
  const contactMethods = [
    {
      icon: Phone,
      title: 'اتصال مباشر',
      description: 'تواصل معنا عبر الهاتف للحصول على خدمة فورية',
      phone: '+966501234567',
      color: 'bg-blue-500'
    },
    {
      icon: MessageSquare,
      title: 'واتساب',
      description: 'أرسل رسالة واتساب وسنرد عليك فوراً',
      phone: '+966501234567',
      color: 'bg-green-500'
    }
  ];

  const businessInfo = [
    {
      icon: Clock,
      title: 'ساعات العمل',
      info: '24 ساعة / 7 أيام'
    },
    {
      icon: MapPin,
      title: 'منطقة الخدمة',
      info: 'جميع أنحاء المملكة'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      info: 'info@hydraulic-tow.sa'
    }
  ];

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-slate-800/30' : 'bg-white/50'}`} id="contact-methods">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-black mb-6 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            طرق التواصل
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full mb-6 ${
            isDarkMode ? 'bg-gradient-to-r from-amber-400 to-blue-400' : 'bg-gradient-to-r from-amber-500 to-blue-500'
          }`}></div>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            نحن متاحون لخدمتك على مدار الساعة
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className={`group p-8 rounded-3xl shadow-2xl border transition-all duration-500 hover:scale-105 ${
                isDarkMode
                  ? 'bg-slate-700/60 border-slate-600 hover:bg-slate-600/70'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <method.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                {method.title}
              </h3>
              
              <p className={`text-lg mb-6 leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {method.description}
              </p>
              
              <div className={`w-full p-4 rounded-xl border-2 border-dashed transition-all duration-300 text-center ${
                isDarkMode 
                  ? 'border-slate-500 bg-slate-800/30' 
                  : 'border-slate-300 bg-slate-50'
              }`}>
                <p className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  رقم الهاتف
                </p>
                <p 
                  className={`text-2xl font-bold select-all cursor-text ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}
                  dir="ltr"
                >
                  {method.phone}
                </p>
                <p className={`text-xs mt-2 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  اضغط لتحديد ونسخ الرقم
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Business Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {businessInfo.map((info, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl shadow-lg border text-center transition-all duration-500 hover:scale-105 ${
                isDarkMode
                  ? 'bg-slate-700/60 border-slate-600 hover:bg-slate-600/70'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <info.icon className={`h-8 w-8 mx-auto mb-4 ${
                isDarkMode ? 'text-amber-400' : 'text-blue-500'
              }`} />
              <h3 className={`text-lg font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                {info.title}
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {info.info}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;
