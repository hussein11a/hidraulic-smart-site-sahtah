import React, { useState, useEffect } from 'react';
import { Eye, Users, Clock, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsData {
  visitors: number;
  pageViews: number;
  averageTime: string;
  bounceRate: number;
}

interface RealTimeAnalyticsProps {
  isDarkMode: boolean;
}

const RealTimeAnalytics: React.FC<RealTimeAnalyticsProps> = ({ isDarkMode }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    visitors: 0,
    pageViews: 0,
    averageTime: '0:00',
    bounceRate: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate real-time analytics data
    const updateAnalytics = () => {
      setAnalytics(prev => ({
        visitors: prev.visitors + Math.floor(Math.random() * 3),
        pageViews: prev.pageViews + Math.floor(Math.random() * 5),
        averageTime: `${Math.floor(Math.random() * 5)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        bounceRate: Math.max(0, Math.min(100, prev.bounceRate + (Math.random() - 0.5) * 10))
      }));
    };

    // Initial data
    setAnalytics({
      visitors: Math.floor(Math.random() * 50) + 20,
      pageViews: Math.floor(Math.random() * 100) + 50,
      averageTime: `${Math.floor(Math.random() * 5)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      bounceRate: Math.floor(Math.random() * 40) + 30
    });

    const interval = setInterval(updateAnalytics, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Show analytics after 10 seconds
    const timer = setTimeout(() => setIsVisible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 z-40">
      <div className={cn(
        "p-4 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105",
        isDarkMode 
          ? "bg-slate-800/90 border border-slate-700 text-white" 
          : "bg-white/90 border border-gray-200 text-slate-800"
      )}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold">إحصائيات مباشرة</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-blue-500" />
            <div>
              <div className="font-semibold">{analytics.visitors}</div>
              <div className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>زوار</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Eye size={14} className="text-green-500" />
            <div>
              <div className="font-semibold">{analytics.pageViews}</div>
              <div className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>مشاهدات</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={14} className="text-orange-500" />
            <div>
              <div className="font-semibold">{analytics.averageTime}</div>
              <div className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>متوسط الوقت</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-purple-500" />
            <div>
              <div className="font-semibold">{analytics.bounceRate.toFixed(1)}%</div>
              <div className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>معدل الارتداد</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeAnalytics;