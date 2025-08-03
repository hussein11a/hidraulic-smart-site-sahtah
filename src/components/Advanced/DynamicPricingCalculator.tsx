import React, { useState, useEffect } from 'react';
import { Calculator, MapPin, Clock, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PricingData {
  distance: number;
  serviceType: string;
  timeOfDay: string;
  vehicleType: string;
  estimatedPrice: number;
}

interface DynamicPricingCalculatorProps {
  isDarkMode: boolean;
}

const DynamicPricingCalculator: React.FC<DynamicPricingCalculatorProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pricing, setPricing] = useState<PricingData>({
    distance: 0,
    serviceType: 'standard',
    timeOfDay: 'day',
    vehicleType: 'sedan',
    estimatedPrice: 0
  });

  const serviceTypes = [
    { id: 'standard', name: 'خدمة عادية', multiplier: 1 },
    { id: 'express', name: 'خدمة سريعة', multiplier: 1.5 },
    { id: 'emergency', name: 'طوارئ', multiplier: 2 }
  ];

  const vehicleTypes = [
    { id: 'sedan', name: 'سيدان', multiplier: 1 },
    { id: 'suv', name: 'دفع رباعي', multiplier: 1.3 },
    { id: 'truck', name: 'شاحنة', multiplier: 1.8 },
    { id: 'luxury', name: 'فاخرة', multiplier: 2.2 }
  ];

  useEffect(() => {
    // Calculate estimated price
    const basePrice = 100; // Base price in SAR
    const distanceRate = 5; // Per km
    const serviceMultiplier = serviceTypes.find(s => s.id === pricing.serviceType)?.multiplier || 1;
    const vehicleMultiplier = vehicleTypes.find(v => v.id === pricing.vehicleType)?.multiplier || 1;
    const timeMultiplier = pricing.timeOfDay === 'night' ? 1.3 : 1;

    const calculatedPrice = (basePrice + (pricing.distance * distanceRate)) * 
                           serviceMultiplier * vehicleMultiplier * timeMultiplier;

    setPricing(prev => ({ ...prev, estimatedPrice: Math.round(calculatedPrice) }));
  }, [pricing.distance, pricing.serviceType, pricing.timeOfDay, pricing.vehicleType]);

  return (
    <>
      {/* Calculator Toggle */}
      <div className="fixed bottom-36 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
            isDarkMode 
              ? "bg-green-600 hover:bg-green-500 text-white" 
              : "bg-green-600 hover:bg-green-700 text-white"
          )}
        >
          <Calculator size={24} />
        </Button>
      </div>

      {/* Calculator Panel */}
      {isOpen && (
        <Card className={cn(
          "fixed bottom-52 right-4 w-80 p-6 shadow-2xl z-50 transition-all duration-300",
          isDarkMode 
            ? "bg-slate-800 border-slate-700 text-white" 
            : "bg-white border-gray-200"
        )}>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-center mb-4">حاسبة الأسعار الذكية</h3>

            {/* Distance Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <MapPin size={16} />
                المسافة (كم)
              </label>
              <input
                type="number"
                value={pricing.distance}
                onChange={(e) => setPricing(prev => ({ ...prev, distance: Number(e.target.value) }))}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500",
                  isDarkMode 
                    ? "bg-slate-700 border-slate-600 text-white" 
                    : "bg-white border-gray-300"
                )}
                placeholder="أدخل المسافة"
                min="0"
              />
            </div>

            {/* Service Type */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Clock size={16} />
                نوع الخدمة
              </label>
              <select
                value={pricing.serviceType}
                onChange={(e) => setPricing(prev => ({ ...prev, serviceType: e.target.value }))}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500",
                  isDarkMode 
                    ? "bg-slate-700 border-slate-600 text-white" 
                    : "bg-white border-gray-300"
                )}
              >
                {serviceTypes.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Car size={16} />
                نوع المركبة
              </label>
              <select
                value={pricing.vehicleType}
                onChange={(e) => setPricing(prev => ({ ...prev, vehicleType: e.target.value }))}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500",
                  isDarkMode 
                    ? "bg-slate-700 border-slate-600 text-white" 
                    : "bg-white border-gray-300"
                )}
              >
                {vehicleTypes.map(vehicle => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Time of Day */}
            <div>
              <label className="text-sm font-medium mb-2 block">وقت الخدمة</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setPricing(prev => ({ ...prev, timeOfDay: 'day' }))}
                  className={cn(
                    "flex-1 py-2 px-3 rounded-lg text-sm transition-colors",
                    pricing.timeOfDay === 'day'
                      ? "bg-blue-600 text-white"
                      : isDarkMode 
                        ? "bg-slate-700 text-gray-300 hover:bg-slate-600" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  نهاري
                </button>
                <button
                  onClick={() => setPricing(prev => ({ ...prev, timeOfDay: 'night' }))}
                  className={cn(
                    "flex-1 py-2 px-3 rounded-lg text-sm transition-colors",
                    pricing.timeOfDay === 'night'
                      ? "bg-blue-600 text-white"
                      : isDarkMode 
                        ? "bg-slate-700 text-gray-300 hover:bg-slate-600" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  ليلي (+30%)
                </button>
              </div>
            </div>

            {/* Estimated Price */}
            <div className={cn(
              "p-4 rounded-lg text-center",
              isDarkMode ? "bg-slate-700" : "bg-blue-50"
            )}>
              <div className="text-sm text-gray-500 mb-1">السعر المتوقع</div>
              <div className="text-2xl font-bold text-blue-600">
                {pricing.estimatedPrice} ر.س
              </div>
              <div className="text-xs text-gray-400 mt-1">
                *الأسعار تقديرية وقد تختلف حسب الظروف
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={() => window.location.href = `tel:+966503269219`}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                احجز الآن
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                className={cn(
                  "flex-1",
                  isDarkMode ? "border-slate-600 text-gray-300" : ""
                )}
              >
                إغلاق
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default DynamicPricingCalculator;