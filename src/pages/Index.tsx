
import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Moon, Sun, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [services, setServices] = useState([]);
  const [siteData, setSiteData] = useState({});
  const [buttonsData, setButtonsData] = useState({});

  // Smart theme detection based on time
  useEffect(() => {
    const hour = new Date().getHours();
    const isNightTime = hour < 6 || hour > 20;
    setIsDarkMode(isNightTime);
  }, []);

  // Load JSON data
  useEffect(() => {
    // Load services data
    const loadData = async () => {
      try {
        // Simulated data - in production, these would be loaded from JSON files
        const servicesData = [
          {
            id: 1,
            title: "نقل السيارات المعطلة",
            description: "خدمة نقل سريعة وآمنة للسيارات المعطلة على الطرق",
            icon: "🚗",
            available: true
          },
          {
            id: 2,
            title: "مساعدة على الطريق",
            description: "خدمة مساعدة فورية للسيارات المعطلة في أي مكان",
            icon: "🛠️",
            available: true
          },
          {
            id: 3,
            title: "نقل السيارات الفاخرة",
            description: "خدمة متخصصة لنقل السيارات الفاخرة بعناية قصوى",
            icon: "🏎️",
            available: true
          },
          {
            id: 4,
            title: "خدمة 24 ساعة",
            description: "متاحون على مدار الساعة لخدمتكم في أي وقت",
            icon: "⏰",
            available: true
          }
        ];

        const siteInfo = {
          title: "سطحة هيدروليك",
          subtitle: "خدمة نقل السيارات الاحترافية - سريع، آمن، موثوق",
          description: "نحن نقدم خدمات نقل السيارات المعطلة والمساعدة على الطريق بأحدث المعدات الهيدروليكية",
          phone: "+966501234567",
          whatsapp: "+966501234567"
        };

        const buttonsInfo = {
          phone: {
            text: "اتصل الآن",
            number: "+966501234567",
            enabled: true
          },
          whatsapp: {
            text: "واتساب",
            number: "+966501234567",
            message: "مرحبا، أحتاج خدمة سطحة هيدروليك",
            enabled: true
          }
        };

        setServices(servicesData);
        setSiteData(siteInfo);
        setButtonsData(buttonsInfo);
      } catch (error) {
        console.error('Error loading data:', error);
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
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-orange-50 text-slate-800'
    }`} dir="rtl">
      
      {/* Theme Toggle */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="sm"
          className={`rounded-full p-3 shadow-lg backdrop-blur-sm transition-all duration-300 ${
            isDarkMode 
              ? 'bg-slate-800/80 border-slate-600 hover:bg-slate-700' 
              : 'bg-white/80 border-slate-200 hover:bg-slate-50'
          }`}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      {/* Header Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-500/10"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full shadow-2xl ${
              isDarkMode ? 'bg-blue-600/20' : 'bg-blue-600/10'
            }`}>
              <div className="text-6xl">🚛</div>
            </div>
          </div>
          
          <h1 className={`text-5xl md:text-6xl font-bold mb-4 ${
            isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600'
          }`}>
            {siteData.title || 'سطحة هيدروليك'}
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {siteData.subtitle || 'خدمة نقل السيارات الاحترافية - سريع، آمن، موثوق'}
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              isDarkMode ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'
            }`}>
              <Shield className="h-5 w-5" />
              <span className="font-semibold">خدمة موثوقة</span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              isDarkMode ? 'bg-orange-600/20 text-orange-400' : 'bg-orange-100 text-orange-600'
            }`}>
              <Zap className="h-5 w-5" />
              <span className="font-semibold">استجابة سريعة</span>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            خدماتنا
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className={`p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50' 
                    : 'bg-white border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className={`text-xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {service.description}
                  </p>
                  {service.available && (
                    <div className={`inline-flex items-center gap-1 mt-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      isDarkMode ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'
                    }`}>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      متاح الآن
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-blue-900/50 to-slate-900/50' 
          : 'bg-gradient-to-r from-blue-600/10 to-orange-600/10'
      }`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className={`text-3xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            تحتاج مساعدة؟ نحن هنا من أجلك
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            خدمة على مدار 24 ساعة طوال أيام الأسبوع. اتصل بنا الآن للحصول على مساعدة فورية
          </p>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {/* WhatsApp Button */}
        {buttonsData.whatsapp?.enabled && (
          <Button
            onClick={handleWhatsApp}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl transition-all duration-300 hover:scale-110 group"
          >
            <MessageSquare className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </Button>
        )}
        
        {/* Phone Button */}
        {buttonsData.phone?.enabled && (
          <Button
            onClick={handlePhoneCall}
            className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-2xl transition-all duration-300 hover:scale-110 group"
          >
            <Phone className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </Button>
        )}
      </div>

      {/* Footer */}
      <footer className={`py-8 mt-16 border-t ${
        isDarkMode 
          ? 'border-slate-700 bg-slate-900/50' 
          : 'border-slate-200 bg-slate-50'
      }`}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="text-3xl">🚛</div>
          </div>
          <h3 className={`text-lg font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            سطحة هيدروليك
          </h3>
          <p className={`text-sm ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            خدمة نقل السيارات الاحترافية © 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
