
import React, { useState, useEffect } from 'react';
import { ChevronUp, Phone, MessageSquare, Star, Shield, Menu, X, Zap, Clock, MapPin, Users, Camera, Heart, Sparkles, Navigation, Home, Info, Mail } from 'lucide-react';
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
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [buttonAnimations, setButtonAnimations] = useState<{[key: string]: boolean}>({});

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
    }, 8000);

    return () => clearTimeout(pulseTimer);
  }, []);

  // Advanced animation cycling
  useEffect(() => {
    const animationCycle = setInterval(() => {
      const buttons = ['whatsapp', 'phone', 'services', 'contact'];
      const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
      setButtonAnimations(prev => ({ ...prev, [randomButton]: true }));
      
      setTimeout(() => {
        setButtonAnimations(prev => ({ ...prev, [randomButton]: false }));
      }, 2000);
    }, 5000);

    return () => clearInterval(animationCycle);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setActiveButton('scroll');
    setTimeout(() => setActiveButton(null), 1000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsExpanded(false);
      setActiveButton(sectionId);
      setTimeout(() => setActiveButton(null), 1000);
    }
  };

  const handleButtonHover = (buttonId: string, isHover: boolean) => {
    if (isHover) {
      setActiveButton(buttonId);
      setIsHovering(true);
    } else {
      setActiveButton(null);
      setIsHovering(false);
    }
  };

  return (
    <>
      {/* Ultra Advanced Floating Action Buttons Hub */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-6 z-50">
        
        {/* Ultra Enhanced Quick Actions Menu */}
        <div className={`transition-all duration-700 transform ${
          isExpanded 
            ? 'opacity-100 translate-y-0 scale-100 rotate-0' 
            : 'opacity-0 translate-y-12 scale-50 rotate-45 pointer-events-none'
        }`}>
          <div className="flex flex-col gap-6">
            
            {/* Ultra Enhanced Home Button */}
            <Button
              onClick={() => scrollToSection('home')}
              onMouseEnter={() => handleButtonHover('home', true)}
              onMouseLeave={() => handleButtonHover('home', false)}
              className={`group relative w-20 h-20 rounded-3xl shadow-3xl transition-all duration-700 hover:scale-135 border-4 border-white/50 overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-blue-700 via-blue-600 to-purple-700 hover:from-blue-600 hover:to-purple-600 text-white' 
                  : 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white'
              } ${activeButton === 'home' ? 'scale-125 rotate-12' : ''} ${buttonAnimations.home ? 'animate-bounce' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/0 via-blue-200/40 to-purple-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
              <div className="absolute inset-0 bg-blue-400/30 animate-ping rounded-3xl opacity-0 group-hover:opacity-50"></div>
              <Home className="h-9 w-9 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10" />
              <div className="absolute -inset-3 bg-blue-400/40 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
              
              {/* Floating particles */}
              <div className="absolute -top-2 -right-1 w-3 h-3 bg-blue-300 rounded-full animate-bounce opacity-60"></div>
              <div className="absolute -bottom-1 -left-2 w-2 h-2 bg-purple-300 rounded-full animate-ping opacity-70"></div>
            </Button>

            {/* Ultra Enhanced Services Button */}
            <Button
              onClick={() => scrollToSection('services')}
              onMouseEnter={() => handleButtonHover('services', true)}
              onMouseLeave={() => handleButtonHover('services', false)}
              className={`group relative w-20 h-20 rounded-3xl shadow-3xl transition-all duration-700 hover:scale-135 border-4 border-white/50 overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white' 
                  : 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white'
              } ${activeButton === 'services' ? 'scale-125 -rotate-12' : ''} ${buttonAnimations.services ? 'animate-pulse' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/0 via-emerald-200/40 to-teal-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-emerald-400/30 animate-ping rounded-3xl opacity-0 group-hover:opacity-50"></div>
              <Shield className="h-9 w-9 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500 relative z-10" />
              <div className="absolute -inset-3 bg-emerald-400/40 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Service status indicator */}
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </Button>

            {/* Ultra Enhanced Contact Button */}
            <Button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => handleButtonHover('contact', true)}
              onMouseLeave={() => handleButtonHover('contact', false)}
              className={`group relative w-20 h-20 rounded-3xl shadow-3xl transition-all duration-700 hover:scale-135 border-4 border-white/50 overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-orange-700 via-amber-600 to-yellow-700 hover:from-orange-600 hover:to-yellow-600 text-white' 
                  : 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-600 hover:from-orange-400 hover:to-yellow-500 text-white'
              } ${activeButton === 'contact' ? 'scale-125 rotate-12' : ''} ${buttonAnimations.contact ? 'animate-bounce' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-amber-200/40 to-yellow-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-amber-400/30 animate-ping rounded-3xl opacity-0 group-hover:opacity-50"></div>
              <Mail className="h-9 w-9 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10" />
              <div className="absolute -inset-3 bg-amber-400/40 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* New message indicator */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                <Heart className="h-2 w-2 text-white" />
              </div>
            </Button>

            {/* Ultra Enhanced Quick Info Panel */}
            <div className={`group relative w-20 h-20 rounded-3xl shadow-3xl transition-all duration-700 border-4 border-white/50 overflow-hidden flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-br from-purple-700 via-pink-600 to-rose-700 text-white' 
                : 'bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 text-white'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-300/0 via-pink-200/30 to-rose-300/0 animate-pulse"></div>
              <div className="flex flex-col items-center justify-center relative z-10">
                <Clock className="h-5 w-5 mb-1 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-xs font-bold">24/7</span>
              </div>
              <div className="absolute -inset-2 bg-purple-400/30 rounded-3xl blur-xl animate-pulse"></div>
              
              {/* Floating sparkles */}
              <div className="absolute top-1 right-1 text-yellow-300 animate-bounce">✨</div>
              <div className="absolute bottom-1 left-1 text-blue-300 animate-ping">💫</div>
            </div>

            {/* Ultra Enhanced Social Proof */}
            <div className={`group relative w-20 h-20 rounded-3xl shadow-3xl border-4 border-white/50 overflow-hidden flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-700 text-white' 
                : 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-600 text-white'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-300/0 via-purple-200/30 to-pink-300/0 animate-pulse"></div>
              <div className="flex flex-col items-center justify-center relative z-10">
                <Users className="h-5 w-5 mb-1" />
                <span className="text-xs font-bold">2K+</span>
              </div>
              <div className="absolute -inset-2 bg-indigo-400/30 rounded-3xl blur-xl animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Ultra Enhanced Main Menu Hub Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`group relative w-24 h-24 rounded-full shadow-4xl transition-all duration-1000 hover:scale-125 border-6 border-white/60 overflow-hidden ${
            isDarkMode 
              ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white' 
              : 'bg-gradient-to-br from-white via-gray-50 to-slate-100 hover:from-gray-50 hover:to-white text-slate-800'
          } ${isExpanded ? 'rotate-180 scale-125 shadow-6xl' : 'hover:rotate-45'} ${pulseAnimation ? 'animate-pulse' : ''}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-400/20 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          {/* Multiple rotating rings */}
          <div className="absolute inset-2 border-2 border-blue-400/30 rounded-full animate-spin opacity-60"></div>
          <div className="absolute inset-4 border-2 border-purple-400/30 rounded-full animate-spin opacity-40" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
          
          <div className="relative z-10 transition-transform duration-1000">
            {isExpanded ? (
              <X className="h-10 w-10 group-hover:scale-125 transition-transform animate-pulse" />
            ) : (
              <Menu className="h-10 w-10 group-hover:scale-125 group-hover:rotate-180 transition-all duration-700" />
            )}
          </div>
          
          {/* Ultra advanced glow effects */}
          <div className="absolute -inset-4 bg-gradient-radial from-blue-400/30 via-purple-400/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
          
          {/* Floating orbital elements */}
          <div className={`absolute -top-3 -right-3 w-4 h-4 bg-blue-400 rounded-full transition-all duration-1000 ${isHovering ? 'animate-bounce' : 'animate-pulse'}`}></div>
          <div className={`absolute -bottom-3 -left-3 w-3 h-3 bg-purple-400 rounded-full transition-all duration-1000 ${isHovering ? 'animate-ping' : 'animate-pulse'}`}></div>
          <div className={`absolute -top-3 -left-3 w-2 h-2 bg-pink-400 rounded-full transition-all duration-1000 ${isHovering ? 'animate-bounce' : 'animate-pulse'}`} style={{ animationDelay: '0.5s' }}></div>
        </Button>

        {/* Ultra Enhanced WhatsApp Button */}
        {buttonsData.whatsapp?.enabled && (
          <Button
            onClick={handleWhatsApp}
            onMouseEnter={() => handleButtonHover('whatsapp', true)}
            onMouseLeave={() => handleButtonHover('whatsapp', false)}
            className={`group relative w-24 h-24 rounded-full shadow-4xl transition-all duration-1000 hover:scale-135 border-6 border-white/60 overflow-hidden ${
              activeButton === 'whatsapp' ? 'scale-130 rotate-12' : ''
            } ${buttonAnimations.whatsapp ? 'animate-bounce' : 'animate-pulse'}`}
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 50%, #075E54 100%)',
              boxShadow: '0 25px 50px -12px rgba(37, 211, 102, 0.6), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}
          >
            {/* Multiple animated background layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-300/0 via-green-200/40 to-green-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
            <div className="absolute inset-0 bg-green-400/30 animate-ping rounded-full opacity-60"></div>
            <div className="absolute inset-2 bg-green-300/20 animate-pulse rounded-full"></div>
            
            {/* Rotating orbital rings */}
            <div className="absolute inset-3 border-2 border-white/30 rounded-full animate-spin"></div>
            <div className="absolute inset-5 border border-white/20 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '4s' }}></div>
            
            <MessageSquare className="h-11 w-11 group-hover:scale-140 group-hover:rotate-12 transition-all duration-700 relative z-10 text-white drop-shadow-lg" />
            
            {/* Ultra enhanced glow effects */}
            <div className="absolute -inset-6 bg-gradient-radial from-green-400/50 via-green-300/30 to-transparent rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
            
            {/* Multiple notification badges */}
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-3 border-white shadow-xl animate-bounce">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            
            {/* Floating message indicators */}
            <div className="absolute top-0 left-0 text-white animate-bounce text-lg">💬</div>
            <div className="absolute bottom-1 right-1 text-yellow-300 animate-ping text-sm">⚡</div>
          </Button>
        )}
        
        {/* Ultra Enhanced Phone Button */}
        {buttonsData.phone?.enabled && (
          <Button
            onClick={handlePhoneCall}
            onMouseEnter={() => handleButtonHover('phone', true)}
            onMouseLeave={() => handleButtonHover('phone', false)}
            className={`group relative w-24 h-24 rounded-full shadow-4xl transition-all duration-1000 hover:scale-135 border-6 border-white/60 overflow-hidden ${
              activeButton === 'phone' ? 'scale-130 -rotate-12' : ''
            } ${buttonAnimations.phone ? 'animate-pulse' : 'animate-bounce'}`}
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)',
              boxShadow: '0 25px 50px -12px rgba(255, 107, 53, 0.6), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}
          >
            {/* Advanced animated backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-300/0 via-amber-200/50 to-yellow-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-orange-400/40 animate-ping rounded-full opacity-50"></div>
            <div className="absolute inset-1 bg-gradient-radial from-yellow-300/30 to-transparent animate-pulse rounded-full"></div>
            
            {/* Rotating call waves */}
            <div className="absolute inset-2 border-2 border-white/40 rounded-full animate-spin"></div>
            <div className="absolute inset-4 border border-white/30 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
            <div className="absolute inset-6 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
            
            <Phone className="h-11 w-11 group-hover:scale-140 group-hover:-rotate-12 transition-all duration-700 relative z-10 text-white drop-shadow-lg" />
            
            {/* Ultra enhanced glow */}
            <div className="absolute -inset-6 bg-gradient-radial from-orange-400/60 via-amber-300/40 to-transparent rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
            
            {/* Call status indicators */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 rounded-full animate-pulse border-3 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-7 h-7 bg-blue-500 rounded-full border-3 border-white flex items-center justify-center animate-bounce">
              <Navigation className="h-3 w-3 text-white" />
            </div>
            
            {/* Floating call elements */}
            <div className="absolute top-1 right-2 text-white animate-bounce text-lg">📞</div>
            <div className="absolute bottom-2 left-1 text-yellow-200 animate-ping text-sm">🔥</div>
          </Button>
        )}

        {/* Ultra Enhanced Scroll to Top Button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            onMouseEnter={() => handleButtonHover('scroll', true)}
            onMouseLeave={() => handleButtonHover('scroll', false)}
            className={`group relative w-20 h-20 rounded-2xl shadow-3xl transition-all duration-700 hover:scale-135 border-4 border-white/50 overflow-hidden ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white' 
                : 'bg-gradient-to-br from-slate-100 via-white to-slate-200 hover:from-white hover:to-slate-100 text-slate-800'
            } ${activeButton === 'scroll' ? 'scale-125 -translate-y-2' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-400/0 via-slate-300/30 to-slate-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-slate-300/20 animate-ping rounded-2xl opacity-0 group-hover:opacity-60"></div>
            
            {/* Upward motion trails */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
            <div className="absolute inset-x-2 bottom-2 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent animate-ping"></div>
            
            <ChevronUp className="h-9 w-9 group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500 relative z-10 animate-bounce" />
            <div className="absolute -inset-2 bg-slate-400/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Scroll indicator */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-blue-400 animate-bounce text-sm">⬆️</div>
          </Button>
        )}
      </div>

      {/* Ultra Enhanced Tooltip System */}
      {activeButton && (
        <div className={`fixed bottom-32 right-32 z-40 px-6 py-4 rounded-2xl shadow-2xl border-2 backdrop-blur-sm transition-all duration-500 transform scale-110 ${
          isDarkMode 
            ? 'bg-slate-800/95 border-slate-600/60 text-white' 
            : 'bg-white/95 border-slate-200/60 text-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            {activeButton === 'whatsapp' && <MessageSquare className="h-5 w-5 text-green-500" />}
            {activeButton === 'phone' && <Phone className="h-5 w-5 text-orange-500" />}
            {activeButton === 'services' && <Shield className="h-5 w-5 text-emerald-500" />}
            {activeButton === 'contact' && <Mail className="h-5 w-5 text-amber-500" />}
            {activeButton === 'home' && <Home className="h-5 w-5 text-blue-500" />}
            {activeButton === 'scroll' && <ChevronUp className="h-5 w-5 text-slate-500" />}
            <span className="font-bold text-lg">
              {activeButton === 'whatsapp' && 'واتساب - تواصل فوري'}
              {activeButton === 'phone' && 'اتصال مباشر - خدمة 24/7'}
              {activeButton === 'services' && 'خدماتنا المتميزة'}
              {activeButton === 'contact' && 'تواصل معنا'}
              {activeButton === 'home' && 'الصفحة الرئيسية'}
              {activeButton === 'scroll' && 'العودة للأعلى'}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingNavigation;
