import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface SmartNotificationsProps {
  isDarkMode: boolean;
}

const SmartNotifications: React.FC<SmartNotificationsProps> = ({ isDarkMode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Simulate smart notifications
    const notificationTemplates = [
      {
        type: 'info' as const,
        title: 'عرض خاص',
        message: 'خصم 20% على جميع الخدمات لهذا الأسبوع!'
      },
      {
        type: 'success' as const,
        title: 'تحديث الخدمة',
        message: 'تم تحسين أوقات الاستجابة بنسبة 30%'
      },
      {
        type: 'warning' as const,
        title: 'طقس سيء',
        message: 'قد تتأثر أوقات الوصول بسبب الأحوال الجوية'
      },
      {
        type: 'info' as const,
        title: 'خدمة جديدة',
        message: 'الآن نوفر خدمة نقل الدراجات النارية!'
      }
    ];

    let notificationIndex = 0;
    const addNotification = () => {
      if (notificationIndex < notificationTemplates.length) {
        const template = notificationTemplates[notificationIndex];
        const newNotification: Notification = {
          id: Date.now().toString(),
          ...template,
          timestamp: new Date(),
          read: false
        };

        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
        notificationIndex++;
      }
    };

    // Add first notification after 15 seconds
    const timer1 = setTimeout(() => addNotification(), 15000);
    // Add more notifications every 30 seconds
    const interval = setInterval(() => addNotification(), 30000);

    return () => {
      clearTimeout(timer1);
      clearInterval(interval);
    };
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  const removeNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-yellow-500" />;
      default:
        return <Info size={16} className="text-blue-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500';
      case 'warning':
        return 'border-l-yellow-500';
      default:
        return 'border-l-blue-500';
    }
  };

  return (
    <>
      {/* Notification Bell */}
      <div className="fixed top-4 left-20 z-50">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
              isDarkMode 
                ? "bg-slate-700 text-white hover:bg-slate-600" 
                : "bg-white text-slate-700 hover:bg-gray-50 border border-gray-200"
            )}
          >
            <Bell size={20} />
          </button>
          
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
        </div>
      </div>

      {/* Notifications Panel */}
      {isOpen && (
        <div className={cn(
          "fixed top-16 left-4 w-80 max-h-96 rounded-lg shadow-2xl z-50 overflow-hidden",
          isDarkMode 
            ? "bg-slate-800 border border-slate-700" 
            : "bg-white border border-gray-200"
        )}>
          {/* Header */}
          <div className={cn(
            "p-4 border-b flex items-center justify-between",
            isDarkMode ? "border-slate-700" : "border-gray-200"
          )}>
            <h3 className="font-semibold">الإشعارات</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-500 hover:underline"
                >
                  تحديد الكل كمقروء
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className={cn(
                  "p-1 rounded hover:bg-gray-100",
                  isDarkMode ? "hover:bg-slate-700" : ""
                )}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className={cn(
                "p-8 text-center",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                لا توجد إشعارات جديدة
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 border-l-4 cursor-pointer transition-colors relative group",
                      getTypeColor(notification.type),
                      notification.read 
                        ? isDarkMode 
                          ? "bg-slate-800 opacity-70" 
                          : "bg-gray-50 opacity-70"
                        : isDarkMode 
                          ? "bg-slate-700 hover:bg-slate-600" 
                          : "bg-white hover:bg-gray-50"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      {getIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                          >
                            <X size={12} />
                          </button>
                        </div>
                        <p className={cn(
                          "text-sm mt-1",
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        )}>
                          {notification.message}
                        </p>
                        <div className={cn(
                          "text-xs mt-2",
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}>
                          {notification.timestamp.toLocaleTimeString('ar-SA', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                    
                    {!notification.read && (
                      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SmartNotifications;