
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

      {/* Header Section - Enhanced with better spacing */}
      <header className="relative overflow-hidden py-24 lg:py-40">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/30 via-transparent to-blue-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.1)_100%)]"></div>
        
        <div className="relative container mx-auto px-8 text-center">
          {/* Logo Section with improved styling */}
          <div className="flex justify-center mb-12">
            <div className={`relative p-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-500 border-4 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-700/40 to-blue-900/40 border-blue-400/30' 
                : 'bg-gradient-to-br from-white to-blue-50 border-blue-200'
            }`}>
              <div className="text-8xl lg:text-9xl">🚛</div>
              <div className="absolute -top-3 -right-3">
                <div className={`w-8 h-8 rounded-full animate-pulse shadow-lg ${
                  isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'
                }`}></div>
              </div>
            </div>
          </div>
          
          {/* Main Title with better typography */}
          <h1 className={`text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight ${
            isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-blue-300 to-slate-100' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-700 to-slate-900'
          }`}>
            {siteData.title}
          </h1>
          
          {/* Enhanced subtitle section */}
          <div className="max-w-5xl mx-auto mb-12">
            <p className={`text-3xl md:text-4xl lg:text-5xl mb-8 font-bold leading-relaxed ${
              isDarkMode ? 'text-slate-200' : 'text-slate-700'
            }`}>
              {siteData.subtitle}
            </p>
            <div className={`w-32 h-2 mx-auto rounded-full shadow-lg ${
              isDarkMode ? 'bg-gradient-to-r from-blue-400 to-slate-300' : 'bg-gradient-to-r from-blue-600 to-slate-600'
            }`}></div>
            <p className={`text-xl md:text-2xl mt-8 leading-relaxed max-w-3xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {siteData.description}
            </p>
          </div>

          {/* Enhanced Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className={`flex items-center gap-4 px-8 py-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 shadow-lg ${
              isDarkMode 
                ? 'bg-emerald-600/20 text-emerald-300 border-emerald-400/30 hover:bg-emerald-600/30 hover:shadow-emerald-400/20' 
                : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100 hover:shadow-emerald-200'
            }`}>
              <Shield className="h-7 w-7" />
              <span className="font-bold text-xl">خدمة موثوقة</span>
              <Star className="h-6 w-6 fill-current" />
            </div>
            <div className={`flex items-center gap-4 px-8 py-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 shadow-lg ${
              isDarkMode 
                ? 'bg-blue-600/20 text-blue-300 border-blue-400/30 hover:bg-blue-600/30 hover:shadow-blue-400/20' 
                : 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100 hover:shadow-blue-200'
            }`}>
              <Zap className="h-7 w-7" />
              <span className="font-bold text-xl">استجابة سريعة</span>
              <span className="text-lg font-semibold opacity-90">24/7</span>
            </div>
          </div>
        </div>
      </header>

      {/* Section Divider */}
      <div className={`w-full h-px ${isDarkMode ? 'bg-gradient-to-r from-transparent via-slate-600 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-300 to-transparent'}`}></div>

      {/* Services Section - Enhanced with better layout */}
      <section className="py-24 lg:py-40 relative">
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

      {/* Section Divider */}
      <div className={`w-full h-px ${isDarkMode ? 'bg-gradient-to-r from-transparent via-slate-600 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-300 to-transparent'}`}></div>

      {/* Enhanced CTA Section */}
      <section className={`py-24 lg:py-40 relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-r from-slate-900/90 via-slate-800/95 to-slate-900/90' 
          : 'bg-gradient-to-r from-slate-50 via-white to-slate-50'
      }`}>
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

      {/* Enhanced Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        {/* WhatsApp Button */}
        {buttonsData.whatsapp?.enabled && (
          <Button
            onClick={handleWhatsApp}
            className="w-18 h-18 rounded-full bg-green-600 hover:bg-green-700 shadow-2xl transition-all duration-300 hover:scale-110 group border-4 border-white/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-20 transition-opacity rounded-full"></div>
            <MessageSquare className="h-8 w-8 group-hover:scale-110 transition-transform relative z-10" />
          </Button>
        )}
        
        {/* Phone Button */}
        {buttonsData.phone?.enabled && (
          <Button
            onClick={handlePhoneCall}
            className="w-18 h-18 rounded-full bg-blue-600 hover:bg-blue-700 shadow-2xl transition-all duration-300 hover:scale-110 group border-4 border-white/20 animate-pulse-glow relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity rounded-full"></div>
            <Phone className="h-8 w-8 group-hover:scale-110 transition-transform relative z-10" />
          </Button>
        )}
      </div>

      {/* Enhanced Footer */}
      <footer className={`py-20 mt-8 border-t-4 ${
        isDarkMode 
          ? 'border-slate-700 bg-gradient-to-b from-slate-900/90 to-slate-800' 
          : 'border-slate-200 bg-gradient-to-b from-slate-50 to-white'
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
