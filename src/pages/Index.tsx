import React, { useState, useEffect } from 'react';
import ModernNavigation from '@/components/ModernNavigation';
import ModernHero from '@/components/ModernHero';
import ModernServices from '@/components/ModernServices';
import ProcessSection from '@/components/ProcessSection';
import ContactMethods from '@/components/ContactMethods';
// import FloatingNavigation from '@/components/FloatingNavigation'; // تم إزالة هذا الاستيراد
import LoadingSpinner from '@/components/LoadingSpinner';
import SecurityProvider from '@/components/SecurityProvider';
import ErrorBoundaryOptimized from '@/components/ErrorBoundaryOptimized';
import EnhancedSEO from '@/components/EnhancedSEO';
import AccessibilityEnhancer from '@/components/AccessibilityEnhancer';
import UXEnhancer from '@/components/UXEnhancer';
import MobileOptimizer from '@/components/MobileOptimizer';
import UltimatePerformanceBooster from '@/components/Modern/UltimatePerformanceBooster';
import Statistics from '@/components/Statistics';
import Features from '@/components/Features';
import AppFooter from '@/components/AppFooter';
import ChatBot from '@/components/AI/ChatBot';
import VoiceSearch from '@/components/Interactive/VoiceSearch';
import AdvancedAnimations from '@/components/Modern/AdvancedAnimations';
import SmartLoader from '@/components/Modern/SmartLoader';
import RealTimeAnalytics from '@/components/Analytics/RealTimeAnalytics';
import DynamicPricingCalculator from '@/components/Advanced/DynamicPricingCalculator';
import AdvancedTracking from '@/components/Modern/AdvancedTracking';
import SmartNotifications from '@/components/Interactive/SmartNotifications';
import { useIsMobile } from '@/hooks/use-mobile';
import { useServiceData } from '@/hooks/useServiceData';
import { useTheme } from '@/hooks/useTheme';


interface SiteData {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  whatsapp: string;
}


const Index = () => {
  const [siteData] = useState<SiteData>({
    title: 'سطحة هيدروليك',
    subtitle: 'خدمة نقل السيارات الاحترافية - سريع، آمن، موثوق',
    description: 'نحن نقدم خدمات نقل السيارات المعطلة والمساعدة على الطريق بأحدث المعدات الهيدروليكية',
    phone: "+966503269219",
    whatsapp: "+966503269219",
  });
  
  const isMobile = useIsMobile();
  const { services, isLoading } = useServiceData();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const handlePhoneCall = () => {
    window.location.href = "tel:+966503269219";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/966503269219?text=مرحبا، أحتاج خدمة سطحة هيدروليك", "_blank");
  };

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || showLoader) {
    return <SmartLoader isDarkMode={isDarkMode} />;
  }

  return (
    <ErrorBoundaryOptimized>
      <SecurityProvider>
      <UltimatePerformanceBooster />
      <EnhancedSEO />
      <AccessibilityEnhancer isDarkMode={isDarkMode} />
      <UXEnhancer isDarkMode={isDarkMode} />
      <MobileOptimizer isDarkMode={isDarkMode} isMobile={isMobile} />
      <AdvancedAnimations isDarkMode={isDarkMode} />
      <RealTimeAnalytics isDarkMode={isDarkMode} />
      <VoiceSearch 
        isDarkMode={isDarkMode}
        onPhoneCall={handlePhoneCall}
        onWhatsApp={handleWhatsApp}
      />
      <ChatBot isDarkMode={isDarkMode} />
      <DynamicPricingCalculator isDarkMode={isDarkMode} />
      <AdvancedTracking isDarkMode={isDarkMode} />
      <SmartNotifications isDarkMode={isDarkMode} />
      
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
          <Statistics isDarkMode={isDarkMode} />

          {/* Features Section */}
          <Features isDarkMode={isDarkMode} />

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


        {/* Footer */}
        <AppFooter isDarkMode={isDarkMode} />
      </div>
    </SecurityProvider>
    </ErrorBoundaryOptimized>
  );
};

export default Index;


