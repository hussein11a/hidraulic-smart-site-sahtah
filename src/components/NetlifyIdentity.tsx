
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User, LogIn, UserPlus, LogOut, Settings } from "lucide-react";

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

interface NetlifyUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
  app_metadata: {
    roles?: string[];
  };
}

const NetlifyIdentity: React.FC = () => {
  const [user, setUser] = useState<NetlifyUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [identityReady, setIdentityReady] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // تحميل Netlify Identity Widget مع إعدادات محسنة
    const loadNetlifyIdentity = () => {
      if (window.netlifyIdentity) {
        initializeIdentity();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
      script.async = true;
      script.onload = () => {
        console.log('✅ Netlify Identity Widget loaded successfully');
        initializeIdentity();
      };
      script.onerror = () => {
        console.error('❌ Failed to load Netlify Identity Widget');
        setIsLoading(false);
        toast({
          title: "خطأ في التحميل",
          description: "فشل في تحميل نظام المصادقة، يرجى إعادة تحميل الصفحة",
          variant: "destructive",
        });
      };
      document.head.appendChild(script);
    };

    const initializeIdentity = () => {
      if (!window.netlifyIdentity) return;

      try {
        // إعدادات تهيئة محسنة
        window.netlifyIdentity.init({
          locale: 'ar',
          namePlaceholder: 'الاسم الكامل',
          APIUrl: `${window.location.origin}/.netlify/identity`,
          logo: false,
          // إعدادات مهمة لضمان ظهور نموذج التسجيل
          container: null, // استخدام النافذة المنبثقة الافتراضية
          modal: true
        });

        console.log('🔧 Netlify Identity initialized with settings');

        // التحقق من المستخدم الحالي
        const currentUser = window.netlifyIdentity.currentUser();
        console.log('👤 Current user:', currentUser);
        
        if (currentUser) {
          setUser(currentUser);
        }
        
        setIsLoading(false);
        setIdentityReady(true);

        // الأحداث المحسنة
        window.netlifyIdentity.on('init', (user: NetlifyUser | null) => {
          console.log('🚀 Identity initialized', user);
          if (user) {
            setUser(user);
          }
          setIsLoading(false);
          setIdentityReady(true);
        });

        window.netlifyIdentity.on('login', (user: NetlifyUser) => {
          console.log('✅ User logged in successfully', user);
          setUser(user);
          toast({
            title: "مرحباً بك!",
            description: `تم تسجيل الدخول بنجاح ${user.user_metadata.full_name || user.email}`,
          });
          // إغلاق النافذة المنبثقة تلقائياً
          window.netlifyIdentity.close();
        });

        window.netlifyIdentity.on('logout', () => {
          console.log('👋 User logged out');
          setUser(null);
          toast({
            title: "تم تسجيل الخروج",
            description: "نراك قريباً!",
          });
        });

        window.netlifyIdentity.on('signup', (user: NetlifyUser) => {
          console.log('🎉 User signed up successfully', user);
          setUser(user);
          toast({
            title: "مرحباً بك في المنصة!",
            description: `تم إنشاء الحساب بنجاح ${user.user_metadata.full_name || user.email}`,
          });
          // إغلاق النافذة المنبثقة تلقائياً
          window.netlifyIdentity.close();
        });

        window.netlifyIdentity.on('error', (err: Error) => {
          console.error('❌ Netlify Identity error:', err);
          toast({
            title: "خطأ في المصادقة",
            description: err.message || "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى",
            variant: "destructive",
          });
        });

        window.netlifyIdentity.on('open', () => {
          console.log('📂 Identity modal opened');
        });

        window.netlifyIdentity.on('close', () => {
          console.log('❌ Identity modal closed');
        });

      } catch (error) {
        console.error('💥 Error initializing Netlify Identity:', error);
        setIsLoading(false);
        toast({
          title: "خطأ في التهيئة",
          description: "حدث خطأ في تهيئة نظام المصادقة",
          variant: "destructive",
        });
      }
    };

    loadNetlifyIdentity();

    // تنظيف عند إلغاء التركيب
    return () => {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.off('init');
        window.netlifyIdentity.off('login');
        window.netlifyIdentity.off('logout');
        window.netlifyIdentity.off('signup');
        window.netlifyIdentity.off('error');
      }
    };
  }, [toast]);

  const handleLogin = () => {
    console.log('🔐 Opening login modal...');
    if (window.netlifyIdentity && identityReady) {
      try {
        window.netlifyIdentity.open('login');
      } catch (error) {
        console.error('❌ Error opening login modal:', error);
        toast({
          title: "خطأ",
          description: "لا يمكن فتح نافذة تسجيل الدخول",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "يرجى الانتظار",
        description: "نظام المصادقة لم يكتمل تحميله بعد",
        variant: "destructive",
      });
    }
  };

  const handleSignup = () => {
    console.log('📝 Opening signup modal...');
    if (window.netlifyIdentity && identityReady) {
      try {
        window.netlifyIdentity.open('signup');
      } catch (error) {
        console.error('❌ Error opening signup modal:', error);
        toast({
          title: "خطأ",
          description: "لا يمكن فتح نافذة إنشاء الحساب",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "يرجى الانتظار",
        description: "نظام المصادقة لم يكتمل تحميله بعد",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    console.log('👋 Logging out...');
    if (window.netlifyIdentity && user) {
      try {
        window.netlifyIdentity.logout();
      } catch (error) {
        console.error('❌ Error during logout:', error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء تسجيل الخروج",
          variant: "destructive",
        });
      }
    }
  };

  const openIdentitySettings = () => {
    console.log('⚙️ Opening identity settings...');
    if (window.netlifyIdentity && user) {
      try {
        window.netlifyIdentity.open();
      } catch (error) {
        console.error('❌ Error opening settings:', error);
        toast({
          title: "خطأ",
          description: "لا يمكن فتح إعدادات الحساب",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل نظام المصادقة...</p>
          <p className="text-sm text-gray-400 mt-2">يرجى الانتظار قليلاً</p>
        </div>
      </div>
    );
  }

  if (!identityReady) {
    return (
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <div className="text-yellow-600 mb-4">⚠️</div>
            <h3 className="font-semibold mb-2">خطأ في التحميل</h3>
            <p className="text-gray-600 mb-4">لم يتم تحميل نظام المصادقة بشكل صحيح</p>
            <Button onClick={() => window.location.reload()}>
              إعادة تحميل الصفحة
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <User className="w-5 h-5" />
            ملف المستخدم
          </CardTitle>
          <CardDescription>مرحباً بك في المنصة</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            {user.user_metadata.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="صورة المستخدم"
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
            )}
            <h3 className="font-semibold text-lg">
              {user.user_metadata.full_name || 'مستخدم'}
            </h3>
            <p className="text-gray-600">{user.email}</p>
            {user.app_metadata.roles && user.app_metadata.roles.length > 0 && (
              <div className="mt-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {user.app_metadata.roles[0]}
                </span>
              </div>
            )}
          </div>
          <Separator />
          <div className="space-y-2">
            <Button onClick={openIdentitySettings} variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              إعدادات الحساب
            </Button>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              تسجيل الخروج
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>🔐 نظام المصادقة</CardTitle>
        <CardDescription>سجل دخولك أو أنشئ حساب جديد</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700">
            <LogIn className="w-4 h-4 mr-2" />
            تسجيل الدخول
          </Button>
          <Button onClick={handleSignup} variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
            <UserPlus className="w-4 h-4 mr-2" />
            إنشاء حساب جديد
          </Button>
        </div>
        
        <Separator />
        
        <div className="text-center text-sm text-gray-500">
          <p>💡 نصائح مهمة:</p>
          <ul className="text-xs mt-2 space-y-1 text-right">
            <li>• تأكد من تفعيل Netlify Identity في لوحة التحكم</li>
            <li>• تحقق من إعدادات التسجيل في Netlify</li>
            <li>• في حالة عدم ظهور النموذج، أعد تحميل الصفحة</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetlifyIdentity;
