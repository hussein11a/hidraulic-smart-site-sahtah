import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Statistics from '@/components/Statistics';
import FloatingNavigation from '@/components/FloatingNavigation';
import AdvancedEffects from '@/components/AdvancedEffects';

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
    <div className={`min-h-screen transition-all duration-500 relative ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800'
    }`} dir="rtl">
      
      {/* Advanced Background Effects */}
      <AdvancedEffects isDarkMode={isDarkMode} />
      
      {/* Theme Toggle */}
      <div className="fixed top-6 left-6 z-50">
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="sm"
          className={`rounded-full p-4 shadow-2xl backdrop-blur-sm transition-all duration-300 border-2 hover:scale-110 ${
            isDarkMode 
              ? 'bg-slate-800/90 border-amber-400/50 hover:bg-slate-700 hover:border-amber-400' 
              : 'bg-white/90 border-amber-300/50 hover:bg-amber-50 hover:border-amber-400'
          }`}
        >
          {isDarkMode ? <Sun className="h-6 w-6 text-amber-400" /> : <Moon className="h-6 w-6 text-slate-600" />}
        </Button>
      </div>

      {/* Header Section */}
      <header className="relative overflow-hidden py-32 lg:py-48" id="home">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/20 via-transparent to-amber-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.1)_100%)]"></div>
        
        <div className="relative container mx-auto px-8 text-center z-10">
          {/* Enhanced Logo Section */}
          <div className="flex justify-center mb-16">
            <div className={`relative p-12 rounded-full shadow-3xl transform hover:scale-110 transition-all duration-700 border-4 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-700/60 to-amber-900/60 border-amber-400/40 shadow-amber-400/20' 
                : 'bg-gradient-to-br from-white to-amber-50 border-amber-300/60 shadow-amber-200/40'
            }`}>
              <div className="text-9xl lg:text-[12rem] animate-pulse">🚛</div>
              <div className="absolute -top-4 -right-4">
                <div className={`w-12 h-12 rounded-full animate-pulse shadow-2xl ${
                  isDarkMode ? 'bg-amber-400 shadow-amber-400/50' : 'bg-amber-500 shadow-amber-300/50'
                }`}></div>
              </div>
              <div className="absolute -bottom-4 -left-4">
                <div className={`w-8 h-8 rounded-full animate-bounce shadow-xl ${
                  isDarkMode ? 'bg-slate-400' : 'bg-slate-500'
                }`}></div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Main Title */}
          <h1 className={`text-8xl md:text-9xl lg:text-[10rem] font-black mb-12 leading-none ${
            isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-amber-300 to-slate-100' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-amber-600 to-slate-900'
          } drop-shadow-2xl`}>
            {siteData.title}
          </h1>
          
          {/* Enhanced subtitle section */}
          <div className="max-w-6xl mx-auto mb-16">
            <p className={`text-4xl md:text-5xl lg:text-6xl mb-12 font-bold leading-relaxed ${
              isDarkMode ? 'text-slate-200' : 'text-slate-700'
            }`}>
              {siteData.subtitle}
            </p>
            <div className={`w-40 h-3 mx-auto rounded-full shadow-2xl ${
              isDarkMode ? 'bg-gradient-to-r from-amber-400 to-slate-300' : 'bg-gradient-to-r from-amber-500 to-slate-600'
            }`}></div>
            <p className={`text-2xl md:text-3xl mt-12 leading-relaxed max-w-4xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {siteData.description}
            </p>
          </div>

          {/* Enhanced Trust Badges with animations */}
          <div className="flex flex-wrap justify-center gap-8 mb-20">
            <div className={`flex items-center gap-6 px-12 py-6 rounded-3xl border-3 transition-all duration-500 hover:scale-110 shadow-2xl animate-bounce ${
              isDarkMode 
                ? 'bg-emerald-600/30 text-emerald-300 border-emerald-400/40 hover:bg-emerald-600/40 hover:shadow-emerald-400/30' 
                : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100 hover:shadow-emerald-200'
            }`}>
              <div className="text-3xl">🛡️</div>
              <span className="font-bold text-2xl">خدمة موثوقة</span>
              <div className="text-2xl">⭐</div>
            </div>
            <div className={`flex items-center gap-6 px-12 py-6 rounded-3xl border-3 transition-all duration-500 hover:scale-110 shadow-2xl animate-pulse ${
              isDarkMode 
                ? 'bg-amber-600/30 text-amber-300 border-amber-400/40 hover:bg-amber-600/40 hover:shadow-amber-400/30' 
                : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100 hover:shadow-amber-200'
            }`}>
              <div className="text-3xl">⚡</div>
              <span className="font-bold text-2xl">استجابة سريعة</span>
              <span className="text-xl font-semibold opacity-90">24/7</span>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Section Divider */}
      <div className={`w-full h-1 ${isDarkMode ? 'bg-gradient-to-r from-transparent via-amber-400/50 to-transparent' : 'bg-gradient-to-r from-transparent via-amber-500/50 to-transparent'}`}></div>

      {/* Services Section */}
      <section className="py-32 lg:py-48 relative" id="services">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-b from-slate-900/50 via-slate-800/30 to-slate-900/50' : 'bg-gradient-to-b from-slate-50/80 via-white/90 to-slate-50/80'}`}></div>
        <div className="container mx-auto px-8 relative">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <div className={`inline-block px-6 py-3 rounded-full mb-6 border-2 ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-600 text-slate-300' 
                : 'bg-white border-slate-200 text-slate-600'
            }`}>
              <span className="text-lg font-semibold">ماذا نقدم</span>
            </div>
            <h2 className={`text-6xl lg:text-7xl font-black mb-8 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              خدماتنا المتميزة
            </h2>
            <div className={`w-40 h-2 mx-auto rounded-full mb-10 shadow-lg ${
              isDarkMode ? 'bg-gradient-to-r from-blue-400 to-slate-300' : 'bg-gradient-to-r from-blue-600 to-slate-600'
            }`}></div>
            <p className={`text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed font-medium ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              نقدم مجموعة شاملة من خدمات النقل الاحترافية بأحدث التقنيات والمعدات المتطورة
            </p>
          </div>
          
          {/* Enhanced Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group p-10 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl transform hover:-translate-y-3 border-2 relative overflow-hidden ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-slate-800/90 to-slate-700/90 border-slate-600/50 hover:border-blue-400/50' 
                    : 'bg-gradient-to-br from-white to-slate-50/80 border-slate-200 hover:border-blue-300 hover:shadow-blue-100/50'
                } animate-fade-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                } transform translate-x-8 -translate-y-8`}></div>
                
                <div className="text-center relative z-10">
                  {/* Enhanced Service Icon */}
                  <div className={`text-7xl mb-8 transform group-hover:scale-110 transition-transform duration-300 p-4 rounded-2xl ${
                    isDarkMode ? 'group-hover:bg-blue-400/10' : 'group-hover:bg-blue-50'
                  }`}>
                    {service.icon}
                  </div>
                  
                  {/* Service Title */}
                  <h3 className={`text-2xl font-bold mb-6 group-hover:text-blue-500 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {service.title}
                  </h3>
                  
                  {/* Service Description */}
                  <p className={`text-lg leading-relaxed mb-8 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {service.description}
                  </p>
                  
                  {/* Enhanced Availability Badge */}
                  {service.available && (
                    <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-base font-bold border-2 shadow-lg ${
                      isDarkMode 
                        ? 'bg-emerald-600/30 text-emerald-300 border-emerald-400/50' 
                        : 'bg-emerald-100 text-emerald-700 border-emerald-300'
                    }`}>
                      <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse shadow-lg"></div>
                      متاح الآن
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <Statistics isDarkMode={isDarkMode} />

      {/* Enhanced Section Divider */}
      <div className={`w-full h-1 ${isDarkMode ? 'bg-gradient-to-r from-transparent via-amber-400/50 to-transparent' : 'bg-gradient-to-r from-transparent via-amber-500/50 to-transparent'}`}></div>

      {/* Enhanced CTA Section */}
      <section className={`py-32 lg:py-48 relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-r from-slate-900/95 via-slate-800/98 to-slate-900/95' 
          : 'bg-gradient-to-r from-amber-50/80 via-white to-slate-50/90'
      }`} id="contact">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)]"></div>
        
        {/* Decorative elements */}
        <div className={`absolute top-10 left-10 w-32 h-32 rounded-full opacity-20 ${
          isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
        } blur-3xl`}></div>
        <div className={`absolute bottom-10 right-10 w-40 h-40 rounded-full opacity-20 ${
          isDarkMode ? 'bg-slate-400' : 'bg-slate-600'
        } blur-3xl`}></div>
        
        <div className="container mx-auto px-8 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className={`inline-block px-6 py-3 rounded-full mb-8 border-2 ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-600 text-slate-300' 
                : 'bg-white border-slate-200 text-slate-600'
            }`}>
              <span className="text-lg font-semibold">تواصل معنا</span>
            </div>
            
            <h2 className={`text-6xl lg:text-7xl font-black mb-10 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              تحتاج مساعدة؟
            </h2>
            
            <h3 className={`text-4xl lg:text-5xl font-bold mb-10 ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              نحن هنا من أجلك
            </h3>
            
            <div className={`w-32 h-2 mx-auto rounded-full mb-12 shadow-lg ${
              isDarkMode ? 'bg-gradient-to-r from-blue-400 to-slate-300' : 'bg-gradient-to-r from-blue-600 to-slate-600'
            }`}></div>
            
            <div className={`p-10 rounded-3xl mb-12 border-2 ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-600/50' 
                : 'bg-white/80 border-slate-200'
            } shadow-2xl`}>
              <p className={`text-3xl lg:text-4xl mb-8 leading-relaxed font-bold ${
                isDarkMode ? 'text-slate-200' : 'text-slate-700'
              }`}>
                خدمة على مدار <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>24 ساعة</span> طوال أيام الأسبوع
              </p>
              <p className={`text-xl leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                اتصل بنا الآن للحصول على مساعدة فورية واحترافية في أي وقت
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Floating Navigation */}
      <FloatingNavigation
        isDarkMode={isDarkMode}
        buttonsData={buttonsData}
        handlePhoneCall={handlePhoneCall}
        handleWhatsApp={handleWhatsApp}
      />

      {/* Enhanced Footer */}
      <footer className={`py-24 mt-12 border-t-4 ${
        isDarkMode 
          ? 'border-amber-400/50 bg-gradient-to-b from-slate-900/95 to-slate-800' 
          : 'border-amber-300/50 bg-gradient-to-b from-amber-50/50 to-white'
      }`}>
        <div className="container mx-auto px-8 text-center">
          <div className="flex justify-center mb-8">
            <div className={`p-6 rounded-full shadow-xl border-4 ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-600' 
                : 'bg-white border-slate-200'
            }`}>
              <div className="text-6xl">🚛</div>
            </div>
          </div>
          <h3 className={`text-4xl font-black mb-6 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            سطحة هيدروليك
          </h3>
          <div className={`w-24 h-2 mx-auto rounded-full mb-8 shadow-lg ${
            isDarkMode ? 'bg-gradient-to-r from-blue-400 to-slate-300' : 'bg-gradient-to-r from-blue-600 to-slate-600'
          }`}></div>
          <p className={`text-xl font-semibold ${
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
