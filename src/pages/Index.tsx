
import React, { useState, useEffect } from 'react';
import ModernNavigation from '@/components/ModernNavigation';
import ModernHero from '@/components/ModernHero';
import ModernServices from '@/components/ModernServices';
import ProcessSection from '@/components/ProcessSection';
import ContactMethods from '@/components/ContactMethods';
import FloatingNavigation from '@/components/FloatingNavigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import SecurityProvider from '@/components/SecurityProvider';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import SEOOptimizer from '@/components/SEOOptimizer';
import EnhancedSEO from '@/components/EnhancedSEO';
import AccessibilityEnhancer from '@/components/AccessibilityEnhancer';
import AdvancedPerformanceOptimizer from '@/components/AdvancedPerformanceOptimizer';
import UXEnhancer from '@/components/UXEnhancer';
import StatisticsSection from '@/components/StatisticsSection';
import FeaturesSection from '@/components/FeaturesSection';
import FooterSection from '@/components/FooterSection';
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
          <StatisticsSection isDarkMode={isDarkMode} />

          {/* Features Section */}
          <FeaturesSection isDarkMode={isDarkMode} />

          {/* Modern Services Section */}
          <ModernServices services={services} isDarkMode={isDarkMode} />

          {/* Process Section */}
          <ProcessSection isDarkMode={isDarkMode} />

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
        <FooterSection isDarkMode={isDarkMode} />
      </div>
    </SecurityProvider>
  );
};

export default Index;
