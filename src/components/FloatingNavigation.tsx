
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronUp, Phone, MessageSquare, Star, Shield, Menu, X, Zap, Clock, MapPin, Users, Camera, Heart, Sparkles, Navigation, Home, Info, Mail, Eye, EyeOff, Volume2, VolumeX, Wifi, WifiOff, Battery, Signal } from 'lucide-react';
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
  // Advanced State Management
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [buttonAnimations, setButtonAnimations] = useState<{[key: string]: boolean}>({});
  const [rippleEffect, setRippleEffect] = useState<{[key: string]: boolean}>({});
  
  // Smart Behavior States
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [userActivity, setUserActivity] = useState<'active' | 'idle'>('active');
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline'>('online');
  const [batteryLevel, setBatteryLevel] = useState<number>(100);
  const [interactionCount, setInteractionCount] = useState(0);
  const [performanceScore, setPerformanceScore] = useState(100);
  const [adaptivePosition, setAdaptivePosition] = useState({ x: 0, y: 0 });
  const [smartAnimationMode, setSmartAnimationMode] = useState<'normal' | 'reduced' | 'enhanced'>('normal');
  
  // Refs for advanced functionality
  const containerRef = useRef<HTMLDivElement>(null);
  const lastInteractionRef = useRef<number>(Date.now());
  const performanceObserverRef = useRef<PerformanceObserver | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Smart Scroll Behavior
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setScrollDirection('down');
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setScrollDirection('up');
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);
    setShowScrollTop(currentScrollY > 300);
    
    // Update user activity
    setUserActivity('active');
    lastInteractionRef.current = Date.now();
  }, [lastScrollY]);

  // Smart Section Detection
  const detectCurrentSection = useCallback(() => {
    const sections = ['home', 'services', 'contact'];
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setCurrentSection(section);
          break;
        }
      }
    }
  }, []);

  // Performance Monitoring
  const initPerformanceMonitoring = useCallback(() => {
    if ('PerformanceObserver' in window) {
      performanceObserverRef.current = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const avgTime = entries.reduce((sum, entry) => sum + entry.duration, 0) / entries.length;
        
        if (avgTime > 16.67) { // 60fps threshold
          setSmartAnimationMode('reduced');
          setPerformanceScore(Math.max(0, 100 - avgTime));
        } else {
          setSmartAnimationMode('enhanced');
          setPerformanceScore(100);
        }
      });
      
      performanceObserverRef.current.observe({ entryTypes: ['measure'] });
    }
  }, []);

  // Battery Status Monitoring
  const initBatteryMonitoring = useCallback(async () => {
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        setBatteryLevel(Math.round(battery.level * 100));
        
        battery.addEventListener('levelchange', () => {
          const level = Math.round(battery.level * 100);
          setBatteryLevel(level);
          
          if (level < 20) {
            setSmartAnimationMode('reduced');
            toast({
              title: "توفير البطارية",
              description: "تم تقليل الحركات للحفاظ على البطارية",
              duration: 3000,
            });
          }
        });
      } catch (error) {
        console.log('Battery API not supported');
      }
    }
  }, [toast]);

  // Network Status Monitoring
  const initNetworkMonitoring = useCallback(() => {
    const updateConnectionStatus = () => {
      setConnectionStatus(navigator.onLine ? 'online' : 'offline');
      
      if (!navigator.onLine) {
        toast({
          title: "اتصال الإنترنت",
          description: "تم فقدان الاتصال بالإنترنت",
          variant: "destructive",
          duration: 5000,
        });
      }
    };

    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);
    
    return () => {
      window.removeEventListener('online', updateConnectionStatus);
      window.removeEventListener('offline', updateConnectionStatus);
    };
  }, [toast]);

  // User Activity Detection
  const detectUserActivity = useCallback(() => {
    const checkActivity = () => {
      if (Date.now() - lastInteractionRef.current > 30000) { // 30 seconds
        setUserActivity('idle');
        setSmartAnimationMode('reduced');
      } else {
        setUserActivity('active');
        if (performanceScore > 80) {
          setSmartAnimationMode('enhanced');
        }
      }
    };

    const interval = setInterval(checkActivity, 5000);
    return () => clearInterval(interval);
  }, [performanceScore]);

  // Smart Animation Cycling
  useEffect(() => {
    if (smartAnimationMode === 'reduced') return;
    
    const animationCycle = setInterval(() => {
      const buttons = ['whatsapp', 'phone', 'services', 'contact', 'home'];
      const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
      
      // Smart animation based on current section
      if (currentSection === randomButton || Math.random() > 0.7) {
        setButtonAnimations(prev => ({ ...prev, [randomButton]: true }));
        
        setTimeout(() => {
          setButtonAnimations(prev => ({ ...prev, [randomButton]: false }));
        }, smartAnimationMode === 'enhanced' ? 3000 : 2000);
      }
    }, smartAnimationMode === 'enhanced' ? 4000 : 8000);

    return () => clearInterval(animationCycle);
  }, [smartAnimationMode, currentSection]);

  // Initialize Smart Features
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', detectCurrentSection, { passive: true });
    
    const mouseMoveHandler = () => {
      setUserActivity('active');
      lastInteractionRef.current = Date.now();
    };
    
    window.addEventListener('mousemove', mouseMoveHandler, { passive: true });
    window.addEventListener('touchstart', mouseMoveHandler, { passive: true });
    
    initPerformanceMonitoring();
    initBatteryMonitoring();
    const networkCleanup = initNetworkMonitoring();
    const activityCleanup = detectUserActivity();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', detectCurrentSection);
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('touchstart', mouseMoveHandler);
      
      if (performanceObserverRef.current) {
        performanceObserverRef.current.disconnect();
      }
      
      networkCleanup();
      activityCleanup();
    };
  }, [handleScroll, detectCurrentSection, initPerformanceMonitoring, initBatteryMonitoring, initNetworkMonitoring, detectUserActivity]);

  // Smart Interaction Tracking
  const trackInteraction = useCallback((action: string) => {
    setInteractionCount(prev => prev + 1);
    lastInteractionRef.current = Date.now();
    setUserActivity('active');
    
    // Performance measurement
    performance.mark(`interaction-${action}-start`);
    
    setTimeout(() => {
      performance.mark(`interaction-${action}-end`);
      performance.measure(
        `interaction-${action}`,
        `interaction-${action}-start`,
        `interaction-${action}-end`
      );
    }, 100);
  }, []);

  const scrollToTop = useCallback(() => {
    trackInteraction('scroll-top');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setActiveButton('scroll');
    triggerRipple('scroll');
    setTimeout(() => setActiveButton(null), 1000);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    trackInteraction(`navigate-${sectionId}`);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsExpanded(false);
      setActiveButton(sectionId);
      triggerRipple(sectionId);
      setTimeout(() => setActiveButton(null), 1000);
      
      toast({
        title: "التنقل الذكي",
        description: `تم الانتقال إلى قسم ${sectionId === 'home' ? 'الرئيسية' : sectionId === 'services' ? 'الخدمات' : 'التواصل'}`,
        duration: 2000,
      });
    }
  }, [toast]);

  const triggerRipple = useCallback((buttonId: string) => {
    setRippleEffect(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setRippleEffect(prev => ({ ...prev, [buttonId]: false }));
    }, 600);
  }, []);

  const handleButtonHover = useCallback((buttonId: string, isHover: boolean) => {
    if (isHover) {
      setActiveButton(buttonId);
      setIsHovering(true);
      trackInteraction(`hover-${buttonId}`);
    } else {
      setActiveButton(null);
      setIsHovering(false);
    }
  }, [trackInteraction]);

  // Enhanced Phone Call Handler
  const handleSmartPhoneCall = useCallback(() => {
    trackInteraction('phone-call');
    
    if (connectionStatus === 'offline') {
      toast({
        title: "لا يوجد اتصال",
        description: "يرجى التحقق من اتصال الإنترنت",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    handlePhoneCall();
    triggerRipple('phone');
    
    toast({
      title: "جاري الاتصال...",
      description: `الاتصال بـ ${buttonsData.phone.number}`,
      duration: 3000,
    });
  }, [connectionStatus, handlePhoneCall, buttonsData.phone.number, toast, trackInteraction]);

  // Enhanced WhatsApp Handler
  const handleSmartWhatsApp = useCallback(() => {
    trackInteraction('whatsapp');
    
    if (connectionStatus === 'offline') {
      toast({
        title: "لا يوجد اتصال",
        description: "يرجى التحقق من اتصال الإنترنت",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    handleWhatsApp();
    triggerRipple('whatsapp');
    
    toast({
      title: "فتح واتساب...",
      description: "جاري تحضير الرسالة",
      duration: 2000,
    });
  }, [connectionStatus, handleWhatsApp, toast, trackInteraction]);

  // Official WhatsApp Icon SVG Component
  const WhatsAppIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.515z"/>
    </svg>
  );

  // Mobile responsive sizes
  const navButtonSize = isMobile ? 'w-12 h-12' : 'w-20 h-20';
  const mainButtonSize = isMobile ? 'w-16 h-16' : 'w-24 h-24';
  const actionButtonSize = isMobile ? 'w-16 h-16' : 'w-24 h-24';
  const iconSize = isMobile ? 'h-5 w-5' : 'h-9 w-9';
  const mainIconSize = isMobile ? 'h-6 w-6' : 'h-10 w-10';
  const actionIconSize = isMobile ? 'h-7 w-7' : 'h-12 w-12';
  const containerPadding = isMobile ? 'bottom-4 right-4' : 'bottom-8 right-8';
  const buttonGap = isMobile ? 'gap-3' : 'gap-6';

  return (
    <>
      {/* Mobile Optimized Floating Action Hub */}
      <div 
        ref={containerRef}
        className={`fixed ${containerPadding} flex flex-col ${buttonGap} z-50 transform transition-all duration-1000 ${
          isVisible 
            ? 'opacity-100 translate-x-0 scale-100' 
            : 'opacity-50 translate-x-8 scale-90'
        } ${userActivity === 'idle' ? 'blur-sm' : ''}`}
      >
        
        {/* Smart Status Bar */}
        {!isMobile && (
          <div className={`mb-2 px-3 py-1 rounded-lg backdrop-blur-xl border ${
            isDarkMode 
              ? 'bg-slate-900/80 border-slate-700/50 text-white' 
              : 'bg-white/80 border-slate-300/50 text-slate-800'
          } text-xs font-medium transition-all duration-500 ${
            performanceScore < 80 ? 'border-orange-400 text-orange-600' : 
            connectionStatus === 'offline' ? 'border-red-400 text-red-600' : 
            'border-green-400 text-green-600'
          }`}>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                performanceScore < 80 ? 'bg-orange-400' : 
                connectionStatus === 'offline' ? 'bg-red-400' : 
                'bg-green-400'
              } animate-pulse`}></div>
              <span>
                {connectionStatus === 'offline' ? 'غير متصل' : 
                 performanceScore < 80 ? `أداء: ${performanceScore}%` :
                 userActivity === 'idle' ? 'وضع الخمول' :
                 `متصل • ${interactionCount} تفاعل`}
              </span>
              {batteryLevel < 50 && (
                <Battery className={`h-3 w-3 ${batteryLevel < 20 ? 'text-red-500' : 'text-orange-500'}`} />
              )}
            </div>
          </div>
        )}
        
        {/* Advanced Quick Navigation Menu */}
        <div className={`transition-all duration-1000 transform ${
          isExpanded 
            ? 'opacity-100 translate-y-0 scale-100 rotate-0 blur-0' 
            : 'opacity-0 translate-y-16 scale-75 rotate-90 blur-sm pointer-events-none'
        }`}>
          <div className={`flex flex-col ${buttonGap}`}>
            
            {/* Premium Home Navigation Button */}
            <Button
              onClick={() => scrollToSection('home')}
              onMouseEnter={() => handleButtonHover('home', true)}
              onMouseLeave={() => handleButtonHover('home', false)}
              className={`group relative ${navButtonSize} ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-2xl transition-all duration-700 hover:scale-110 ${isMobile ? 'border-2' : 'border-4'} border-white/40 backdrop-blur-xl overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-blue-700 via-blue-600 to-purple-700 hover:from-blue-600 hover:to-purple-600 text-white' 
                  : 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white'
              } ${activeButton === 'home' ? 'scale-110 rotate-6 shadow-3xl' : ''} ${buttonAnimations.home ? 'animate-bounce' : ''}`}
            >
              {/* Professional Background Effects */}
              <div className="absolute inset-0 bg-gradient-radial from-blue-400/20 via-purple-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-blue-400/20 animate-ping rounded-xl opacity-0 group-hover:opacity-60"></div>
              
              {!isMobile && (
                <div className="absolute inset-3 border border-white/30 rounded-full animate-spin opacity-50" style={{ animationDuration: '8s' }}></div>
              )}
              
              <Home className={`${iconSize} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10 drop-shadow-xl`} />
              
              {/* Professional Glow */}
              <div className={`absolute ${isMobile ? '-inset-3' : '-inset-6'} bg-gradient-radial from-blue-400/40 via-purple-300/30 to-transparent rounded-xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700`}></div>
              
              {/* Status Indicator */}
              <div className={`absolute ${isMobile ? '-top-1 -right-1 w-4 h-4' : '-top-2 -right-2 w-6 h-6'} bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse`}>
                <div className={`${isMobile ? 'w-1 h-1' : 'w-2 h-2'} bg-white rounded-full`}></div>
              </div>
              
              {rippleEffect.home && (
                <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping"></div>
              )}
            </Button>

            {/* Premium Services Button */}
            <Button
              onClick={() => scrollToSection('services')}
              onMouseEnter={() => handleButtonHover('services', true)}
              onMouseLeave={() => handleButtonHover('services', false)}
              className={`group relative ${navButtonSize} ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-2xl transition-all duration-700 hover:scale-110 ${isMobile ? 'border-2' : 'border-4'} border-white/40 backdrop-blur-xl overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white' 
                  : 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white'
              } ${activeButton === 'services' ? 'scale-110 -rotate-6 shadow-3xl' : ''} ${buttonAnimations.services ? 'animate-pulse' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-radial from-emerald-400/20 via-teal-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-emerald-400/20 animate-ping rounded-xl opacity-0 group-hover:opacity-60"></div>
              
              {!isMobile && (
                <div className="absolute inset-3 border border-white/30 rounded-full animate-spin opacity-50" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
              )}
              
              <Shield className={`${iconSize} group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 relative z-10 drop-shadow-xl`} />
              <div className={`absolute ${isMobile ? '-inset-3' : '-inset-6'} bg-gradient-radial from-emerald-400/40 via-teal-300/30 to-transparent rounded-xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700`}></div>
              
              <div className={`absolute ${isMobile ? '-top-1 -left-1 w-4 h-4' : '-top-2 -left-2 w-6 h-6'} bg-yellow-500 rounded-full flex items-center justify-center border-2 border-white animate-pulse`}>
                <Star className={`${isMobile ? 'h-2 w-2' : 'h-3 w-3'} text-white`} />
              </div>
              
              {rippleEffect.services && (
                <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping"></div>
              )}
            </Button>

            {/* Premium Contact Button */}
            <Button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => handleButtonHover('contact', true)}
              onMouseLeave={() => handleButtonHover('contact', false)}
              className={`group relative ${navButtonSize} ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-2xl transition-all duration-700 hover:scale-110 ${isMobile ? 'border-2' : 'border-4'} border-white/40 backdrop-blur-xl overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-orange-700 via-amber-600 to-yellow-700 hover:from-orange-600 hover:to-yellow-600 text-white' 
                  : 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-600 hover:from-orange-400 hover:to-yellow-500 text-white'
              } ${activeButton === 'contact' ? 'scale-110 rotate-6 shadow-3xl' : ''} ${buttonAnimations.contact ? 'animate-bounce' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-radial from-amber-400/20 via-yellow-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-amber-400/20 animate-ping rounded-xl opacity-0 group-hover:opacity-60"></div>
              
              {!isMobile && (
                <div className="absolute inset-3 border border-white/30 rounded-full animate-spin opacity-50" style={{ animationDuration: '10s' }}></div>
              )}
              
              <Mail className={`${iconSize} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10 drop-shadow-xl`} />
              <div className={`absolute ${isMobile ? '-inset-3' : '-inset-6'} bg-gradient-radial from-amber-400/40 via-yellow-300/30 to-transparent rounded-xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700`}></div>
              
              <div className={`absolute ${isMobile ? '-top-1 -right-1 w-3 h-3' : '-top-1 -right-1 w-5 h-5'} bg-red-500 rounded-full flex items-center justify-center border-2 border-white animate-bounce`}>
                <Heart className={`${isMobile ? 'h-1 w-1' : 'h-2 w-2'} text-white`} />
              </div>
              
              {rippleEffect.contact && (
                <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping"></div>
              )}
            </Button>

            {/* Info Panels for non-mobile only */}
            {!isMobile && (
              <>
                {/* Premium Info Panel */}
                <div className={`group relative w-20 h-20 rounded-2xl shadow-2xl border-4 border-white/40 backdrop-blur-xl overflow-hidden flex items-center justify-center ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-purple-700 via-pink-600 to-rose-700 text-white' 
                    : 'bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 text-white'
                }`}>
                  <div className="absolute inset-0 bg-gradient-radial from-purple-400/20 via-pink-300/15 to-transparent animate-pulse"></div>
                  <div className="absolute inset-2 border border-white/20 rounded-full animate-spin opacity-30" style={{ animationDuration: '12s' }}></div>
                  
                  <div className="flex flex-col items-center justify-center relative z-10">
                    <Clock className="h-6 w-6 mb-1 animate-spin drop-shadow-lg" style={{ animationDuration: '6s' }} />
                    <span className="text-xs font-bold shadow-lg">24/7</span>
                  </div>
                  
                  <div className="absolute -inset-4 bg-purple-400/30 rounded-2xl blur-xl animate-pulse opacity-70"></div>
                </div>

                {/* Premium Statistics Panel */}
                <div className={`group relative w-20 h-20 rounded-2xl shadow-2xl border-4 border-white/40 backdrop-blur-xl overflow-hidden flex items-center justify-center ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-700 text-white' 
                    : 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-600 text-white'
                }`}>
                  <div className="absolute inset-0 bg-gradient-radial from-indigo-400/20 via-purple-300/15 to-transparent animate-pulse"></div>
                  <div className="absolute inset-1 border border-white/15 rounded-full animate-spin opacity-20" style={{ animationDuration: '15s' }}></div>
                  
                  <div className="flex flex-col items-center justify-center relative z-10">
                    <Users className="h-6 w-6 mb-1 drop-shadow-lg" />
                    <span className="text-xs font-bold">2K+</span>
                  </div>
                  
                  <div className="absolute -inset-4 bg-indigo-400/30 rounded-2xl blur-xl animate-pulse opacity-70"></div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Ultra Premium Main Hub Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`group relative ${mainButtonSize} rounded-full shadow-3xl transition-all duration-1000 hover:scale-110 ${isMobile ? 'border-3' : 'border-6'} border-white/50 backdrop-blur-xl overflow-hidden ${
            isDarkMode 
              ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white' 
              : 'bg-gradient-to-br from-white via-gray-50 to-slate-200 hover:from-gray-50 hover:to-white text-slate-800'
          } ${isExpanded ? 'rotate-180 scale-110 shadow-4xl' : 'hover:rotate-45'} ${pulseAnimation ? 'animate-pulse' : ''}`}
        >
          {/* Professional Background System */}
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/15 via-purple-400/10 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          {/* Subtle Orbital Systems - Only for desktop */}
          {!isMobile && (
            <>
              <div className="absolute inset-2 border-2 border-blue-400/30 rounded-full animate-spin opacity-50" style={{ animationDuration: '20s' }}></div>
              <div className="absolute inset-4 border border-purple-400/20 rounded-full animate-spin opacity-30" style={{ animationDirection: 'reverse', animationDuration: '15s' }}></div>
            </>
          )}
          
          <div className="relative z-10 transition-transform duration-1000">
            {isExpanded ? (
              <X className={`${mainIconSize} group-hover:scale-110 transition-transform drop-shadow-2xl`} />
            ) : (
              <Menu className={`${mainIconSize} group-hover:scale-110 group-hover:rotate-180 transition-all duration-700 drop-shadow-2xl`} />
            )}
          </div>
          
          {/* Professional Glow Effects */}
          <div className={`absolute ${isMobile ? '-inset-4' : '-inset-8'} bg-gradient-radial from-blue-400/30 via-purple-400/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}></div>
          
          {/* Subtle Orbital Elements */}
          <div className={`absolute ${isMobile ? '-top-2 -right-2 w-3 h-3' : '-top-3 -right-3 w-4 h-4'} bg-blue-500 rounded-full transition-all duration-1000 ${isHovering ? 'animate-bounce' : 'animate-pulse'} border-2 border-white shadow-lg`}></div>
          <div className={`absolute ${isMobile ? '-bottom-2 -left-2 w-2 h-2' : '-bottom-3 -left-3 w-3 h-3'} bg-purple-500 rounded-full transition-all duration-1000 ${isHovering ? 'animate-ping' : 'animate-pulse'} border border-white shadow-md`}></div>
        </Button>

        {/* Ultra Premium WhatsApp Button with Official Icon */}
        {buttonsData.whatsapp?.enabled && (
          <Button
            onClick={handleSmartWhatsApp}
            onMouseEnter={() => handleButtonHover('whatsapp', true)}
            onMouseLeave={() => handleButtonHover('whatsapp', false)}
            className={`group relative ${actionButtonSize} rounded-full shadow-3xl transition-all duration-1000 hover:scale-110 ${isMobile ? 'border-3' : 'border-6'} border-white/50 backdrop-blur-xl overflow-hidden ${
              activeButton === 'whatsapp' ? 'scale-110 rotate-6 shadow-4xl' : ''
            } ${buttonAnimations.whatsapp ? 'animate-bounce' : smartAnimationMode === 'enhanced' ? 'animate-pulse' : ''}`}
            style={{
              background: connectionStatus === 'online' 
                ? 'linear-gradient(135deg, #25D366 0%, #128C7E 50%, #075E54 100%)' 
                : 'linear-gradient(135deg, #6B7280 0%, #4B5563 50%, #374151 100%)',
              boxShadow: connectionStatus === 'online' 
                ? '0 20px 40px -10px rgba(37, 211, 102, 0.6), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
                : '0 20px 40px -10px rgba(107, 114, 128, 0.6), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}
          >
            {/* Professional Background Layers */}
            <div className="absolute inset-0 bg-gradient-radial from-green-300/25 via-green-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className={`absolute inset-0 ${connectionStatus === 'online' ? 'bg-green-400/30' : 'bg-gray-400/30'} animate-ping rounded-full opacity-50`}></div>
            
            {/* Subtle Orbital Ring - Only for desktop */}
            {!isMobile && smartAnimationMode !== 'reduced' && (
              <>
                <div className="absolute inset-3 border-2 border-white/40 rounded-full animate-spin opacity-60" style={{ animationDuration: '12s' }}></div>
                <div className="absolute inset-5 border border-white/20 rounded-full animate-spin opacity-40" style={{ animationDirection: 'reverse', animationDuration: '8s' }}></div>
              </>
            )}
            
            {/* Official WhatsApp Icon */}
            <WhatsAppIcon className={`${actionIconSize} group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 relative z-10 text-white drop-shadow-2xl`} />
            
            {/* Professional Glow System */}
            <div className={`absolute ${isMobile ? '-inset-4' : '-inset-8'} ${connectionStatus === 'online' ? 'bg-gradient-radial from-green-400/50 via-green-300/35' : 'bg-gradient-radial from-gray-400/50 via-gray-300/35'} to-transparent rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-1000`}></div>
            
            {/* Smart Status Indicators */}
            <div className={`absolute ${isMobile ? '-top-2 -right-2 w-5 h-5' : '-top-3 -right-3 w-8 h-8'} ${connectionStatus === 'online' ? 'bg-green-500' : 'bg-red-500'} rounded-full flex items-center justify-center ${isMobile ? 'border-2' : 'border-3'} border-white shadow-xl ${connectionStatus === 'online' ? 'animate-bounce' : 'animate-pulse'}`}>
              {connectionStatus === 'online' ? (
                <Wifi className={`${isMobile ? 'h-2 w-2' : 'h-3 w-3'} text-white`} />
              ) : (
                <WifiOff className={`${isMobile ? 'h-2 w-2' : 'h-3 w-3'} text-white`} />
              )}
            </div>
            
            {/* Battery & Performance Indicator */}
            <div className={`absolute ${isMobile ? '-bottom-1 -left-1 w-4 h-4' : '-bottom-2 -left-2 w-6 h-6'} ${batteryLevel > 20 ? 'bg-green-400' : 'bg-orange-400'} rounded-full flex items-center justify-center border-2 border-white animate-pulse`}>
              <Battery className={`${isMobile ? 'h-2 w-2' : 'h-3 w-3'} text-white`} />
            </div>
            
            {/* Activity Ring */}
            {userActivity === 'active' && smartAnimationMode === 'enhanced' && (
              <div className="absolute -inset-2 border-2 border-green-400/50 rounded-full animate-pulse"></div>
            )}
            
            {rippleEffect.whatsapp && (
              <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
            )}
          </Button>
        )}
        
        {/* Ultra Premium Phone Button */}
        {buttonsData.phone?.enabled && (
          <Button
            onClick={handleSmartPhoneCall}
            onMouseEnter={() => handleButtonHover('phone', true)}
            onMouseLeave={() => handleButtonHover('phone', false)}
            className={`group relative ${actionButtonSize} rounded-full shadow-3xl transition-all duration-1000 hover:scale-110 ${isMobile ? 'border-3' : 'border-6'} border-white/50 backdrop-blur-xl overflow-hidden ${
              activeButton === 'phone' ? 'scale-110 -rotate-6 shadow-4xl' : ''
            } ${buttonAnimations.phone ? 'animate-pulse' : smartAnimationMode === 'enhanced' ? 'animate-bounce' : ''}`}
            style={{
              background: connectionStatus === 'online' 
                ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)'
                : 'linear-gradient(135deg, #6B7280 0%, #4B5563 50%, #374151 100%)',
              boxShadow: connectionStatus === 'online' 
                ? '0 20px 40px -10px rgba(255, 107, 53, 0.6), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
                : '0 20px 40px -10px rgba(107, 114, 128, 0.6), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}
          >
            {/* Professional Background Effects */}
            <div className="absolute inset-0 bg-gradient-radial from-orange-300/25 via-amber-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className={`absolute inset-0 ${connectionStatus === 'online' ? 'bg-orange-400/40' : 'bg-gray-400/40'} animate-ping rounded-full opacity-50`}></div>
            
            {/* Professional Call Wave Systems - Only for desktop */}
            {!isMobile && smartAnimationMode !== 'reduced' && (
              <>
                <div className="absolute inset-2 border-2 border-white/40 rounded-full animate-spin opacity-60" style={{ animationDuration: '10s' }}></div>
                <div className="absolute inset-4 border border-white/30 rounded-full animate-spin opacity-40" style={{ animationDirection: 'reverse', animationDuration: '6s' }}></div>
                <div className="absolute inset-6 border border-white/20 rounded-full animate-spin opacity-20" style={{ animationDuration: '14s' }}></div>
              </>
            )}
            
            <Phone className={`${actionIconSize} group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 relative z-10 text-white drop-shadow-2xl`} />
            
            {/* Professional Glow */}
            <div className={`absolute ${isMobile ? '-inset-4' : '-inset-8'} ${connectionStatus === 'online' ? 'bg-gradient-radial from-orange-400/60 via-amber-300/45' : 'bg-gradient-radial from-gray-400/60 via-gray-300/45'} to-transparent rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-1000`}></div>
            
            {/* Smart Status Indicators */}
            <div className={`absolute ${isMobile ? '-top-1 -left-1 w-4 h-4' : '-top-2 -left-2 w-6 h-6'} ${connectionStatus === 'online' ? 'bg-green-500' : 'bg-red-500'} rounded-full animate-pulse ${isMobile ? 'border-2' : 'border-3'} border-white flex items-center justify-center shadow-lg`}>
              <Signal className={`${isMobile ? 'h-1 w-1' : 'h-2 w-2'} text-white`} />
            </div>
            
            {/* Performance & Section Indicator */}
            <div className={`absolute ${isMobile ? '-bottom-2 -right-2 w-5 h-5' : '-bottom-3 -right-3 w-7 h-7'} ${currentSection === 'contact' ? 'bg-blue-500' : 'bg-purple-500'} rounded-full ${isMobile ? 'border-2' : 'border-3'} border-white flex items-center justify-center animate-bounce shadow-xl`}>
              <Navigation className={`${isMobile ? 'h-2 w-2' : 'h-3 w-3'} text-white`} />
            </div>
            
            {/* Interaction Counter */}
            {interactionCount > 5 && (
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
            )}
            
            {rippleEffect.phone && (
              <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
            )}
          </Button>
        )}

        {/* Ultra Premium Scroll to Top Button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            onMouseEnter={() => handleButtonHover('scroll', true)}
            onMouseLeave={() => handleButtonHover('scroll', false)}
            className={`group relative ${navButtonSize} ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-2xl transition-all duration-700 hover:scale-110 ${isMobile ? 'border-2' : 'border-4'} border-white/40 backdrop-blur-xl overflow-hidden ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white' 
                : 'bg-gradient-to-br from-slate-100 via-white to-slate-200 hover:from-white hover:to-slate-100 text-slate-800'
            } ${activeButton === 'scroll' ? 'scale-110 -translate-y-3 shadow-3xl' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-radial from-slate-400/20 via-slate-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-slate-300/20 animate-ping rounded-xl opacity-0 group-hover:opacity-50"></div>
            
            {/* Upward Motion Effects */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse opacity-60"></div>
            {!isMobile && (
              <div className="absolute inset-2 border border-slate-400/20 rounded-2xl animate-pulse opacity-30"></div>
            )}
            
            <ChevronUp className={`${iconSize} group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 relative z-10 animate-bounce drop-shadow-lg`} />
            <div className={`absolute ${isMobile ? '-inset-2' : '-inset-4'} bg-slate-400/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
            
            {rippleEffect.scroll && (
              <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping"></div>
            )}
          </Button>
        )}
      </div>

      {/* Professional Tooltip System - Hidden on mobile */}
      {activeButton && !isMobile && (
        <div className={`fixed bottom-32 right-32 z-40 px-6 py-4 rounded-2xl shadow-2xl border-2 backdrop-blur-xl transition-all duration-500 transform scale-105 ${
          isDarkMode 
            ? 'bg-slate-900/90 border-slate-700/50 text-white' 
            : 'bg-white/90 border-slate-300/50 text-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            {activeButton === 'whatsapp' && <WhatsAppIcon className="h-5 w-5 text-green-500" />}
            {activeButton === 'phone' && <Phone className="h-5 w-5 text-orange-500" />}
            {activeButton === 'services' && <Shield className="h-5 w-5 text-emerald-500" />}
            {activeButton === 'contact' && <Mail className="h-5 w-5 text-amber-500" />}
            {activeButton === 'home' && <Home className="h-5 w-5 text-blue-500" />}
            {activeButton === 'scroll' && <ChevronUp className="h-5 w-5 text-slate-500" />}
            <span className="font-semibold text-lg drop-shadow-sm">
              {activeButton === 'whatsapp' && 'واتساب - تواصل فوري ✨'}
              {activeButton === 'phone' && 'اتصال مباشر - خدمة 24/7 📞'}
              {activeButton === 'services' && 'خدماتنا المتميزة 🛡️'}
              {activeButton === 'contact' && 'تواصل معنا 📧'}
              {activeButton === 'home' && 'الصفحة الرئيسية 🏠'}
              {activeButton === 'scroll' && 'العودة للأعلى ⬆️'}
            </span>
          </div>
          
          {/* Tooltip Arrow */}
          <div className={`absolute top-1/2 -right-1 transform -translate-y-1/2 w-3 h-3 rotate-45 border-r-2 border-b-2 ${
            isDarkMode ? 'bg-slate-900/90 border-slate-700/50' : 'bg-white/90 border-slate-300/50'
          }`}></div>
        </div>
      )}
    </>
  );
};

export default FloatingNavigation;
