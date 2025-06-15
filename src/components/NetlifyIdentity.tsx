
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User, LogIn, UserPlus, LogOut } from "lucide-react";

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
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // تحميل Netlify Identity Widget
    const script = document.createElement('script');
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.init({
          locale: 'ar',
          namePlaceholder: 'الاسم الكامل',
          APIUrl: `${window.location.origin}/.netlify/identity`
        });

        // التحقق من حالة المستخدم الحالية
        const currentUser = window.netlifyIdentity.currentUser();
        if (currentUser) {
          setUser(currentUser);
        }
        setIsLoading(false);

        // أحداث المصادقة
        window.netlifyIdentity.on('init', (user: NetlifyUser | null) => {
          console.log('Netlify Identity initialized', user);
          if (user) setUser(user);
        });

        window.netlifyIdentity.on('login', (user: NetlifyUser) => {
          console.log('User logged in', user);
          setUser(user);
          setShowLogin(false);
          toast({
            title: "تم تسجيل الدخول بنجاح",
            description: `مرحباً ${user.user_metadata.full_name || user.email}`,
          });
          window.netlifyIdentity.close();
        });

        window.netlifyIdentity.on('logout', () => {
          console.log('User logged out');
          setUser(null);
          toast({
            title: "تم تسجيل الخروج",
            description: "نراك قريباً!",
          });
        });

        window.netlifyIdentity.on('signup', (user: NetlifyUser) => {
          console.log('User signed up', user);
          setUser(user);
          setShowSignup(false);
          toast({
            title: "تم إنشاء الحساب بنجاح",
            description: `مرحباً ${user.user_metadata.full_name || user.email}`,
          });
          window.netlifyIdentity.close();
        });

        window.netlifyIdentity.on('error', (err: Error) => {
          console.error('Netlify Identity error:', err);
          toast({
            title: "خطأ في المصادقة",
            description: err.message || "حدث خطأ غير متوقع",
            variant: "destructive",
          });
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [toast]);

  const handleLogin = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open('login');
    }
  };

  const handleSignup = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open('signup');
    }
  };

  const handleLogout = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل نظام المصادقة...</p>
        </div>
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
                className="w-16 h-16 rounded-full mx-auto mb-4"
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
          <Button onClick={handleLogout} variant="outline" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            تسجيل الخروج
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>المصادقة</CardTitle>
        <CardDescription>سجل دخولك أو أنشئ حساب جديد</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleLogin} className="w-full">
          <LogIn className="w-4 h-4 mr-2" />
          تسجيل الدخول
        </Button>
        <Button onClick={handleSignup} variant="outline" className="w-full">
          <UserPlus className="w-4 h-4 mr-2" />
          إنشاء حساب جديد
        </Button>
      </CardContent>
    </Card>
  );
};

export default NetlifyIdentity;
