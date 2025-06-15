
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloatingNavigation from '@/components/FloatingNavigation';
import AdvancedHero from '@/components/AdvancedHero';
import PricingSection from '@/components/PricingSection';
import ProcessSection from '@/components/ProcessSection';
import ContactMethods from '@/components/ContactMethods';
import FAQ from '@/components/FAQ';
import FloatingElements from '@/components/FloatingElements';
import AnimatedCounter from '@/components/AnimatedCounter';
import LoadingSpinner from '@/components/LoadingSpinner';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { Star, Shield, Clock, Users, Award, Zap, CheckCircle } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  available: boolean;
  sort_order: number;
}

interface SiteData {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  whatsapp: string;
}

interface ButtonsData {
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
}

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [siteData] = useState<SiteData>({
    title: 'سطحة هيدروليك',
    subtitle: 'خدمة نقل السيارات الاحترافية - سريع، آمن، موثوق',
    description: 'نحن نقدم خدمات نقل السيارات المعطلة والمساعدة على الطريق بأحدث المعدات الهيدروليكية',
    phone: '+966501234567',
    whatsapp: '+966501234567'
  });
  const [buttonsData] = useState<ButtonsData>({
    phone: {
      text: 'اتصل الآن',
      number: '+966501234567',
      enabled: true,
      color: '#1e40af'
    },
    whatsapp: {
      text: 'واتساب',
      number: '+966501234567',
      message: 'مرحبا، أحتاج خدمة سطحة هيدروليك',
      enabled: true,
      color: '#16a34a'
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Use performance optimization hook
  usePerformanceOptimization();

  // Smart theme detection
  useEffect(() => {
    const hour = new Date().getHours();
    const isNightTime = hour < 6 || hour > 20;
    setIsDarkMode(isNightTime);
  }, []);

  // Load services data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        const servicesResponse = await fetch('/src/data/services.json');
        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json();
          if (servicesData?.services && Array.isArray(servicesData.services)) {
            setServices(servicesData.services.sort((a: Service, b: Service) => a.sort_order - b.sort_order));
          }
        }
      } catch (error) {
        console.log('Using default services data');
        setServices([
          {
            id: 1,
            title: 'نقل السيارات المعطلة',
            description: 'خدمة نقل السيارات المعطلة بأحدث المعدات الهيدروليكية',
            icon: '🚛',
            available: true,
            sort_order: 1
          },
          {
            id: 2,
            title: 'مساعدة على الطريق',
            description: 'خدمة المساعدة الفورية على الطريق 24/7',
            icon: '🔧',
            available: true,
            sort_order: 2
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Testimonials rotation
  useEffect(() => {
    const testimonials = [0, 1, 2];
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handlePhoneCall = () => {
    try {
      if (buttonsData.phone?.enabled && buttonsData.phone?.number) {
        window.location.href = `tel:${buttonsData.phone.number}`;
      }
    } catch (error) {
      console.error('خطأ في فتح تطبيق الهاتف:', error);
    }
  };

  const handleWhatsApp = () => {
    try {
      if (buttonsData.whatsapp?.enabled && buttonsData.whatsapp?.number) {
        const message = encodeURIComponent(buttonsData.whatsapp.message || 'مرحبا');
        const cleanNumber = buttonsData.whatsapp.number.replace(/\+/g, '');
        window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('خطأ في فتح واتساب:', error);
    }
  };

  // Statistics data
  const statistics = [
    { icon: Users, value: 2500, label: 'عميل راضٍ', color: 'text-blue-500', suffix: '+' },
    { icon: Clock, value: 24, label: 'خدمة مستمرة', color: 'text-green-500', suffix: '/7' },
    { icon: Award, value: 5, label: 'سنوات خبرة', color: 'text-amber-500', suffix: '+' },
    { icon: CheckCircle, value: 99, label: 'نسبة نجاح', color: 'text-emerald-500', suffix: '%' }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'أحمد محمد',
      rating: 5,
      comment: 'خدمة ممتازة وسريعة، وصلوا في خلال 15 دقيقة ونقلوا السيارة بكل احترافية',
      avatar: '👨'
    },
    {
      name: 'فاطمة العلي',
      rating: 5,
      comment: 'تعاملهم راقي جداً والأسعار معقولة، أنصح بهم بشدة',
      avatar: '👩'
    },
    {
      name: 'محمد السعود',
      rating: 5,
      comment: 'فريق محترف ومعدات حديثة، حافظوا على سيارتي تماماً',
      avatar: '👨‍💼'
    }
  ];

  // Features data
  const features = [
    {
      icon: Shield,
      title: 'ضمان شامل',
      description: 'نضمن سلامة سيارتك أثناء النقل',
      color: 'bg-blue-500'
    },
    {
      icon: Zap,
      title: 'استجابة فورية',
      description: 'نصل إليك في أسرع وقت ممكن',
      color: 'bg-green-500'
    },
    {
      icon: Award,
      title: 'فريق محترف',
      description: 'سائقين ذوي خبرة عالية ومدربين',
      color: 'bg-amber-500'
    },
    {
      icon: Star,
      title: 'جودة عالية',
      description: 'معدات حديثة ومعايير عالمية',
      color: 'bg-purple-500'
    }
  ];

  if (isLoading) {
    return <LoadingSpinner isDarkMode={isDarkMode} />;
  }

  return (
    <div className={`min-h-screen transition-all duration-500 relative ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800'
    }`} dir="rtl">
      
      {/* Floating Background Elements */}
      <FloatingElements isDarkMode={isDarkMode} />
      
      {/* Theme Toggle */}
      <div className="fixed top-6 left-6 z-50">
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="sm"
          className={`rounded-full p-3 shadow-lg backdrop-blur-sm transition-all duration-500 hover:scale-110 ${
            isDarkMode 
              ? 'bg-slate-800/90 border-amber-400/60 hover:bg-slate-700' 
              : 'bg-white/90 border-amber-300/60 hover:bg-amber-50'
          }`}
        >
          {isDarkMode ? 
            <Sun className="h-5 w-5 text-amber-400" /> : 
            <Moon className="h-5 w-5 text-slate-600" />
          }
        </Button>
      </div>

      {/* Advanced Hero Section */}
      <AdvancedHero
        isDarkMode={isDarkMode}
        siteData={siteData}
        onPhoneCall={handlePhoneCall}
        onWhatsApp={handleWhatsApp}
      />

      {/* Statistics Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-slate-800/30' : 'bg-white/50'}`} id="statistics">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 border ${
                  isDarkMode
                    ? 'bg-slate-700/60 border-slate-600 hover:bg-slate-600/70'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className={`text-2xl md:text-3xl font-black mb-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className={`text-sm font-semibold ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`} id="features">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-5xl font-black mb-6 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              مميزاتنا
            </h2>
            <div className={`w-20 h-1 mx-auto rounded-full ${
              isDarkMode ? 'bg-gradient-to-r from-amber-400 to-blue-400' : 'bg-gradient-to-r from-amber-500 to-blue-500'
            }`}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 border text-center ${
                  isDarkMode
                    ? 'bg-slate-700/60 border-slate-600 hover:bg-slate-600/70'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-slate-800/30' : 'bg-white/50'}`} id="services">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-5xl font-black mb-6 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              خدماتنا
            </h2>
            <div className={`w-20 h-1 mx-auto rounded-full ${
              isDarkMode ? 'bg-gradient-to-r from-amber-400 to-blue-400' : 'bg-gradient-to-r from-amber-500 to-blue-500'
            }`}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 border ${
                  isDarkMode
                    ? 'bg-slate-700/60 border-slate-600 hover:bg-slate-600/70'
                    : 'bg-white border-slate-200 hover:bg-amber-50'
                }`}
              >
                <div className="p-6">
                  <div className="text-4xl mb-4 text-center">{service.icon}</div>
                  <h3 className={`text-lg font-bold mb-3 text-center ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed text-center ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection isDarkMode={isDarkMode} />

      {/* Testimonials Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`} id="testimonials">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-5xl font-black mb-6 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              آراء عملائنا
            </h2>
            <div className={`w-20 h-1 mx-auto rounded-full ${
              isDarkMode ? 'bg-gradient-to-r from-amber-400 to-blue-400' : 'bg-gradient-to-r from-amber-500 to-blue-500'
            }`}></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className={`p-8 rounded-2xl shadow-lg border text-center transition-all duration-500 ${
              isDarkMode
                ? 'bg-slate-700/60 border-slate-600'
                : 'bg-white border-slate-200'
            }`}>
              <div className="text-4xl mb-4">{testimonials[currentTestimonial].avatar}</div>
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className={`text-lg mb-4 italic ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                "{testimonials[currentTestimonial].comment}"
              </p>
              <h4 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                {testimonials[currentTestimonial].name}
              </h4>
            </div>
            
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? isDarkMode ? 'bg-amber-400' : 'bg-amber-500'
                      : isDarkMode ? 'bg-slate-600' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection isDarkMode={isDarkMode} onContact={handlePhoneCall} />

      {/* FAQ Section */}
      <FAQ isDarkMode={isDarkMode} />

      {/* Contact Methods Section */}
      <ContactMethods 
        isDarkMode={isDarkMode}
        onPhoneCall={handlePhoneCall}
        onWhatsApp={handleWhatsApp}
      />

      {/* Floating Navigation */}
      <FloatingNavigation
        isDarkMode={isDarkMode}
        buttonsData={buttonsData}
        handlePhoneCall={handlePhoneCall}
        handleWhatsApp={handleWhatsApp}
      />

      {/* Footer */}
      <footer className={`py-16 mt-8 border-t-2 ${
        isDarkMode 
          ? 'border-amber-400/60 bg-gradient-to-b from-slate-900/98 to-slate-800' 
          : 'border-amber-300/60 bg-gradient-to-b from-amber-50/60 to-white'
      }`}>
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <div className={`p-6 rounded-full shadow-lg border-2 transition-all duration-500 hover:scale-105 ${
              isDarkMode 
                ? 'bg-slate-800/60 border-slate-600' 
                : 'bg-white border-slate-200'
            }`}>
              <div className="text-4xl animate-pulse">🚛</div>
            </div>
          </div>
          <h3 className={`text-3xl font-black mb-4 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            سطحة هيدروليك
          </h3>
          <div className={`w-20 h-1 mx-auto rounded-full mb-6 ${
            isDarkMode ? 'bg-gradient-to-r from-blue-400 to-amber-400' : 'bg-gradient-to-r from-blue-600 to-amber-500'
          }`}></div>
          <p className={`text-lg font-semibold ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            خدمة نقل السيارات الاحترافية © 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
