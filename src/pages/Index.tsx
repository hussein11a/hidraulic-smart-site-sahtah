
import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Moon, Sun, Shield, Zap, Star } from 'lucide-react';
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
  const [services, setServices] = useState<Service[]>([]);
  const [siteData, setSiteData] = useState<SiteData>({
    title: 'سطحة هيدروليك',
    subtitle: 'خدمة نقل السيارات الاحترافية - سريع، آمن، موثوق',
    description: 'نحن نقدم خدمات نقل السيارات المعطلة والمساعدة على الطريق بأحدث المعدات الهيدروليكية',
    phone: '+966501234567',
    whatsapp: '+966501234567'
  });
  const [buttonsData, setButtonsData] = useState<ButtonsData>({
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

  // Smart theme detection based on time
  useEffect(() => {
    const hour = new Date().getHours();
    const isNightTime = hour < 6 || hour > 20;
    setIsDarkMode(isNightTime);
  }, []);

  // Load JSON data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load services data
        const servicesResponse = await fetch('/src/data/services.json');
        const servicesData = await servicesResponse.json();
        setServices(servicesData.services.sort((a: Service, b: Service) => a.sort_order - b.sort_order));

        // Load site data
        const siteResponse = await fetch('/src/data/site.json');
        const siteInfo = await siteResponse.json();
        setSiteData(siteInfo);

        // Load buttons data
        const buttonsResponse = await fetch('/src/data/buttons.json');
        const buttonsInfo = await buttonsResponse.json();
        setButtonsData(buttonsInfo);
      } catch (error) {
        console.error('Error loading data:', error);
        // Keep default data if loading fails
      }
    };

    loadData();
  }, []);

  // Security measures
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable text selection and copy shortcuts
    const handleKeyDown = (e) => {
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

    // Disable drag
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    // Disable text selection
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handlePhoneCall = () => {
    if (buttonsData.phone?.enabled) {
      window.location.href = `tel:${buttonsData.phone.number}`;
    }
  };

  const handleWhatsApp = () => {
    if (buttonsData.whatsapp?.enabled) {
      const message = encodeURIComponent(buttonsData.whatsapp.message || 'مرحبا');
      window.open(`https://wa.me/${buttonsData.whatsapp.number.replace('+', '')}?text=${message}`, '_blank');
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800'
    }`} dir="rtl">
      
      {/* Theme Toggle */}
      <div className="fixed top-6 left-6 z-50">
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="sm"
          className={`rounded-full p-3 shadow-xl backdrop-blur-sm transition-all duration-300 border-2 ${
            isDarkMode 
              ? 'bg-slate-800/90 border-slate-600 hover:bg-slate-700 hover:border-slate-500' 
              : 'bg-white/90 border-slate-300 hover:bg-slate-50 hover:border-slate-400'
          }`}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Header Section - Enhanced */}
      <header className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-amber-600/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.1)_100%)]"></div>
        
        <div className="relative container mx-auto px-6 text-center">
          {/* Logo Section */}
          <div className="flex justify-center mb-8">
            <div className={`relative p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 ${
              isDarkMode ? 'bg-gradient-to-br from-blue-700/30 to-amber-600/30' : 'bg-gradient-to-br from-blue-100 to-amber-100'
            }`}>
              <div className="text-7xl lg:text-8xl">🚛</div>
              <div className="absolute -top-2 -right-2">
                <div className={`w-6 h-6 rounded-full animate-pulse ${
                  isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'
                }`}></div>
              </div>
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className={`text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight ${
            isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-amber-400' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-700 to-amber-600'
          }`}>
            {siteData.title}
          </h1>
          
          {/* Subtitle */}
          <div className="max-w-4xl mx-auto mb-10">
            <p className={`text-2xl md:text-3xl lg:text-4xl mb-6 font-semibold leading-relaxed ${
              isDarkMode ? 'text-slate-200' : 'text-slate-700'
            }`}>
              {siteData.subtitle}
            </p>
            <div className={`w-24 h-1 mx-auto rounded-full ${
              isDarkMode ? 'bg-gradient-to-r from-blue-400 to-amber-400' : 'bg-gradient-to-r from-blue-600 to-amber-600'
            }`}></div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-600/30' 
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
            }`}>
              <Shield className="h-6 w-6" />
              <span className="font-bold text-lg">خدمة موثوقة</span>
              <Star className="h-5 w-5 fill-current" />
            </div>
            <div className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-amber-600/20 text-amber-300 border-amber-500/30 hover:bg-amber-600/30' 
                : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
            }`}>
              <Zap className="h-6 w-6" />
              <span className="font-bold text-lg">استجابة سريعة</span>
              <span className="text-sm opacity-80">24/7</span>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section - Enhanced */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className={`text-5xl lg:text-6xl font-black mb-6 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              خدماتنا المتميزة
            </h2>
            <div className={`w-32 h-1 mx-auto rounded-full mb-8 ${
              isDarkMode ? 'bg-gradient-to-r from-blue-400 to-amber-400' : 'bg-gradient-to-r from-blue-600 to-amber-600'
            }`}></div>
            <p className={`text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              نقدم مجموعة شاملة من خدمات النقل الاحترافية بأحدث التقنيات
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group p-8 rounded-3xl shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl transform hover:-translate-y-2 border-2 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-slate-600/50 hover:border-blue-400/50 hover:bg-gradient-to-br hover:from-slate-700/90 hover:to-slate-600/90' 
                    : 'bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white'
                } animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center">
                  {/* Service Icon */}
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  
                  {/* Service Title */}
                  <h3 className={`text-2xl font-bold mb-4 group-hover:text-blue-500 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {service.title}
                  </h3>
                  
                  {/* Service Description */}
                  <p className={`text-base leading-relaxed mb-6 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {service.description}
                  </p>
                  
                  {/* Availability Badge */}
                  {service.available && (
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 ${
                      isDarkMode 
                        ? 'bg-emerald-600/30 text-emerald-300 border-emerald-400/50' 
                        : 'bg-emerald-100 text-emerald-700 border-emerald-300'
                    }`}>
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                      متاح الآن
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className={`py-20 lg:py-32 relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-slate-800/80' 
          : 'bg-gradient-to-r from-blue-50 via-white to-amber-50'
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)]"></div>
        <div className="container mx-auto px-6 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-5xl lg:text-6xl font-black mb-8 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              تحتاج مساعدة؟
            </h2>
            <h3 className={`text-3xl lg:text-4xl font-bold mb-8 ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              نحن هنا من أجلك
            </h3>
            <div className={`w-24 h-1 mx-auto rounded-full mb-10 ${
              isDarkMode ? 'bg-gradient-to-r from-blue-400 to-amber-400' : 'bg-gradient-to-r from-blue-600 to-amber-600'
            }`}></div>
            <p className={`text-2xl lg:text-3xl mb-12 leading-relaxed font-medium ${
              isDarkMode ? 'text-slate-200' : 'text-slate-700'
            }`}>
              خدمة على مدار <span className={`font-black ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>24 ساعة</span> طوال أيام الأسبوع
            </p>
            <p className={`text-xl mb-16 leading-relaxed ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              اتصل بنا الآن للحصول على مساعدة فورية واحترافية
            </p>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons - Enhanced */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        {/* WhatsApp Button */}
        {buttonsData.whatsapp?.enabled && (
          <Button
            onClick={handleWhatsApp}
            className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 shadow-2xl transition-all duration-300 hover:scale-110 group border-4 border-white/20"
          >
            <MessageSquare className="h-7 w-7 group-hover:scale-110 transition-transform" />
          </Button>
        )}
        
        {/* Phone Button */}
        {buttonsData.phone?.enabled && (
          <Button
            onClick={handlePhoneCall}
            className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 shadow-2xl transition-all duration-300 hover:scale-110 group border-4 border-white/20 animate-pulse-glow"
          >
            <Phone className="h-7 w-7 group-hover:scale-110 transition-transform" />
          </Button>
        )}
      </div>

      {/* Footer - Enhanced */}
      <footer className={`py-16 mt-20 border-t-2 ${
        isDarkMode 
          ? 'border-slate-700 bg-gradient-to-b from-slate-900/80 to-slate-800' 
          : 'border-slate-200 bg-gradient-to-b from-slate-50 to-white'
      }`}>
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="text-5xl">🚛</div>
          </div>
          <h3 className={`text-3xl font-black mb-4 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            سطحة هيدروليك
          </h3>
          <div className={`w-16 h-1 mx-auto rounded-full mb-6 ${
            isDarkMode ? 'bg-gradient-to-r from-blue-400 to-amber-400' : 'bg-gradient-to-r from-blue-600 to-amber-600'
          }`}></div>
          <p className={`text-lg font-medium ${
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
