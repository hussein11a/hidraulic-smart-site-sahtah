import React, { useState, useEffect } from 'react';
import ModernNavigation from '@/components/ModernNavigation';
import ModernHero from '@/components/ModernHero';
import ModernServices from '@/components/ModernServices';
import ProcessSection from '@/components/ProcessSection';
import ContactMethods from '@/components/ContactMethods';
import FloatingNavigation from '@/components/FloatingNavigation';
import AnimatedCounter from '@/components/AnimatedCounter';
import LoadingSpinner from '@/components/LoadingSpinner';
import SecurityProvider from '@/components/SecurityProvider';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import SEOOptimizer from '@/components/SEOOptimizer';
import EnhancedSEO from '@/components/EnhancedSEO';
import AccessibilityEnhancer from '@/components/AccessibilityEnhancer';
import AdvancedPerformanceOptimizer from '@/components/AdvancedPerformanceOptimizer';
import UXEnhancer from '@/components/UXEnhancer';
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
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(isNightTime);
    }
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
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
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
    <SecurityProvider>
      <EnhancedSEO />
      <SEOOptimizer />
      <PerformanceMonitor />
      <AdvancedPerformanceOptimizer />
      <AccessibilityEnhancer isDarkMode={isDarkMode} />
      <UXEnhancer isDarkMode={isDarkMode} />
      
      <div className={`min-h-screen transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' 
          : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800'
      }`} dir="rtl" id="home">
        
        <main id="main-content">
          {/* Modern Navigation */}
          <ModernNavigation
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
            onPhoneCall={handlePhoneCall}
            onWhatsApp={handleWhatsApp}
          />

          {/* Modern Hero Section */}
          <ModernHero
            isDarkMode={isDarkMode}
            onPhoneCall={handlePhoneCall}
            onWhatsApp={handleWhatsApp}
          />

          {/* Statistics Section */}
          <section className={`py-20 ${isDarkMode ? 'bg-slate-800/30' : 'bg-white/50'}`} id="statistics" data-animate>
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {statistics.map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center p-8 rounded-3xl shadow-xl transition-all duration-500 hover:scale-105 border-2 ${
                      isDarkMode
                        ? 'bg-gradient-to-br from-slate-700/60 to-slate-800/60 border-slate-600 hover:border-blue-500/50'
                        : 'bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <stat.icon className={`h-10 w-10 mx-auto mb-4 ${stat.color}`} />
                    <div className={`text-3xl md:text-4xl font-black mb-2 ${
                      isDarkMode ? 'text-white' : 'text-slate-800'
                    }`}>
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className={`text-sm font-bold ${
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
          <section className={`py-20 ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`} id="features" data-animate>
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className={`text-4xl md:text-6xl font-black mb-6 ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  مميزاتنا الخاصة
                </h2>
                <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded-full mb-6"></div>
                <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  ما يجعلنا الخيار الأول لعملائنا
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`group p-8 rounded-3xl shadow-xl transition-all duration-500 hover:scale-105 border-2 text-center ${
                      isDarkMode
                        ? 'bg-gradient-to-br from-slate-700/60 to-slate-800/60 border-slate-600 hover:border-blue-500/50'
                        : 'bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold mb-4 ${
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

          {/* Modern Services Section */}
          <ModernServices services={services} isDarkMode={isDarkMode} />

          {/* Process Section */}
          <ProcessSection isDarkMode={isDarkMode} />

          {/* Testimonials Section */}
          <section className={`py-20 ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`} id="testimonials" data-animate>
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className={`text-4xl md:text-6xl font-black mb-6 ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  آراء عملائنا
                </h2>
                <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded-full mb-6"></div>
                <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  شهادات حقيقية من عملائنا الكرام
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className={`p-10 rounded-3xl shadow-xl border-2 text-center transition-all duration-500 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-slate-700/60 to-slate-800/60 border-slate-600'
                    : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
                }`}>
                  <div className="text-6xl mb-6">{testimonials[currentTestimonial].avatar}</div>
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current mx-1" />
                    ))}
                  </div>
                  <p className={`text-xl mb-6 italic leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    "{testimonials[currentTestimonial].comment}"
                  </p>
                  <h4 className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {testimonials[currentTestimonial].name}
                  </h4>
                </div>
                
                <div className="flex justify-center mt-8 gap-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? isDarkMode ? 'bg-amber-400 scale-125' : 'bg-amber-500 scale-125'
                          : isDarkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Methods Section */}
          <ContactMethods 
            isDarkMode={isDarkMode}
            onPhoneCall={handlePhoneCall}
            onWhatsApp={handleWhatsApp}
          />
        </main>

        {/* Floating Navigation */}
        <FloatingNavigation
          isDarkMode={isDarkMode}
          buttonsData={buttonsData}
          handlePhoneCall={handlePhoneCall}
          handleWhatsApp={handleWhatsApp}
        />

        {/* Footer */}
        <footer className={`py-20 mt-16 border-t-2 ${
          isDarkMode 
            ? 'border-amber-400/60 bg-gradient-to-b from-slate-900/98 to-slate-800' 
            : 'border-amber-300/60 bg-gradient-to-b from-amber-50/60 to-white'
        }`} role="contentinfo">
          <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center mb-8">
              <div className={`p-8 rounded-full shadow-xl border-2 transition-all duration-500 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-slate-800/60 border-slate-600' 
                  : 'bg-white border-slate-200'
              }`}>
                <div className="text-5xl animate-pulse">🚛</div>
              </div>
            </div>
            <h3 className={`text-4xl font-black mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              سطحة هيدروليك احترافية
            </h3>
            <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded-full mb-6"></div>
            <p className={`text-lg font-semibold mb-8 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              خدمة نقل السيارات الاحترافية © 2024
            </p>
            <p className={`text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              جميع الحقوق محفوظة • تم التطوير بأعلى معايير الجودة والأمان
            </p>
          </div>
        </footer>
      </div>
    </SecurityProvider>
  );
};

export default Index;
