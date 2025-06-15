
import React from 'react';
import { Check, Star, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingSectionProps {
  isDarkMode: boolean;
  onContact: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ isDarkMode, onContact }) => {
  const packages = [
    {
      name: 'الباقة الأساسية',
      price: 'حسب المسافة',
      description: 'للنقل داخل المدينة',
      features: [
        'نقل داخل المدينة',
        'استجابة سريعة',
        'سائق محترف',
        'ضمان السلامة'
      ],
      popular: false,
      color: 'blue'
    },
    {
      name: 'الباقة المتقدمة',
      price: 'عرض خاص',
      description: 'للنقل بين المدن',
      features: [
        'نقل بين المدن',
        'خدمة 24/7',
        'تأمين شامل',
        'تتبع المركبة',
        'خدمة الطوارئ'
      ],
      popular: true,
      color: 'green'
    },
    {
      name: 'الباقة المميزة',
      price: 'استشارة مجانية',
      description: 'للسيارات الفاخرة',
      features: [
        'نقل السيارات الفاخرة',
        'معدات متخصصة',
        'فريق خبير',
        'حماية كاملة',
        'خدمة VIP',
        'تقرير مفصل'
      ],
      popular: false,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string, popular: boolean = false) => {
    const baseClasses = {
      blue: {
        bg: isDarkMode ? 'bg-blue-600/20 border-blue-400/50' : 'bg-blue-50 border-blue-200',
        button: 'bg-blue-600 hover:bg-blue-700 border-blue-500',
        accent: 'text-blue-500'
      },
      green: {
        bg: isDarkMode ? 'bg-green-600/20 border-green-400/50' : 'bg-green-50 border-green-200',
        button: 'bg-green-600 hover:bg-green-700 border-green-500',
        accent: 'text-green-500'
      },
      purple: {
        bg: isDarkMode ? 'bg-purple-600/20 border-purple-400/50' : 'bg-purple-50 border-purple-200',
        button: 'bg-purple-600 hover:bg-purple-700 border-purple-500',
        accent: 'text-purple-500'
      }
    };

    return baseClasses[color as keyof typeof baseClasses] || baseClasses.blue;
  };

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`} id="pricing">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-black mb-6 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            باقات الخدمة
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full mb-6 ${
            isDarkMode ? 'bg-gradient-to-r from-amber-400 to-blue-400' : 'bg-gradient-to-r from-amber-500 to-blue-500'
          }`}></div>
          <p className={`text-xl ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            اختر الباقة التي تناسب احتياجاتك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
            const colors = getColorClasses(pkg.color, pkg.popular);
            return (
              <div
                key={index}
                className={`relative p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 border-2 ${
                  colors.bg
                } ${pkg.popular ? 'transform scale-105 ring-4 ring-amber-400/50' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-amber-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      الأكثر طلباً
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-black mb-4 ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {pkg.name}
                  </h3>
                  <div className={`text-3xl font-black mb-2 ${colors.accent}`}>
                    {pkg.price}
                  </div>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {pkg.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className={`h-5 w-5 ${colors.accent} flex-shrink-0`} />
                      <span className={`${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <Button
                    onClick={onContact}
                    className={`w-full py-3 rounded-xl font-bold text-white border-2 transition-all duration-300 hover:scale-105 shadow-lg ${colors.button}`}
                  >
                    <Phone className="h-5 w-5 ml-2" />
                    اطلب الخدمة
                  </Button>
                  <Button
                    onClick={onContact}
                    variant="outline"
                    className={`w-full py-3 rounded-xl font-bold border-2 transition-all duration-300 hover:scale-105 ${
                      isDarkMode
                        ? 'border-slate-600 text-slate-300 hover:bg-slate-700'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <MessageSquare className="h-5 w-5 ml-2" />
                    استفسار
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className={`text-lg ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            جميع الأسعار شاملة الضريبة المضافة
          </p>
          <p className={`text-sm mt-2 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            للحصول على عرض سعر مخصص، تواصل معنا مباشرة
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
