
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import OptimizedImage from './OptimizedImage';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  available: boolean;
  sort_order: number;
}

interface ModernServicesProps {
  services: Service[];
  isDarkMode: boolean;
}

const ModernServices: React.FC<ModernServicesProps> = ({ services, isDarkMode }) => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-slate-800/30' : 'bg-slate-50'}`} id="services">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-black mb-6 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            خدماتنا المتميزة
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded-full mb-6"></div>
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            نقدم مجموعة شاملة من خدمات نقل السيارات باستخدام أحدث التقنيات والمعدات
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className={`group relative overflow-hidden transition-all duration-500 hover:scale-105 border-2 cursor-pointer ${
                isDarkMode
                  ? 'bg-gradient-to-br from-slate-700/60 to-slate-800/60 border-slate-600 hover:border-blue-500/50'
                  : 'bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-blue-300'
              } ${hoveredService === service.id ? 'shadow-2xl' : 'shadow-lg'}`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <div className={`w-full h-full rounded-full ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                }`}></div>
              </div>

              <div className="relative p-6 z-10">
                {/* Service Icon */}
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 ${
                    isDarkMode ? 'bg-slate-600/60' : 'bg-blue-50'
                  }`}>
                    {service.icon}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className={`text-lg font-bold mb-3 text-center leading-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className={`text-sm leading-relaxed text-center ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {service.description}
                </p>

                {/* Available Badge */}
                {service.available && (
                  <div className="mt-4 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      isDarkMode 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      ✓ متاح الآن
                    </span>
                  </div>
                )}

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${
            isDarkMode ? 'bg-slate-700/60' : 'bg-white'
          } shadow-lg`}>
            <span className="animate-pulse text-green-500">●</span>
            <span className={`text-sm font-semibold ${
              isDarkMode ? 'text-slate-200' : 'text-slate-700'
            }`}>
              جميع الخدمات متاحة على مدار 24 ساعة
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernServices;
