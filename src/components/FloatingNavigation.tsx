import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, MessageCircle, X, Settings, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface Position {
  x: number;
  y: number;
}

const WhatsAppIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.515z"/>
  </svg>
);

const FloatingNavigation: React.FC<FloatingNavigationProps> = ({
  isDarkMode,
  buttonsData,
  handlePhoneCall,
  handleWhatsApp
}) => {
  // State Management
  const [position, setPosition] = useState<Position>({ x: 24, y: 24 });
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [lastUsed, setLastUsed] = useState<'phone' | 'whatsapp' | null>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [hoverButton, setHoverButton] = useState<string | null>(null);
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);
  const rippleCounter = useRef(0);

  // Load saved position from localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem('floating-buttons-position');
    if (savedPosition) {
      try {
        const parsed = JSON.parse(savedPosition);
        setPosition(parsed);
      } catch (error) {
        console.warn('Failed to parse saved position');
      }
    }
  }, []);

  // Save position to localStorage
  const savePosition = useCallback((newPosition: Position) => {
    localStorage.setItem('floating-buttons-position', JSON.stringify(newPosition));
  }, []);

  // Drag functionality
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only handle left click
    
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    e.preventDefault();
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragRef.current) return;
    
    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;
    
    const newX = Math.max(0, Math.min(window.innerWidth - 80, dragRef.current.startPosX + deltaX));
    const newY = Math.max(0, Math.min(window.innerHeight - 200, dragRef.current.startPosY + deltaY));
    
    setPosition({ x: newX, y: newY });
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragRef.current = null;
    
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    
    // Save position after drag ends
    setTimeout(() => {
      savePosition(position);
    }, 100);
  }, [position, savePosition]);

  // Touch events for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    dragRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startPosX: position.x,
      startPosY: position.y
    };
    e.preventDefault();
  }, [position]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragRef.current) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragRef.current.startX;
    const deltaY = touch.clientY - dragRef.current.startY;
    
    const newX = Math.max(0, Math.min(window.innerWidth - 80, dragRef.current.startPosX + deltaX));
    const newY = Math.max(0, Math.min(window.innerHeight - 200, dragRef.current.startPosY + deltaY));
    
    setPosition({ x: newX, y: newY });
    e.preventDefault();
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    dragRef.current = null;
    savePosition(position);
  }, [position, savePosition]);

  // Ripple effect
  const createRipple = useCallback((e: React.MouseEvent, buttonRef: HTMLButtonElement) => {
    const rect = buttonRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rippleId = rippleCounter.current++;
    setRipples(prev => [...prev, { id: rippleId, x, y }]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== rippleId));
    }, 600);
  }, []);

  // Enhanced button handlers
  const handlePhoneCallEnhanced = useCallback((e: React.MouseEvent) => {
    if (isDragging) return;
    
    const button = e.currentTarget as HTMLButtonElement;
    createRipple(e, button);
    setLastUsed('phone');
    
    // Add vibration on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    setTimeout(() => {
      handlePhoneCall();
    }, 150);
  }, [isDragging, createRipple, handlePhoneCall]);

  const handleWhatsAppEnhanced = useCallback((e: React.MouseEvent) => {
    if (isDragging) return;
    
    const button = e.currentTarget as HTMLButtonElement;
    createRipple(e, button);
    setLastUsed('whatsapp');
    
    // Add vibration on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    setTimeout(() => {
      handleWhatsApp();
    }, 150);
  }, [isDragging, createRipple, handleWhatsApp]);

  // Reset position
  const resetPosition = useCallback(() => {
    setPosition({ x: 24, y: 24 });
    savePosition({ x: 24, y: 24 });
  }, [savePosition]);

  // Auto-minimize disabled to keep buttons always visible
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (!isDragging && !isExpanded) {
  //       setIsMinimized(true);
  //     }
  //   }, 10000);

  //   return () => clearTimeout(timer);
  // }, [isDragging, isExpanded, lastUsed]);

  // Enhanced position calculation with maximum visibility
  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    right: `${position.x}px`,
    bottom: `${position.y}px`,
    zIndex: 2147483647,
    transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isDragging ? 'scale(1.05)' : 'scale(1)',
    filter: isDragging ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' : 'none',
    pointerEvents: 'auto',
    visibility: 'visible',
    opacity: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  if (isMinimized) {
    return (
      <div 
        style={containerStyle}
        className="cursor-pointer"
        onClick={() => setIsMinimized(false)}
      >
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full shadow-xl flex items-center justify-center animate-pulse">
          <MessageCircle className="h-6 w-6 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      style={{
        ...containerStyle,
        position: 'fixed !important' as any,
        zIndex: '2147483647 !important' as any,
        visibility: 'visible !important' as any,
        opacity: '1 !important' as any,
        pointerEvents: 'auto !important' as any
      }}
      className={cn(
        "flex flex-col gap-3 select-none",
        "!fixed !z-[2147483647] !visible !opacity-100",
        isDragging && "cursor-grabbing"
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Control buttons */}
      <div className={cn(
        "flex gap-2 transition-all duration-300",
        isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
      )}>
        <button
          onClick={resetPosition}
          className="w-8 h-8 bg-gray-600 hover:bg-gray-700 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center text-white hover:scale-110"
          aria-label="إعادة تعيين الموضع"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => setIsMinimized(true)}
          className="w-8 h-8 bg-gray-600 hover:bg-gray-700 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center text-white hover:scale-110"
          aria-label="تصغير"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Settings button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center text-white",
          isExpanded && "rotate-180"
        )}
        aria-label="الإعدادات"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* WhatsApp Button */}
      {buttonsData.whatsapp?.enabled && (
        <button
          onClick={handleWhatsAppEnhanced}
          onMouseEnter={() => setHoverButton('whatsapp')}
          onMouseLeave={() => setHoverButton(null)}
          className={cn(
            "group relative w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center text-white overflow-hidden",
            "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
            "hover:scale-110 active:scale-95",
            lastUsed === 'whatsapp' && "ring-2 ring-green-300 ring-offset-2",
            hoverButton === 'whatsapp' && "shadow-2xl shadow-green-500/50"
          )}
          aria-label="تواصل عبر الواتساب"
        >
          <WhatsAppIcon className="h-7 w-7 relative z-10" />
          
          {/* Ripple effects */}
          {ripples.map(ripple => (
            <div
              key={ripple.id}
              className="absolute rounded-full bg-white/30 animate-ping"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
                animationDuration: '0.6s'
              }}
            />
          ))}
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </button>
      )}

      {/* Phone Button */}
      {buttonsData.phone?.enabled && (
        <button
          onClick={handlePhoneCallEnhanced}
          onMouseEnter={() => setHoverButton('phone')}
          onMouseLeave={() => setHoverButton(null)}
          className={cn(
            "group relative w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center text-white overflow-hidden",
            "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
            "hover:scale-110 active:scale-95",
            lastUsed === 'phone' && "ring-2 ring-blue-300 ring-offset-2",
            hoverButton === 'phone' && "shadow-2xl shadow-blue-500/50"
          )}
          aria-label="اتصل الآن"
        >
          <Phone className="h-7 w-7 relative z-10" />
          
          {/* Ripple effects */}
          {ripples.map(ripple => (
            <div
              key={ripple.id}
              className="absolute rounded-full bg-white/30 animate-ping"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
                animationDuration: '0.6s'
              }}
            />
          ))}
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </button>
      )}

      {/* Drag indicator */}
      {isDragging && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
          اسحب لتغيير الموضع
        </div>
      )}
    </div>
  );
};

export default FloatingNavigation;