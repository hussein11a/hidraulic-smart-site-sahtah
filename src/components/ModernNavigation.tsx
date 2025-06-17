
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, MessageCircle, Sun, Moon } from 'lucide-react';

interface ModernNavigationProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onPhoneCall: () => void;
  onWhatsApp: () => void;
}

const ModernNavigation: React.FC<ModernNavigationProps> = ({
  isDarkMode,
  onToggleTheme,
  onPhoneCall,
  onWhatsApp
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'الرئيسية' },
    { href: '#services', label: 'خدماتنا' },
    { href: '#features', label: 'مميزاتنا' },
    { href: '#contact', label: 'تواصل معنا' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? `backdrop-blur-md border-b ${
              isDarkMode 
                ? 'bg-slate-900/90 border-slate-700' 
                : 'bg-white/90 border-slate-200'
            }`
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center p-2 transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-2 border-amber-500/30' 
                  : 'bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-200'
              }`}>
                <img 
                  src="/lovable-uploads/53c7547b-fc11-4442-b5f6-798e6e1aa08f.png" 
                  alt="شاحنة السطحة الهيدروليكية" 
                  className="w-full h-full object-contain filter brightness-110"
                />
              </div>
              <div>
                <h2 className={`text-xl md:text-2xl font-black ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  سطحة هيدروليك
                </h2>
                <p className={`text-xs md:text-sm font-semibold ${
                  isDarkMode ? 'text-amber-400' : 'text-amber-600'
                }`}>
                  خدمة احترافية • متاح 24/7
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-semibold transition-all duration-200 hover:scale-105 px-3 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/50' 
                      : 'text-slate-600 hover:text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <Button
                onClick={onToggleTheme}
                variant="ghost"
                size="sm"
                className={`rounded-full p-2 transition-all duration-300 ${
                  isDarkMode ? 'hover:bg-slate-700 hover:text-amber-400' : 'hover:bg-amber-50 hover:text-amber-600'
                }`}
              >
                {isDarkMode ? 
                  <Sun className="w-5 h-5 text-amber-500" /> : 
                  <Moon className="w-5 h-5 text-slate-600" />
                }
              </Button>

              {/* Contact Buttons - Desktop */}
              <div className="hidden md:flex items-center gap-2">
                <Button
                  onClick={onPhoneCall}
                  size="sm"
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full px-4 py-2 font-semibold shadow-lg hover:shadow-green-500/30 transition-all duration-300"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  اتصل
                </Button>
                <Button
                  onClick={onWhatsApp}
                  size="sm"
                  className={`rounded-full px-4 py-2 font-semibold shadow-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-blue-500/30' 
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-blue-400/30'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  واتساب
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                variant="ghost"
                size="sm"
                className={`lg:hidden rounded-full p-2 ${
                  isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
                }`}
              >
                {isMobileMenuOpen ? 
                  <X className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`} /> : 
                  <Menu className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`} />
                }
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-40 lg:hidden ${
          isDarkMode ? 'bg-slate-900/95' : 'bg-white/95'
        } backdrop-blur-md`}>
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {/* Mobile Logo */}
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center p-3 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-2 border-amber-500/30' 
                  : 'bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-200'
              }`}>
                <img 
                  src="/lovable-uploads/53c7547b-fc11-4442-b5f6-798e6e1aa08f.png" 
                  alt="شاحنة السطحة الهيدروليكية" 
                  className="w-full h-full object-contain filter brightness-110"
                />
              </div>
              <h2 className={`text-2xl font-black ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                سطحة هيدروليك
              </h2>
            </div>

            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className={`text-2xl font-bold transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-slate-200 hover:text-amber-400' 
                    : 'text-slate-800 hover:text-amber-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Contact Buttons */}
            <div className="flex flex-col gap-4 mt-8">
              <Button
                onClick={() => {
                  onPhoneCall();
                  setIsMobileMenuOpen(false);
                }}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full px-8 py-3 font-bold shadow-xl"
              >
                <Phone className="w-5 h-5 mr-3" />
                اتصل الآن
              </Button>
              <Button
                onClick={() => {
                  onWhatsApp();
                  setIsMobileMenuOpen(false);
                }}
                size="lg"
                className={`rounded-full px-8 py-3 font-bold shadow-xl ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                }`}
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                واتساب
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModernNavigation;
