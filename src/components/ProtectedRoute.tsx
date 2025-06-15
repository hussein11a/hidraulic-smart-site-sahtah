
import React, { ReactNode, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle } from "lucide-react";
import NetlifyIdentity from './NetlifyIdentity';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
  fallback?: ReactNode;
}

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  fallback 
}) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (window.netlifyIdentity) {
        const currentUser = window.netlifyIdentity.currentUser();
        setUser(currentUser);
        
        if (currentUser) {
          if (requiredRole) {
            const userRoles = currentUser.app_metadata?.roles || [];
            setHasAccess(userRoles.includes(requiredRole));
          } else {
            setHasAccess(true);
          }
        }
        
        setIsLoading(false);
      }
    };

    // التحقق الفوري إذا كان النظام محمل بالفعل
    if (window.netlifyIdentity) {
      checkAuth();
    } else {
      // انتظار تحميل النظام
      const interval = setInterval(() => {
        if (window.netlifyIdentity) {
          checkAuth();
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }

    // الاستماع لتغييرات المصادقة
    if (window.netlifyIdentity) {
      const handleLogin = (user: any) => {
        setUser(user);
        if (requiredRole) {
          const userRoles = user.app_metadata?.roles || [];
          setHasAccess(userRoles.includes(requiredRole));
        } else {
          setHasAccess(true);
        }
      };

      const handleLogout = () => {
        setUser(null);
        setHasAccess(false);
      };

      window.netlifyIdentity.on('login', handleLogin);
      window.netlifyIdentity.on('logout', handleLogout);

      return () => {
        window.netlifyIdentity.off('login', handleLogin);
        window.netlifyIdentity.off('logout', handleLogout);
      };
    }
  }, [requiredRole]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return fallback || (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Shield className="w-6 h-6" />
            مطلوب تسجيل الدخول
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NetlifyIdentity />
        </CardContent>
      </Card>
    );
  }

  if (requiredRole && !hasAccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-red-600">
            <AlertTriangle className="w-6 h-6" />
            غير مصرح لك بالوصول
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              هذا المحتوى مخصص للمستخدمين الذين لديهم صلاحية "{requiredRole}" فقط.
              تواصل مع الإدارة للحصول على الصلاحيات المطلوبة.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
