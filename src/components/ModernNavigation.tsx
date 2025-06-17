
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
    { href: '#testimonials', label: 'آراء العملاء' },
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
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <span className="text-white text-2xl">🚛</span>
              </div>
              <div>
                <h2 className={`text-xl font-black ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  سطحة هيدروليك
                </h2>
                <p className={`text-xs ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  خدمة احترافية
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-semibold transition-colors duration-200 hover:scale-105 ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400' 
                      : 'text-slate-600 hover:text-blue-600'
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
                className={`rounded-full p-2 ${
                  isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
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
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  اتصل
                </Button>
                <Button
                  onClick={onWhatsApp}
                  size="sm"
                  variant="outline"
                  className={`rounded-full px-4 ${
                    isDarkMode 
                      ? 'border-green-500 text-green-400 hover:bg-green-500 hover:text-white' 
                      : 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
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
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className={`text-2xl font-bold transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-slate-200 hover:text-blue-400' 
                    : 'text-slate-800 hover:text-blue-600'
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
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
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
                variant="outline"
                className={`rounded-full px-8 ${
                  isDarkMode 
                    ? 'border-green-500 text-green-400 hover:bg-green-500 hover:text-white' 
                    : 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
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
