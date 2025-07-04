import React, { useState } from 'react';
import ModernNavigation from '@/components/ModernNavigation';
import ModernHero from '@/components/ModernHero';
import ModernServices from '@/components/ModernServices';
import ProcessSection from '@/components/ProcessSection';
import ContactMethods from '@/components/ContactMethods';
import FloatingNavigation from '@/components/FloatingNavigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import SecurityProvider from '@/components/SecurityProvider';
import ErrorBoundaryOptimized from '@/components/ErrorBoundaryOptimized';
import EnhancedSEO from '@/components/EnhancedSEO';
import AccessibilityEnhancer from '@/components/AccessibilityEnhancer';
import UXEnhancer from '@/components/UXEnhancer';
import MobileOptimizer from '@/components/MobileOptimizer';
import ConsolidatedPerformanceOptimizer from '@/components/ConsolidatedPerformanceOptimizer';
import Statistics from '@/components/Statistics';
import Features from '@/components/Features';
import AppFooter from '@/components/AppFooter';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { useIsMobile } from '@/hooks/use-mobile';
import { useServiceData } from '@/hooks/useServiceData';
import { useTheme } from '@/hooks/useTheme';
import { useContactHandlers } from '@/hooks/useContactHandlers';

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
  
  const isMobile = useIsMobile();
  const { services, isLoading } = useServiceData();
  const { isDarkMode, toggleTheme } = useTheme();
  const { handlePhoneCall, handleWhatsApp } = useContactHandlers(buttonsData);

  // Use performance optimization hook
  usePerformanceOptimization();

  if (isLoading) {
    return <LoadingSpinner isDarkMode={isDarkMode} />;
  }

  return (
    <ErrorBoundaryOptimized>
      <SecurityProvider>
      <ConsolidatedPerformanceOptimizer />
      <EnhancedSEO />
      <AccessibilityEnhancer isDarkMode={isDarkMode} />
      <UXEnhancer isDarkMode={isDarkMode} />
      <MobileOptimizer isDarkMode={isDarkMode} isMobile={isMobile} />
      
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

        {/* Floating Navigation */}
        <FloatingNavigation
          isDarkMode={isDarkMode}
          buttonsData={buttonsData}
          handlePhoneCall={handlePhoneCall}
          handleWhatsApp={handleWhatsApp}
        />

        {/* Footer */}
        <AppFooter isDarkMode={isDarkMode} />
      </div>
    </SecurityProvider>
    </ErrorBoundaryOptimized>
  );
};

export default Index;
