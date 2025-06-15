
import React, { useState, useEffect } from 'react';
import { ChevronUp, Phone, MessageSquare, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        {/* Quick Actions */}
        <div className={`transition-all duration-300 ${isExpanded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4 pointer-events-none'}`}>
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => scrollToSection('services')}
              className={`w-14 h-14 rounded-full shadow-xl transition-all duration-300 hover:scale-110 border-4 border-white/20 ${
                isDarkMode 
                  ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                  : 'bg-slate-600 hover:bg-slate-700 text-white'
              }`}
            >
              <Shield className="h-6 w-6" />
            </Button>
            <Button
              onClick={() => scrollToSection('statistics')}
              className={`w-14 h-14 rounded-full shadow-xl transition-all duration-300 hover:scale-110 border-4 border-white/20 ${
                isDarkMode 
                  ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
            >
              <Star className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Main Menu Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-4 border-white/20 ${
            isDarkMode 
              ? 'bg-slate-800 hover:bg-slate-700 text-white' 
              : 'bg-white hover:bg-slate-50 text-slate-800'
          } ${isExpanded ? 'rotate-45' : ''}`}
        >
          <div className="text-2xl">☰</div>
        </Button>

        {/* WhatsApp Button */}
        {buttonsData.whatsapp?.enabled && (
          <Button
            onClick={handleWhatsApp}
            className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 shadow-2xl transition-all duration-300 hover:scale-110 group border-4 border-white/20 relative overflow-hidden animate-pulse"
          >
            <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-20 transition-opacity rounded-full"></div>
            <MessageSquare className="h-7 w-7 group-hover:scale-110 transition-transform relative z-10" />
          </Button>
        )}
        
        {/* Phone Button */}
        {buttonsData.phone?.enabled && (
          <Button
            onClick={handlePhoneCall}
            className="w-16 h-16 rounded-full bg-amber-600 hover:bg-amber-700 shadow-2xl transition-all duration-300 hover:scale-110 group border-4 border-white/20 animate-pulse relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-20 transition-opacity rounded-full"></div>
            <Phone className="h-7 w-7 group-hover:scale-110 transition-transform relative z-10" />
          </Button>
        )}

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className={`w-14 h-14 rounded-full shadow-xl transition-all duration-300 hover:scale-110 border-4 border-white/20 ${
              isDarkMode 
                ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        )}
      </div>
    </>
  );
};

export default FloatingNavigation;
