
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [services, setServices] = useState<Service[]>([
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
    },
    {
      id: 3,
      title: 'نقل المركبات الثقيلة',
      description: 'نقل آمن للمركبات الثقيلة والحافلات',
      icon: '🚚',
      available: true,
      sort_order: 3
    },
    {
      id: 4,
      title: 'خدمة الطوارئ',
      description: 'استجابة سريعة في حالات الطوارئ',
      icon: '🚨',
      available: true,
      sort_order: 4
    }
  ]);
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

  // Smart theme detection based on time
  useEffect(() => {
    const hour = new Date().getHours();
    const isNightTime = hour < 6 || hour > 20;
    setIsDarkMode(isNightTime);
  }, []);

  // Load JSON data safely
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        // Try to load services data
        try {
          const servicesResponse = await fetch('/src/data/services.json');
          if (servicesResponse.ok) {
            const servicesData = await servicesResponse.json();
            if (servicesData?.services && Array.isArray(servicesData.services)) {
              setServices(servicesData.services.sort((a: Service, b: Service) => a.sort_order - b.sort_order));
              console.log('تم تحميل بيانات الخدمات بنجاح');
            }
          }
        } catch (error) {
          console.log('استخدام البيانات الافتراضية للخدمات');
        }
      } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Security measures
  useEffect(() => {
    const handleContextMenu = (e: Event) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.ctrlKey && (
          e.keyCode === 67 || // Ctrl+C
          e.keyCode === 65 || // Ctrl+A
          e.keyCode === 85 || // Ctrl+U
          e.keyCode === 83 || // Ctrl+S
          e.keyCode === 80    // Ctrl+P
        )
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleDragStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    if (document.body.style) {
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    }

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      if (document.body.style) {
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
      }
    };
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

  // Show loading state
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
          className={`rounded-full p-5 shadow-2xl backdrop-blur-sm transition-all duration-500 border-3 hover:scale-125 transform ${
            isDarkMode 
              ? 'bg-slate-800/90 border-amber-400/60 hover:bg-slate-700 hover:border-amber-400 hover:shadow-amber-400/30' 
              : 'bg-white/90 border-amber-300/60 hover:bg-amber-50 hover:border-amber-400 hover:shadow-amber-200/50'
          }`}
        >
          {isDarkMode ? 
            <Sun className="h-7 w-7 text-amber-400 animate-pulse" /> : 
            <Moon className="h-7 w-7 text-slate-600 animate-pulse" />
          }
        </Button>
      </div>

      {/* Header Section */}
      <header className="relative overflow-hidden py-32 lg:py-56" id="home">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/20 via-transparent to-amber-900/20"></div>
        
        <div className="relative container mx-auto px-8 text-center z-10">
          {/* Logo Section */}
          <div className="flex justify-center mb-20">
            <div className={`relative p-16 rounded-full shadow-4xl transform hover:scale-110 transition-all duration-1000 border-4 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-700/70 to-amber-900/70 border-amber-400/50 shadow-amber-400/30' 
                : 'bg-gradient-to-br from-white to-amber-50 border-amber-300/70 shadow-amber-200/50'
            }`}>
              <div className="text-[10rem] lg:text-[14rem] animate-pulse">🚛</div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 animate-bounce">
                <div className={`w-16 h-16 rounded-full shadow-2xl ${
                  isDarkMode ? 'bg-amber-400 shadow-amber-400/60' : 'bg-amber-500 shadow-amber-300/60'
                }`}></div>
              </div>
              <div className="absolute -bottom-6 -left-6 animate-bounce" style={{ animationDelay: '1s' }}>
                <div className={`w-12 h-12 rounded-full shadow-xl ${
                  isDarkMode ? 'bg-slate-400' : 'bg-slate-500'
                }`}></div>
              </div>
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className={`text-9xl md:text-[12rem] lg:text-[14rem] font-black mb-16 leading-none ${
            isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-amber-300 via-blue-300 to-slate-100' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-amber-600 via-blue-600 to-slate-900'
          } drop-shadow-2xl animate-pulse`}>
            {siteData.title}
          </h1>
          
          {/* Subtitle section */}
          <div className="max-w-7xl mx-auto mb-20">
            <p className={`text-5xl md:text-6xl lg:text-7xl mb-16 font-bold leading-relaxed ${
              isDarkMode ? 'text-slate-200' : 'text-slate-700'
            }`}>
              {siteData.subtitle}
            </p>
            <div className={`w-56 h-4 mx-auto rounded-full shadow-2xl mb-6 ${
              isDarkMode ? 'bg-gradient-to-r from-amber-400 via-blue-400 to-slate-300' : 'bg-gradient-to-r from-amber-500 via-blue-500 to-slate-600'
            }`}></div>
            <p className={`text-3xl md:text-4xl mt-16 leading-relaxed max-w-5xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {siteData.description}
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-12 mb-24">
            <div className={`flex items-center gap-8 px-16 py-8 rounded-3xl border-4 transition-all duration-700 hover:scale-115 shadow-3xl animate-bounce ${
              isDarkMode 
                ? 'bg-emerald-600/40 text-emerald-300 border-emerald-400/50 hover:bg-emerald-600/50 hover:shadow-emerald-400/40' 
                : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100 hover:shadow-emerald-200'
            }`}>
              <div className="text-5xl">🛡️</div>
              <span className="font-bold text-3xl">خدمة موثوقة</span>
              <div className="text-3xl">⭐</div>
            </div>
            <div className={`flex items-center gap-8 px-16 py-8 rounded-3xl border-4 transition-all duration-700 hover:scale-115 shadow-3xl animate-pulse ${
              isDarkMode 
                ? 'bg-amber-600/40 text-amber-300 border-amber-400/50 hover:bg-amber-600/50 hover:shadow-amber-400/40' 
                : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100 hover:shadow-amber-200'
            }`}>
              <div className="text-5xl">⚡</div>
              <span className="font-bold text-3xl">استجابة سريعة</span>
              <span className="text-2xl font-semibold opacity-90">24/7</span>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className={`py-32 ${
        isDarkMode ? 'bg-slate-800/30' : 'bg-white/50'
      }`}>
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className={`text-6xl md:text-8xl font-black mb-8 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              خدماتنا
            </h2>
            <div className={`w-32 h-3 mx-auto rounded-full mb-8 ${
              isDarkMode ? 'bg-gradient-to-r from-amber-400 to-blue-400' : 'bg-gradient-to-r from-amber-500 to-blue-500'
            }`}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className={`group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 hover:scale-105 border-2 ${
                  isDarkMode
                    ? 'bg-slate-700/60 border-slate-600 hover:bg-slate-600/70 hover:border-amber-400/50'
                    : 'bg-white border-slate-200 hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                <div className="p-8">
                  <div className="text-6xl mb-6 text-center">{service.icon}</div>
                  <h3 className={`text-2xl font-bold mb-4 text-center ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-lg leading-relaxed text-center ${
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

      {/* Contact Section */}
      <section className={`py-32 ${
        isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'
      }`}>
        <div className="container mx-auto px-8 text-center">
          <h2 className={`text-6xl md:text-8xl font-black mb-12 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            تواصل معنا
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
            {/* Phone Button */}
            {buttonsData.phone.enabled && (
              <button
                onClick={handlePhoneCall}
                className={`group relative overflow-hidden rounded-3xl px-16 py-8 text-3xl font-bold transition-all duration-700 hover:scale-110 shadow-2xl border-4 min-w-[300px] ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400 hover:border-blue-300 hover:shadow-blue-400/50'
                    : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500 hover:border-blue-400 hover:shadow-blue-200'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-4">
                  📞 {buttonsData.phone.text}
                </span>
              </button>
            )}

            {/* WhatsApp Button */}
            {buttonsData.whatsapp.enabled && (
              <button
                onClick={handleWhatsApp}
                className={`group relative overflow-hidden rounded-3xl px-16 py-8 text-3xl font-bold transition-all duration-700 hover:scale-110 shadow-2xl border-4 min-w-[300px] ${
                  isDarkMode
                    ? 'bg-green-600 hover:bg-green-500 text-white border-green-400 hover:border-green-300 hover:shadow-green-400/50'
                    : 'bg-green-600 hover:bg-green-700 text-white border-green-500 hover:border-green-400 hover:shadow-green-200'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-4">
                  💬 {buttonsData.whatsapp.text}
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        {buttonsData.phone.enabled && (
          <button
            onClick={handlePhoneCall}
            className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-500 hover:scale-125 ${
              isDarkMode
                ? 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-400/50'
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-200'
            }`}
          >
            📞
          </button>
        )}
        
        {buttonsData.whatsapp.enabled && (
          <button
            onClick={handleWhatsApp}
            className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-500 hover:scale-125 ${
              isDarkMode
                ? 'bg-green-600 hover:bg-green-500 text-white hover:shadow-green-400/50'
                : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-green-200'
            }`}
          >
            💬
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className={`py-32 mt-16 border-t-4 ${
        isDarkMode 
          ? 'border-amber-400/60 bg-gradient-to-b from-slate-900/98 to-slate-800' 
          : 'border-amber-300/60 bg-gradient-to-b from-amber-50/60 to-white'
      }`}>
        <div className="container mx-auto px-8 text-center">
          <div className="flex justify-center mb-12">
            <div className={`p-10 rounded-full shadow-3xl border-4 transition-all duration-700 hover:scale-110 ${
              isDarkMode 
                ? 'bg-slate-800/60 border-slate-600' 
                : 'bg-white border-slate-200'
            }`}>
              <div className="text-8xl animate-pulse">🚛</div>
            </div>
          </div>
          <h3 className={`text-6xl font-black mb-8 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            سطحة هيدروليك
          </h3>
          <div className={`w-32 h-3 mx-auto rounded-full mb-12 shadow-2xl ${
            isDarkMode ? 'bg-gradient-to-r from-blue-400 via-amber-400 to-slate-300' : 'bg-gradient-to-r from-blue-600 via-amber-500 to-slate-600'
          }`}></div>
          <p className={`text-2xl font-semibold ${
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
