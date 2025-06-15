
import React, { useState, useEffect } from 'react';
import { ChevronDown, Star, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdvancedHeroProps {
  isDarkMode: boolean;
  siteData: {
    title: string;
    subtitle: string;
    description: string;
  };
  onPhoneCall: () => void;
  onWhatsApp: () => void;
}

const AdvancedHero: React.FC<AdvancedHeroProps> = ({
  isDarkMode,
  siteData,
  onPhoneCall,
  onWhatsApp
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroSlides = [
    {
      title: 'خدمة نقل احترافية',
      subtitle: 'نصل إليك في أسرع وقت ممكن',
      background: 'bg-gradient-to-r from-blue-600 to-purple-600'
    },
    {
      title: 'معدات متطورة',
      subtitle: 'سطحات هيدروليكية حديثة',
      background: 'bg-gradient-to-r from-green-600 to-teal-600'
    },
    {
      title: 'فريق محترف',
      subtitle: 'سائقين ذوي خبرة عالية',
      background: 'bg-gradient-to-r from-amber-600 to-orange-600'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className={`absolute inset-0 ${heroSlides[currentSlide].background} transition-all duration-1000`}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-white/10 rounded-full animate-bounce opacity-30" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Hero Content */}
      <div className={`relative z-10 text-center px-6 max-w-6xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        {/* Logo */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-8xl md:text-9xl lg:text-[10rem] animate-pulse">🚛</div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 text-white drop-shadow-2xl">
          {siteData.title}
        </h1>

        {/* Subtitle with animation */}
        <div className="mb-8 h-20 flex items-center justify-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white/90 transition-all duration-500">
            {heroSlides[currentSlide].title}
          </h2>
        </div>

        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
          {heroSlides[currentSlide].subtitle}
        </p>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-semibold">تقييم 5 نجوم</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <Shield className="h-5 w-5 text-green-400" />
            <span className="text-white font-semibold">مؤمن بالكامل</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <Clock className="h-5 w-5 text-blue-400" />
            <span className="text-white font-semibold">خدمة 24/7</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            onClick={onPhoneCall}
            className="px-8 py-4 text-lg font-bold rounded-2xl bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            📞 اتصل الآن
          </Button>
          <Button
            onClick={onWhatsApp}
            className="px-8 py-4 text-lg font-bold rounded-2xl bg-green-600 hover:bg-green-700 text-white border-2 border-green-500 hover:border-green-400 transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            💬 واتساب
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce cursor-pointer" onClick={scrollToServices}>
          <ChevronDown className="h-8 w-8 text-white/70 mx-auto" />
          <p className="text-white/70 text-sm mt-2">اكتشف خدماتنا</p>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default AdvancedHero;
