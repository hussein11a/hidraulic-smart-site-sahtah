
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Star, Shield, Clock, Users, Award, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloatingNavigation from '@/components/FloatingNavigation';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';

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
    { icon: Users, value: '2500+', label: 'عميل راضٍ', color: 'text-blue-500' },
    { icon: Clock, value: '24/7', label: 'خدمة مستمرة', color: 'text-green-500' },
    { icon: Award, value: '5+', label: 'سنوات خبرة', color: 'text-amber-500' },
    { icon: CheckCircle, value: '99%', label: 'نسبة نجاح', color: 'text-emerald-500' }
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 relative ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800'
    }`} dir="rtl">
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent)] opacity-30' 
            : 'bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.2),transparent)] opacity-40'
        }`}></div>
      </div>
      
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

      {/* Header Section */}
      <header className="relative overflow-hidden py-20 lg:py-32" id="home">
        <div className="relative container mx-auto px-6 text-center z-10">
          {/* Logo Section */}
          <div className="flex justify-center mb-12">
            <div className={`relative p-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-700 border-2 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-700/70 to-amber-900/70 border-amber-400/50' 
                : 'bg-gradient-to-br from-white to-amber-50 border-amber-300/70'
            }`}>
              <div className="text-6xl lg:text-8xl animate-pulse">🚛</div>
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className={`text-4xl md:text-6xl lg:text-8xl font-black mb-8 leading-tight ${
            isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-amber-300 to-slate-100' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-amber-600 to-slate-900'
          } drop-shadow-lg`}>
            {siteData.title}
          </h1>
          
          {/* Subtitle */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className={`text-xl md:text-2xl lg:text-3xl mb-8 font-semibold leading-relaxed ${
              isDarkMode ? 'text-slate-200' : 'text-slate-700'
            }`}>
              {siteData.subtitle}
            </p>
            <div className={`w-32 h-1 mx-auto rounded-full mb-6 ${
              isDarkMode ? 'bg-gradient-to-r from-amber-400 to-blue-400' : 'bg-gradient-to-r from-amber-500 to-blue-500'
            }`}></div>
            <p className={`text-lg md:text-xl mt-8 leading-relaxed max-w-3xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {siteData.description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16">
            <Button
              onClick={handlePhoneCall}
              className="px-8 py-4 text-lg font-bold rounded-2xl bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              📞 {buttonsData.phone.text}
            </Button>
            <Button
              onClick={handleWhatsApp}
              className="px-8 py-4 text-lg font-bold rounded-2xl bg-green-600 hover:bg-green-700 text-white border-2 border-green-500 hover:border-green-400 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              💬 {buttonsData.whatsapp.text}
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className={`flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all duration-500 hover:scale-105 shadow-lg ${
              isDarkMode 
                ? 'bg-emerald-600/40 text-emerald-300 border-emerald-400/50' 
                : 'bg-emerald-50 text-emerald-700 border-emerald-300'
            }`}>
              <Shield className="h-5 w-5" />
              <span className="font-bold">خدمة موثوقة</span>
              <Star className="h-4 w-4" />
            </div>
            <div className={`flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all duration-500 hover:scale-105 shadow-lg ${
              isDarkMode 
                ? 'bg-amber-600/40 text-amber-300 border-amber-400/50' 
                : 'bg-amber-50 text-amber-700 border-amber-300'
            }`}>
              <Zap className="h-5 w-5" />
              <span className="font-bold">استجابة سريعة</span>
              <Clock className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

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
                  {stat.value}
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
            
            {/* Testimonial indicators */}
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

      {/* Contact Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-slate-800/30' : 'bg-white/50'}`} id="contact">
        <div className="container mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-5xl font-black mb-8 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            تواصل معنا
          </h2>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            <Button
              onClick={handlePhoneCall}
              className="w-full md:w-auto px-8 py-4 text-lg font-bold rounded-2xl bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              📞 {buttonsData.phone.text}
            </Button>

            <Button
              onClick={handleWhatsApp}
              className="w-full md:w-auto px-8 py-4 text-lg font-bold rounded-2xl bg-green-600 hover:bg-green-700 text-white border-2 border-green-500 hover:border-green-400 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              💬 {buttonsData.whatsapp.text}
            </Button>
          </div>
        </div>
      </section>

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
