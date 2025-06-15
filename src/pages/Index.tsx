import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InteractiveServices from '@/components/InteractiveServices';
import AdvancedContactSection from '@/components/AdvancedContactSection';
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
      
      {/* Enhanced Theme Toggle */}
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

      {/* Enhanced Header Section */}
      <header className="relative overflow-hidden py-32 lg:py-56" id="home">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/20 via-transparent to-amber-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.1)_100%)]"></div>
        
        <div className="relative container mx-auto px-8 text-center z-10">
          {/* Ultra Enhanced Logo Section */}
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
              <div className="absolute top-4 left-4 animate-pulse" style={{ animationDelay: '2s' }}>
                <div className={`w-8 h-8 rounded-full shadow-lg ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                }`}></div>
              </div>
            </div>
          </div>
          
          {/* Ultra Enhanced Main Title */}
          <h1 className={`text-9xl md:text-[12rem] lg:text-[14rem] font-black mb-16 leading-none ${
            isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-amber-300 via-blue-300 to-slate-100' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-amber-600 via-blue-600 to-slate-900'
          } drop-shadow-2xl animate-pulse`}>
            {siteData.title}
          </h1>
          
          {/* Ultra Enhanced subtitle section */}
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

          {/* Ultra Enhanced Trust Badges */}
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

      {/* Enhanced Section Divider */}
      <div className={`w-full h-2 ${isDarkMode ? 'bg-gradient-to-r from-transparent via-amber-400/60 to-transparent' : 'bg-gradient-to-r from-transparent via-amber-500/60 to-transparent'} shadow-lg`}></div>

      {/* Interactive Services Section */}
      <InteractiveServices services={services} isDarkMode={isDarkMode} />

      {/* Enhanced Section Divider */}
      <div className={`w-full h-2 ${isDarkMode ? 'bg-gradient-to-r from-transparent via-amber-400/60 to-transparent' : 'bg-gradient-to-r from-transparent via-amber-500/60 to-transparent'} shadow-lg`}></div>

      {/* Advanced Contact Section */}
      <AdvancedContactSection
        isDarkMode={isDarkMode}
        buttonsData={buttonsData}
        handlePhoneCall={handlePhoneCall}
        handleWhatsApp={handleWhatsApp}
      />

      {/* Enhanced Floating Navigation */}
      <FloatingNavigation
        isDarkMode={isDarkMode}
        buttonsData={buttonsData}
        handlePhoneCall={handlePhoneCall}
        handleWhatsApp={handleWhatsApp}
      />

      {/* Ultra Enhanced Footer */}
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
