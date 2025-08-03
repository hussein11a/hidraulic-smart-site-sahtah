import React, { useState, useEffect } from 'react';
import { Navigation, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TrackingStatus {
  id: string;
  status: 'pending' | 'dispatched' | 'enroute' | 'arrived' | 'completed';
  estimatedTime: number;
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  location: string;
}

interface AdvancedTrackingProps {
  isDarkMode: boolean;
}

const AdvancedTracking: React.FC<AdvancedTrackingProps> = ({ isDarkMode }) => {
  const [tracking, setTracking] = useState<TrackingStatus | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    // Show demo tracking after 20 seconds
    const timer = setTimeout(() => {
      setShowDemo(true);
      setTracking({
        id: 'TR123456',
        status: 'enroute',
        estimatedTime: 15,
        driverName: 'أحمد محمد',
        driverPhone: '+966501234567',
        vehicleNumber: 'ا ب ج 1234',
        location: 'طريق الملك فهد - الرياض'
      });
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const statusSteps = [
    { id: 'pending', label: 'في الانتظار', icon: Clock },
    { id: 'dispatched', label: 'تم الإرسال', icon: Navigation },
    { id: 'enroute', label: 'في الطريق', icon: Navigation },
    { id: 'arrived', label: 'وصل السائق', icon: CheckCircle },
    { id: 'completed', label: 'تم الإنجاز', icon: CheckCircle }
  ];

  if (!showDemo || !tracking) return null;

  const currentStepIndex = statusSteps.findIndex(step => step.id === tracking.status);

  return (
    <div className="fixed top-1/2 left-4 transform -translate-y-1/2 z-40">
      <Card className={cn(
        "w-80 p-6 shadow-2xl transition-all duration-300",
        isDarkMode 
          ? "bg-slate-800 border-slate-700 text-white" 
          : "bg-white border-gray-200"
      )}>
        <div className="space-y-4">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Navigation size={20} className="text-blue-500" />
              <h3 className="text-lg font-bold">تتبع الطلب</h3>
            </div>
            <div className={cn(
              "text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )}>
              رقم الطلب: {tracking.id}
            </div>
          </div>

          {/* Status Progress */}
          <div className="space-y-3">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const Icon = step.icon;

              return (
                <div key={step.id} className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                    isCompleted 
                      ? "bg-green-500 text-white" 
                      : isDarkMode 
                        ? "bg-slate-700 text-gray-400" 
                        : "bg-gray-200 text-gray-500"
                  )}>
                    <Icon size={16} />
                  </div>
                  
                  <div className="flex-1">
                    <div className={cn(
                      "font-medium",
                      isCurrent ? "text-blue-500" : isCompleted ? "text-green-500" : ""
                    )}>
                      {step.label}
                    </div>
                    
                    {isCurrent && tracking.status === 'enroute' && (
                      <div className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>
                        الوصول خلال {tracking.estimatedTime} دقيقة
                      </div>
                    )}
                  </div>

                  {isCurrent && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Driver Info */}
          <div className={cn(
            "p-3 rounded-lg",
            isDarkMode ? "bg-slate-700" : "bg-blue-50"
          )}>
            <div className="text-sm font-medium mb-2">معلومات السائق</div>
            <div className="space-y-1 text-sm">
              <div>الاسم: {tracking.driverName}</div>
              <div>الهاتف: {tracking.driverPhone}</div>
              <div>رقم المركبة: {tracking.vehicleNumber}</div>
            </div>
          </div>

          {/* Current Location */}
          <div className={cn(
            "p-3 rounded-lg",
            isDarkMode ? "bg-slate-700" : "bg-green-50"
          )}>
            <div className="text-sm font-medium mb-1">الموقع الحالي</div>
            <div className="text-sm">{tracking.location}</div>
          </div>

          {/* Estimated Time */}
          {tracking.status === 'enroute' && (
            <div className={cn(
              "text-center p-3 rounded-lg",
              isDarkMode ? "bg-blue-900/30" : "bg-blue-100"
            )}>
              <div className="text-lg font-bold text-blue-500">
                {tracking.estimatedTime} دقيقة
              </div>
              <div className="text-sm">وقت الوصول المتوقع</div>
            </div>
          )}

          {/* Close Demo */}
          <button
            onClick={() => setShowDemo(false)}
            className={cn(
              "w-full py-2 px-4 rounded-lg text-sm transition-colors",
              isDarkMode 
                ? "bg-slate-700 text-gray-300 hover:bg-slate-600" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            إغلاق العرض التوضيحي
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AdvancedTracking;