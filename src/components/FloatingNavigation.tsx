
import React, { useState, useEffect } from 'react';
import { ChevronUp, Phone, MessageSquare, Star, Shield, Menu, X, Zap, Clock } from 'lucide-react';
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
  const [pulseAnimation, setPulseAnimation] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const pulseTimer = setTimeout(() => {
      setPulseAnimation(false);
    }, 5000);

    return () => clearTimeout(pulseTimer);
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
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Enhanced Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        
        {/* Quick Actions Menu */}
        <div className={`transition-all duration-500 transform ${
          isExpanded 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
        }`}>
          <div className="flex flex-col gap-4">
            
            {/* Services Button */}
            <Button
              onClick={() => scrollToSection('services')}
              className={`group relative w-16 h-16 rounded-2xl shadow-2xl transition-all duration-500 hover:scale-125 border-4 border-white/30 overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white' 
                  : 'bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Shield className="h-7 w-7 group-hover:scale-110 transition-transform relative z-10" />
              <div className="absolute -inset-1 bg-blue-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Button>

            {/* Quick Contact Button */}
            <Button
              onClick={() => scrollToSection('contact')}
              className={`group relative w-16 h-16 rounded-2xl shadow-2xl transition-all duration-500 hover:scale-125 border-4 border-white/30 overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white' 
                  : 'bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-amber-200/30 to-amber-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Star className="h-7 w-7 group-hover:scale-110 transition-transform relative z-10" />
              <div className="absolute -inset-1 bg-amber-400/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Button>

            {/* Fast Service Indicator */}
            <div className={`group relative w-16 h-16 rounded-2xl shadow-2xl transition-all duration-500 border-4 border-white/30 overflow-hidden flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-br from-emerald-600 to-emerald-500 text-white' 
                : 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/0 via-emerald-200/30 to-emerald-300/0 animate-pulse"></div>
              <div className="flex flex-col items-center justify-center relative z-10">
                <Clock className="h-4 w-4 mb-1" />
                <span className="text-xs font-bold">24/7</span>
              </div>
              <div className="absolute -inset-1 bg-emerald-400/30 rounded-2xl blur-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Menu Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`group relative w-20 h-20 rounded-3xl shadow-3xl transition-all duration-700 hover:scale-110 border-4 border-white/40 overflow-hidden ${
            isDarkMode 
              ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 hover:from-slate-700 hover:to-slate-600 text-white' 
              : 'bg-gradient-to-br from-white via-slate-50 to-white hover:from-slate-50 hover:to-slate-100 text-slate-800'
          } ${isExpanded ? 'rotate-180 scale-110' : 'hover:rotate-12'} ${pulseAnimation ? 'animate-pulse' : ''}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative z-10 transition-transform duration-700">
            {isExpanded ? (
              <X className="h-8 w-8 group-hover:scale-110 transition-transform" />
            ) : (
              <Menu className="h-8 w-8 group-hover:scale-110 transition-transform" />
            )}
          </div>
          <div className="absolute -inset-2 bg-blue-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </Button>

        {/* Enhanced WhatsApp Button */}
        {buttonsData.whatsapp?.enabled && (
          <Button
            onClick={handleWhatsApp}
            className="group relative w-20 h-20 rounded-3xl bg-gradient-to-br from-green-600 via-green-500 to-green-600 hover:from-green-500 hover:to-green-400 shadow-3xl transition-all duration-700 hover:scale-125 border-4 border-white/40 overflow-hidden animate-bounce"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-300/0 via-green-200/30 to-green-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-green-400/20 animate-ping rounded-3xl"></div>
            <MessageSquare className="h-9 w-9 group-hover:scale-125 transition-transform relative z-10 text-white" />
            <div className="absolute -inset-2 bg-green-400/40 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse"></div>
            
            {/* Floating notification badge */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
              <Zap className="h-3 w-3 text-white" />
            </div>
          </Button>
        )}
        
        {/* Enhanced Phone Button */}
        {buttonsData.phone?.enabled && (
          <Button
            onClick={handlePhoneCall}
            className="group relative w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 shadow-3xl transition-all duration-700 hover:scale-125 border-4 border-white/40 animate-pulse overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-amber-200/30 to-amber-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-amber-400/20 animate-ping rounded-3xl"></div>
            <Phone className="h-9 w-9 group-hover:scale-125 transition-transform relative z-10 text-white" />
            <div className="absolute -inset-2 bg-amber-400/40 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse"></div>
            
            {/* Call status indicator */}
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
          </Button>
        )}

        {/* Enhanced Scroll to Top Button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className={`group relative w-16 h-16 rounded-2xl shadow-2xl transition-all duration-700 hover:scale-125 border-4 border-white/30 overflow-hidden ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white' 
                : 'bg-gradient-to-br from-slate-100 to-slate-200 hover:from-white hover:to-slate-100 text-slate-800'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-400/0 via-slate-300/20 to-slate-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <ChevronUp className="h-7 w-7 group-hover:scale-110 group-hover:-translate-y-1 transition-transform relative z-10" />
            <div className="absolute -inset-1 bg-slate-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Button>
        )}
      </div>
    </>
  );
};

export default FloatingNavigation;
