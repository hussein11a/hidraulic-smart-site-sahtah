
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
  const [rippleEffect, setRippleEffect] = useState<{[key: string]: boolean}>({});

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

  // Enhanced animation cycling with smart timing
  useEffect(() => {
    const animationCycle = setInterval(() => {
      const buttons = ['whatsapp', 'phone', 'services', 'contact', 'home'];
      const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
      setButtonAnimations(prev => ({ ...prev, [randomButton]: true }));
      
      setTimeout(() => {
        setButtonAnimations(prev => ({ ...prev, [randomButton]: false }));
      }, 2500);
    }, 6000);

    return () => clearInterval(animationCycle);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setActiveButton('scroll');
    triggerRipple('scroll');
    setTimeout(() => setActiveButton(null), 1000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsExpanded(false);
      setActiveButton(sectionId);
      triggerRipple(sectionId);
      setTimeout(() => setActiveButton(null), 1000);
    }
  };

  const triggerRipple = (buttonId: string) => {
    setRippleEffect(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setRippleEffect(prev => ({ ...prev, [buttonId]: false }));
    }, 600);
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
      {/* Ultra Professional Floating Action Hub */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-8 z-50">
        
        {/* Advanced Quick Navigation Menu */}
        <div className={`transition-all duration-1000 transform ${
          isExpanded 
            ? 'opacity-100 translate-y-0 scale-100 rotate-0 blur-0' 
            : 'opacity-0 translate-y-16 scale-75 rotate-90 blur-sm pointer-events-none'
        }`}>
          <div className="flex flex-col gap-8">
            
            {/* Premium Home Navigation Button */}
            <Button
              onClick={() => scrollToSection('home')}
              onMouseEnter={() => handleButtonHover('home', true)}
              onMouseLeave={() => handleButtonHover('home', false)}
              className={`group relative w-24 h-24 rounded-3xl shadow-4xl transition-all duration-1000 hover:scale-150 border-6 border-white/60 backdrop-blur-lg overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-blue-800 via-blue-700 to-purple-800 hover:from-blue-700 hover:to-purple-700 text-white' 
                  : 'bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white'
              } ${activeButton === 'home' ? 'scale-140 rotate-12 shadow-6xl' : ''} ${buttonAnimations.home ? 'animate-bounce' : ''}`}
            >
              {/* Ultra Advanced Background Effects */}
              <div className="absolute inset-0 bg-gradient-radial from-blue-400/30 via-purple-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/0 via-blue-200/50 to-purple-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="absolute inset-0 bg-blue-400/30 animate-ping rounded-3xl opacity-0 group-hover:opacity-70"></div>
              
              {/* Rotating Orbital Rings */}
              <div className="absolute inset-4 border-2 border-white/40 rounded-full animate-spin opacity-60"></div>
              <div className="absolute inset-6 border border-white/30 rounded-full animate-spin opacity-40" style={{ animationDirection: 'reverse', animationDuration: '4s' }}></div>
              <div className="absolute inset-8 border border-white/20 rounded-full animate-spin opacity-20" style={{ animationDuration: '6s' }}></div>
              
              <Home className="h-11 w-11 group-hover:scale-140 group-hover:rotate-12 transition-all duration-700 relative z-10 drop-shadow-2xl" />
              
              {/* Premium Glow System */}
              <div className="absolute -inset-8 bg-gradient-radial from-blue-400/60 via-purple-300/40 to-transparent rounded-3xl blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
              
              {/* Status Indicators */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-2xl animate-bounce">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-400 rounded-full animate-pulse border-3 border-white"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-1 left-1 text-yellow-300 animate-bounce text-lg">🏠</div>
              <div className="absolute bottom-1 right-1 text-blue-200 animate-ping text-sm">✨</div>
              
              {/* Ripple Effect */}
              {rippleEffect.home && (
                <div className="absolute inset-0 bg-white/30 rounded-3xl animate-ping"></div>
              )}
            </Button>

            {/* Premium Services Button */}
            <Button
              onClick={() => scrollToSection('services')}
              onMouseEnter={() => handleButtonHover('services', true)}
              onMouseLeave={() => handleButtonHover('services', false)}
              className={`group relative w-24 h-24 rounded-3xl shadow-4xl transition-all duration-1000 hover:scale-150 border-6 border-white/60 backdrop-blur-lg overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-700 text-white' 
                  : 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white'
              } ${activeButton === 'services' ? 'scale-140 -rotate-12 shadow-6xl' : ''} ${buttonAnimations.services ? 'animate-pulse' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-radial from-emerald-400/30 via-teal-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="absolute inset-0 bg-emerald-400/30 animate-ping rounded-3xl opacity-0 group-hover:opacity-70"></div>
              
              <div className="absolute inset-3 border-2 border-white/40 rounded-full animate-spin"></div>
              <div className="absolute inset-5 border border-white/30 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
              
              <Shield className="h-11 w-11 group-hover:scale-140 group-hover:-rotate-12 transition-all duration-700 relative z-10 drop-shadow-2xl" />
              <div className="absolute -inset-8 bg-gradient-radial from-emerald-400/60 via-teal-300/40 to-transparent rounded-3xl blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white animate-pulse">
                <Star className="h-4 w-4 text-white" />
              </div>
              
              <div className="absolute top-0 right-0 text-emerald-200 animate-bounce text-lg">🛡️</div>
              <div className="absolute bottom-1 left-1 text-teal-200 animate-ping text-sm">⚡</div>
              
              {rippleEffect.services && (
                <div className="absolute inset-0 bg-white/30 rounded-3xl animate-ping"></div>
              )}
            </Button>

            {/* Premium Contact Button */}
            <Button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => handleButtonHover('contact', true)}
              onMouseLeave={() => handleButtonHover('contact', false)}
              className={`group relative w-24 h-24 rounded-3xl shadow-4xl transition-all duration-1000 hover:scale-150 border-6 border-white/60 backdrop-blur-lg overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-orange-800 via-amber-700 to-yellow-800 hover:from-orange-700 hover:to-yellow-700 text-white' 
                  : 'bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-700 hover:from-orange-500 hover:to-yellow-600 text-white'
              } ${activeButton === 'contact' ? 'scale-140 rotate-12 shadow-6xl' : ''} ${buttonAnimations.contact ? 'animate-bounce' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-radial from-amber-400/30 via-yellow-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="absolute inset-0 bg-amber-400/30 animate-ping rounded-3xl opacity-0 group-hover:opacity-70"></div>
              
              <div className="absolute inset-2 border-2 border-white/40 rounded-full animate-spin"></div>
              <div className="absolute inset-4 border border-white/30 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '5s' }}></div>
              
              <Mail className="h-11 w-11 group-hover:scale-140 group-hover:rotate-12 transition-all duration-700 relative z-10 drop-shadow-2xl" />
              <div className="absolute -inset-8 bg-gradient-radial from-amber-400/60 via-yellow-300/40 to-transparent rounded-3xl blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center border-3 border-white animate-bounce">
                <Heart className="h-3 w-3 text-white" />
              </div>
              
              <div className="absolute top-1 left-1 text-amber-200 animate-bounce text-lg">📧</div>
              <div className="absolute bottom-0 right-0 text-yellow-200 animate-ping text-sm">💫</div>
              
              {rippleEffect.contact && (
                <div className="absolute inset-0 bg-white/30 rounded-3xl animate-ping"></div>
              )}
            </Button>

            {/* Premium Info Panel */}
            <div className={`group relative w-24 h-24 rounded-3xl shadow-4xl transition-all duration-1000 border-6 border-white/60 backdrop-blur-lg overflow-hidden flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-br from-purple-800 via-pink-700 to-rose-800 text-white' 
                : 'bg-gradient-to-br from-purple-600 via-pink-600 to-rose-700 text-white'
            }`}>
              <div className="absolute inset-0 bg-gradient-radial from-purple-400/30 via-pink-300/20 to-transparent animate-pulse"></div>
              <div className="absolute inset-2 border border-white/30 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
              
              <div className="flex flex-col items-center justify-center relative z-10">
                <Clock className="h-7 w-7 mb-2 animate-spin drop-shadow-lg" style={{ animationDuration: '4s' }} />
                <span className="text-sm font-bold shadow-lg">24/7</span>
              </div>
              
              <div className="absolute -inset-6 bg-purple-400/40 rounded-3xl blur-2xl animate-pulse"></div>
              <div className="absolute top-0 right-0 text-yellow-300 animate-bounce text-lg">⏰</div>
              <div className="absolute bottom-0 left-0 text-purple-200 animate-ping text-sm">🌟</div>
            </div>

            {/* Premium Statistics Panel */}
            <div className={`group relative w-24 h-24 rounded-3xl shadow-4xl border-6 border-white/60 backdrop-blur-lg overflow-hidden flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-800 text-white' 
                : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700 text-white'
            }`}>
              <div className="absolute inset-0 bg-gradient-radial from-indigo-400/30 via-purple-300/20 to-transparent animate-pulse"></div>
              <div className="absolute inset-1 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
              
              <div className="flex flex-col items-center justify-center relative z-10">
                <Users className="h-7 w-7 mb-2 drop-shadow-lg" />
                <span className="text-sm font-bold">2K+</span>
              </div>
              
              <div className="absolute -inset-6 bg-indigo-400/40 rounded-3xl blur-2xl animate-pulse"></div>
              <div className="absolute top-1 left-1 text-blue-300 animate-bounce text-lg">👥</div>
              <div className="absolute bottom-1 right-1 text-pink-300 animate-ping text-sm">📊</div>
            </div>
          </div>
        </div>

        {/* Ultra Premium Main Hub Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`group relative w-28 h-28 rounded-full shadow-6xl transition-all duration-1500 hover:scale-140 border-8 border-white/70 backdrop-blur-xl overflow-hidden ${
            isDarkMode 
              ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 hover:from-slate-800 hover:to-slate-900 text-white' 
              : 'bg-gradient-to-br from-white via-gray-50 to-slate-200 hover:from-gray-50 hover:to-white text-slate-800'
          } ${isExpanded ? 'rotate-180 scale-150 shadow-8xl' : 'hover:rotate-45'} ${pulseAnimation ? 'animate-pulse' : ''}`}
        >
          {/* Ultra Advanced Background System */}
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-purple-400/15 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1500 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1500"></div>
          
          {/* Multiple Rotating Orbital Systems */}
          <div className="absolute inset-3 border-3 border-blue-400/40 rounded-full animate-spin opacity-70"></div>
          <div className="absolute inset-5 border-2 border-purple-400/30 rounded-full animate-spin opacity-50" style={{ animationDirection: 'reverse', animationDuration: '4s' }}></div>
          <div className="absolute inset-7 border border-pink-400/20 rounded-full animate-spin opacity-30" style={{ animationDuration: '6s' }}></div>
          
          <div className="relative z-10 transition-transform duration-1500">
            {isExpanded ? (
              <X className="h-12 w-12 group-hover:scale-140 transition-transform animate-pulse drop-shadow-2xl" />
            ) : (
              <Menu className="h-12 w-12 group-hover:scale-140 group-hover:rotate-180 transition-all duration-1000 drop-shadow-2xl" />
            )}
          </div>
          
          {/* Ultra Premium Glow Effects */}
          <div className="absolute -inset-10 bg-gradient-radial from-blue-400/40 via-purple-400/25 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1500 animate-pulse"></div>
          
          {/* Advanced Orbital Elements */}
          <div className={`absolute -top-4 -right-4 w-6 h-6 bg-blue-500 rounded-full transition-all duration-1500 ${isHovering ? 'animate-bounce' : 'animate-pulse'} border-3 border-white shadow-xl`}></div>
          <div className={`absolute -bottom-4 -left-4 w-5 h-5 bg-purple-500 rounded-full transition-all duration-1500 ${isHovering ? 'animate-ping' : 'animate-pulse'} border-2 border-white shadow-lg`}></div>
          <div className={`absolute -top-4 -left-4 w-4 h-4 bg-pink-500 rounded-full transition-all duration-1500 ${isHovering ? 'animate-bounce' : 'animate-pulse'} border-2 border-white shadow-md`} style={{ animationDelay: '0.5s' }}></div>
          <div className={`absolute -bottom-4 -right-4 w-3 h-3 bg-yellow-500 rounded-full transition-all duration-1500 ${isHovering ? 'animate-ping' : 'animate-pulse'} border border-white`} style={{ animationDelay: '0.3s' }}></div>
        </Button>

        {/* Ultra Premium WhatsApp Button */}
        {buttonsData.whatsapp?.enabled && (
          <Button
            onClick={() => {
              handleWhatsApp();
              triggerRipple('whatsapp');
            }}
            onMouseEnter={() => handleButtonHover('whatsapp', true)}
            onMouseLeave={() => handleButtonHover('whatsapp', false)}
            className={`group relative w-28 h-28 rounded-full shadow-6xl transition-all duration-1500 hover:scale-160 border-8 border-white/70 backdrop-blur-xl overflow-hidden ${
              activeButton === 'whatsapp' ? 'scale-150 rotate-12 shadow-8xl' : ''
            } ${buttonAnimations.whatsapp ? 'animate-bounce' : 'animate-pulse'}`}
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 25%, #075E54 50%, #128C7E 75%, #25D366 100%)',
              boxShadow: '0 30px 60px -15px rgba(37, 211, 102, 0.8), 0 0 0 2px rgba(255,255,255,0.2), inset 0 2px 0 rgba(255,255,255,0.3)'
            }}
          >
            {/* Ultra Advanced Background Layers */}
            <div className="absolute inset-0 bg-gradient-radial from-green-300/40 via-green-200/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
            <div className="absolute inset-0 bg-green-400/40 animate-ping rounded-full opacity-70"></div>
            <div className="absolute inset-3 bg-green-300/30 animate-pulse rounded-full"></div>
            
            {/* Multiple Orbital Ring Systems */}
            <div className="absolute inset-4 border-3 border-white/50 rounded-full animate-spin"></div>
            <div className="absolute inset-6 border-2 border-white/30 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
            <div className="absolute inset-8 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '5s' }}></div>
            
            <MessageSquare className="h-14 w-14 group-hover:scale-160 group-hover:rotate-12 transition-all duration-1000 relative z-10 text-white drop-shadow-2xl" />
            
            {/* Ultra Premium Glow System */}
            <div className="absolute -inset-10 bg-gradient-radial from-green-400/70 via-green-300/50 to-transparent rounded-full blur-4xl opacity-80 group-hover:opacity-100 transition-opacity duration-1500 animate-pulse"></div>
            
            {/* Advanced Notification System */}
            <div className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center border-4 border-white shadow-2xl animate-bounce">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-3 border-white animate-pulse">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-blue-500 rounded-full animate-ping border-2 border-white"></div>
            
            {/* Premium Floating Indicators */}
            <div className="absolute top-2 left-2 text-white animate-bounce text-2xl drop-shadow-lg">💬</div>
            <div className="absolute bottom-2 right-2 text-yellow-300 animate-ping text-lg">⚡</div>
            <div className="absolute bottom-3 left-3 text-green-200 animate-bounce text-sm">🚀</div>
            
            {rippleEffect.whatsapp && (
              <div className="absolute inset-0 bg-white/40 rounded-full animate-ping"></div>
            )}
          </Button>
        )}
        
        {/* Ultra Premium Phone Button */}
        {buttonsData.phone?.enabled && (
          <Button
            onClick={() => {
              handlePhoneCall();
              triggerRipple('phone');
            }}
            onMouseEnter={() => handleButtonHover('phone', true)}
            onMouseLeave={() => handleButtonHover('phone', false)}
            className={`group relative w-28 h-28 rounded-full shadow-6xl transition-all duration-1500 hover:scale-160 border-8 border-white/70 backdrop-blur-xl overflow-hidden ${
              activeButton === 'phone' ? 'scale-150 -rotate-12 shadow-8xl' : ''
            } ${buttonAnimations.phone ? 'animate-pulse' : 'animate-bounce'}`}
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FFD23F 50%, #F7931E 75%, #FF6B35 100%)',
              boxShadow: '0 30px 60px -15px rgba(255, 107, 53, 0.8), 0 0 0 2px rgba(255,255,255,0.2), inset 0 2px 0 rgba(255,255,255,0.3)'
            }}
          >
            {/* Ultra Premium Background Effects */}
            <div className="absolute inset-0 bg-gradient-radial from-orange-300/40 via-amber-200/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute inset-0 bg-orange-400/50 animate-ping rounded-full opacity-60"></div>
            <div className="absolute inset-2 bg-gradient-radial from-yellow-300/40 to-transparent animate-pulse rounded-full"></div>
            
            {/* Advanced Call Wave Systems */}
            <div className="absolute inset-3 border-3 border-white/50 rounded-full animate-spin"></div>
            <div className="absolute inset-5 border-2 border-white/40 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
            <div className="absolute inset-7 border border-white/30 rounded-full animate-spin" style={{ animationDuration: '4s' }}></div>
            <div className="absolute inset-9 border border-white/20 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '6s' }}></div>
            
            <Phone className="h-14 w-14 group-hover:scale-160 group-hover:-rotate-12 transition-all duration-1000 relative z-10 text-white drop-shadow-2xl" />
            
            {/* Ultra Premium Glow */}
            <div className="absolute -inset-10 bg-gradient-radial from-orange-400/80 via-amber-300/60 to-transparent rounded-full blur-4xl opacity-80 group-hover:opacity-100 transition-opacity duration-1500 animate-pulse"></div>
            
            {/* Advanced Status Indicators */}
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-500 rounded-full animate-pulse border-4 border-white flex items-center justify-center shadow-xl">
              <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-9 h-9 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center animate-bounce shadow-2xl">
              <Navigation className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -top-4 -right-4 w-7 h-7 bg-red-500 rounded-full animate-ping border-3 border-white"></div>
            
            {/* Premium Call Elements */}
            <div className="absolute top-2 right-3 text-white animate-bounce text-2xl drop-shadow-lg">📞</div>
            <div className="absolute bottom-3 left-2 text-yellow-200 animate-ping text-lg">🔥</div>
            <div className="absolute bottom-2 right-3 text-orange-200 animate-bounce text-sm">⚡</div>
            
            {rippleEffect.phone && (
              <div className="absolute inset-0 bg-white/40 rounded-full animate-ping"></div>
            )}
          </Button>
        )}

        {/* Ultra Premium Scroll to Top Button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            onMouseEnter={() => handleButtonHover('scroll', true)}
            onMouseLeave={() => handleButtonHover('scroll', false)}
            className={`group relative w-24 h-24 rounded-3xl shadow-4xl transition-all duration-1000 hover:scale-150 border-6 border-white/60 backdrop-blur-lg overflow-hidden ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white' 
                : 'bg-gradient-to-br from-slate-200 via-white to-slate-300 hover:from-white hover:to-slate-200 text-slate-800'
            } ${activeButton === 'scroll' ? 'scale-140 -translate-y-4 shadow-6xl' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-radial from-slate-400/30 via-slate-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute inset-0 bg-slate-300/30 animate-ping rounded-3xl opacity-0 group-hover:opacity-70"></div>
            
            {/* Upward Motion Effects */}
            <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
            <div className="absolute inset-x-3 bottom-3 h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent animate-ping"></div>
            <div className="absolute inset-2 border border-slate-400/30 rounded-3xl animate-pulse"></div>
            
            <ChevronUp className="h-11 w-11 group-hover:scale-140 group-hover:-translate-y-3 transition-all duration-700 relative z-10 animate-bounce drop-shadow-lg" />
            <div className="absolute -inset-6 bg-slate-400/40 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            {/* Scroll Indicators */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-blue-400 animate-bounce text-lg">⬆️</div>
            <div className="absolute -bottom-2 right-2 text-slate-400 animate-ping text-sm">🚀</div>
            
            {rippleEffect.scroll && (
              <div className="absolute inset-0 bg-white/30 rounded-3xl animate-ping"></div>
            )}
          </Button>
        )}
      </div>

      {/* Ultra Premium Tooltip System */}
      {activeButton && (
        <div className={`fixed bottom-36 right-36 z-40 px-8 py-6 rounded-3xl shadow-3xl border-4 backdrop-blur-xl transition-all duration-700 transform scale-110 ${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-700/70 text-white' 
            : 'bg-white/95 border-slate-300/70 text-slate-800'
        }`}>
          <div className="flex items-center gap-4">
            {activeButton === 'whatsapp' && <MessageSquare className="h-6 w-6 text-green-500 animate-bounce" />}
            {activeButton === 'phone' && <Phone className="h-6 w-6 text-orange-500 animate-bounce" />}
            {activeButton === 'services' && <Shield className="h-6 w-6 text-emerald-500 animate-bounce" />}
            {activeButton === 'contact' && <Mail className="h-6 w-6 text-amber-500 animate-bounce" />}
            {activeButton === 'home' && <Home className="h-6 w-6 text-blue-500 animate-bounce" />}
            {activeButton === 'scroll' && <ChevronUp className="h-6 w-6 text-slate-500 animate-bounce" />}
            <span className="font-bold text-xl drop-shadow-lg">
              {activeButton === 'whatsapp' && 'واتساب - تواصل فوري ✨'}
              {activeButton === 'phone' && 'اتصال مباشر - خدمة 24/7 📞'}
              {activeButton === 'services' && 'خدماتنا المتميزة 🛡️'}
              {activeButton === 'contact' && 'تواصل معنا 📧'}
              {activeButton === 'home' && 'الصفحة الرئيسية 🏠'}
              {activeButton === 'scroll' && 'العودة للأعلى ⬆️'}
            </span>
          </div>
          
          {/* Tooltip Arrow */}
          <div className={`absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 rotate-45 border-r-4 border-b-4 ${
            isDarkMode ? 'bg-slate-900/95 border-slate-700/70' : 'bg-white/95 border-slate-300/70'
          }`}></div>
        </div>
      )}
    </>
  );
};

export default FloatingNavigation;
