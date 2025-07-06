import React, { useState, useEffect, useCallback } from 'react';
import { ChevronUp, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

interface FloatingNavigationProps {
  isDarkMode: boolean;
  buttonsData: {
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
  };
  handlePhoneCall: () => void;
  handleWhatsApp: () => void;
}

const FloatingNavigation: React.FC<FloatingNavigationProps> = ({
  isDarkMode,
  buttonsData,
  handlePhoneCall,
  handleWhatsApp
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Handle scroll to show/hide scroll-to-top button
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setShowScrollTop(currentScrollY > 300);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Enhanced handlers with toast notifications
  const handlePhoneCallWithToast = useCallback(() => {
    handlePhoneCall();
    toast({
      title: "جاري الاتصال...",
      description: `الاتصال بـ ${buttonsData.phone.number}`,
      duration: 3000,
    });
  }, [handlePhoneCall, buttonsData.phone.number, toast]);

  const handleWhatsAppWithToast = useCallback(() => {
    handleWhatsApp();
    toast({
      title: "فتح واتساب...",
      description: "جاري تحضير الرسالة",
      duration: 2000,
    });
  }, [handleWhatsApp, toast]);

  // WhatsApp Icon Component
  const WhatsAppIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.515z"/>
    </svg>
  );

  return (
    <>
      {/* Fixed Floating Buttons Container - Always Visible */}
      <div className={`fixed ${isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'} flex flex-col ${isMobile ? 'gap-3' : 'gap-4'} z-[9999]`}>
        
        {/* WhatsApp Button - Always Visible */}
        {buttonsData.whatsapp?.enabled && (
          <Button
            onClick={handleWhatsAppWithToast}
            className={`
              group relative ${isMobile ? 'w-14 h-14' : 'w-16 h-16'} 
              rounded-full shadow-2xl transition-all duration-300 
              hover:scale-110 border-2 backdrop-blur-sm overflow-hidden
              ${isDarkMode 
                ? 'bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 border-green-400/50 text-white' 
                : 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 border-green-300/50 text-white'
              }
            `}
            aria-label={buttonsData.whatsapp.text}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-green-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Icon */}
            <WhatsAppIcon className={`${isMobile ? 'h-6 w-6' : 'h-7 w-7'} relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300`} />
            
            {/* Subtle pulse animation */}
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse opacity-50"></div>
          </Button>
        )}

        {/* Phone Button - Always Visible */}
        {buttonsData.phone?.enabled && (
          <Button
            onClick={handlePhoneCallWithToast}
            className={`
              group relative ${isMobile ? 'w-14 h-14' : 'w-16 h-16'} 
              rounded-full shadow-2xl transition-all duration-300 
              hover:scale-110 border-2 backdrop-blur-sm overflow-hidden
              ${isDarkMode 
                ? 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border-blue-400/50 text-white' 
                : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 border-blue-300/50 text-white'
              }
            `}
            aria-label={buttonsData.phone.text}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Icon */}
            <Phone className={`${isMobile ? 'h-6 w-6' : 'h-7 w-7'} relative z-10 drop-shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} />
            
            {/* Subtle pulse animation */}
            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse opacity-50"></div>
          </Button>
        )}

        {/* Scroll to Top Button - Shows after scrolling */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className={`
              group relative ${isMobile ? 'w-14 h-14' : 'w-16 h-16'} 
              rounded-full shadow-2xl transition-all duration-300 
              hover:scale-110 border-2 backdrop-blur-sm overflow-hidden
              ${isDarkMode 
                ? 'bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border-slate-500/50 text-white' 
                : 'bg-gradient-to-br from-slate-200 to-slate-300 hover:from-slate-100 hover:to-slate-200 border-slate-400/50 text-slate-700'
              }
            `}
            aria-label="العودة للأعلى"
          >
            {/* Glow Effect */}
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-slate-400/20' : 'bg-slate-600/20'} rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            {/* Icon */}
            <ChevronUp className={`${isMobile ? 'h-6 w-6' : 'h-7 w-7'} relative z-10 drop-shadow-lg group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300`} />
          </Button>
        )}
      </div>
    </>
  );
};

export default FloatingNavigation;