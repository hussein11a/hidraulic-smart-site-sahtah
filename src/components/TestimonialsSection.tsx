
import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  serviceUsed: string;
}

interface TestimonialsSectionProps {
  isDarkMode: boolean;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ isDarkMode }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "أحمد محمد",
      location: "الرياض",
      rating: 5,
      comment: "خدمة ممتازة وسريعة جداً! وصلوا في الوقت المحدد تماماً وتعاملوا مع سيارتي بعناية فائقة. أنصح بهم بشدة.",
      date: "2024-01-15",
      serviceUsed: "نقل سيارة معطلة"
    },
    {
      id: 2,
      name: "فاطمة العلي",
      location: "جدة",
      rating: 5,
      comment: "احترافية في العمل وأمانة في التعامل. تم نقل سيارتي الفاخرة بكل حرص وأمان. شكراً لكم على الخدمة المميزة.",
      date: "2024-01-10",
      serviceUsed: "نقل السيارات الفاخرة"
    },
    {
      id: 3,
      name: "خالد السعد",
      location: "الدمام",
      rating: 5,
      comment: "خدمة 24 ساعة حقيقية! اتصلت بهم في منتصف الليل وجاؤوا فوراً. فريق محترف ومعدات حديثة.",
      date: "2024-01-08",
      serviceUsed: "خدمة طوارئ 24 ساعة"
    },
    {
      id: 4,
      name: "نورا الحربي",
      location: "المدينة المنورة",
      rating: 5,
      comment: "أفضل سطحة تعاملت معها. نقلوا سيارتي من المدينة إلى مكة بكل سلاسة وفي الوقت المحدد.",
      date: "2024-01-05",
      serviceUsed: "نقل بين المدن"
    },
    {
      id: 5,
      name: "محمد الزهراني",
      location: "الطائف",
      rating: 5,
      comment: "تعامل راقي وأسعار معقولة. الفريق مدرب جيداً وتم نقل دراجتي النارية بأمان تام.",
      date: "2024-01-03",
      serviceUsed: "نقل الدراجات النارية"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-6 h-6 ${i < rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className={`py-32 lg:py-48 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90' 
        : 'bg-gradient-to-br from-amber-50/50 via-white/80 to-slate-50/70'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl ${
          isDarkMode ? 'bg-amber-500' : 'bg-amber-400'
        } animate-pulse`}></div>
        <div className={`absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-10 blur-3xl ${
          isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
        } animate-pulse`} style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-full mb-8 border-2 shadow-xl ${
            isDarkMode 
              ? 'bg-slate-800/60 border-amber-400/50 text-amber-300' 
              : 'bg-white/80 border-amber-300/60 text-amber-700'
          }`}>
            <Quote className="w-6 h-6" />
            <span className="text-xl font-bold">آراء عملائنا</span>
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
          </div>
          
          <h2 className={`text-7xl lg:text-8xl font-black mb-12 leading-none ${
            isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-amber-300 to-slate-100' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-amber-600 to-slate-800'
          }`}>
            شهادات العملاء
          </h2>
          
          <div className={`w-48 h-3 mx-auto rounded-full mb-12 shadow-2xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-amber-400 via-slate-300 to-amber-400' 
              : 'bg-gradient-to-r from-amber-500 via-slate-600 to-amber-500'
          }`}></div>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-6xl mx-auto">
          <div className={`relative p-12 rounded-3xl shadow-3xl border-2 ${
            isDarkMode 
              ? 'bg-slate-800/90 border-slate-600/50' 
              : 'bg-white/90 border-slate-200/60'
          } backdrop-blur-sm`}>
            
            {/* Quote Icon */}
            <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl ${
              isDarkMode ? 'bg-amber-600' : 'bg-amber-500'
            }`}>
              <Quote className="w-8 h-8 text-white" />
            </div>

            {/* Testimonial Content */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              
              <blockquote className={`text-3xl lg:text-4xl leading-relaxed mb-8 font-medium ${
                isDarkMode ? 'text-slate-200' : 'text-slate-700'
              }`}>
                "{testimonials[currentTestimonial].comment}"
              </blockquote>
              
              <div className={`flex items-center justify-center gap-4 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
                }`}>
                  <User className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-lg">{testimonials[currentTestimonial].location}</div>
                  <div className={`text-base ${
                    isDarkMode ? 'text-amber-400' : 'text-amber-600'
                  }`}>
                    {testimonials[currentTestimonial].serviceUsed}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full transition-all duration-300 hover:scale-110 shadow-xl ${
                isDarkMode 
                  ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                  : 'bg-white hover:bg-slate-50 text-slate-800'
              }`}
            >
              <ChevronLeft className="w-8 h-8 mx-auto" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full transition-all duration-300 hover:scale-110 shadow-xl ${
                isDarkMode 
                  ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                  : 'bg-white hover:bg-slate-50 text-slate-800'
              }`}
            >
              <ChevronRight className="w-8 h-8 mx-auto" />
            </button>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentTestimonial(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? (isDarkMode ? 'bg-amber-400 shadow-lg' : 'bg-amber-500 shadow-lg')
                    : (isDarkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-300 hover:bg-slate-400')
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
