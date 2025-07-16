
# دليل النشر على Netlify

## الخطوات الأساسية

### 1. ربط المشروع بـ GitHub
1. ادفع الكود إلى مستودع GitHub
2. اذهب إلى [Netlify Dashboard](https://app.netlify.com)
3. اضغط "New site from Git"
4. اختر GitHub وحدد المستودع

### 2. إعدادات البناء
```
Build command: npm run build
Publish directory: dist
Functions directory: netlify/functions
```

### 3. متغيرات البيئة
في Netlify Dashboard > Site settings > Environment variables:

```
VITE_SITE_URL=https://yoursite.netlify.app
VITE_PHONE_NUMBER=+966503269219
VITE_WHATSAPP_NUMBER=+966503269219
```

### 4. تفعيل Netlify Identity
1. اذهب إلى Site settings > Identity
2. اضغط "Enable Identity"
3. في Registration preferences:
   - اختر "Open" للتسجيل المفتوح
   - أو "Invite only" للتسجيل بالدعوة فقط
4. في External providers (اختياري):
   - فعل Google, GitHub, GitLab حسب الحاجة
5. في Services، اضغط "Enable Git Gateway"
6. في Email templates، خصص رسائل البريد الإلكتروني بالعربية

### 5. تخصيص رسائل Identity (اختياري)
في Site settings > Identity > Email templates:

**رسالة التأكيد:**
```
مرحباً {{ .User.UserMetadata.full_name }},
مرحباً بك في منصتنا! يرجى تأكيد عنوان بريدك الإلكتروني بالضغط على الرابط أدناه:
{{ .ConfirmationURL }}
```

**رسالة استعادة كلمة المرور:**
```
مرحباً {{ .User.UserMetadata.full_name }},
لإعادة تعيين كلمة المرور، اضغط على الرابط التالي:
{{ .RecoveryURL }}
```

### 6. تفعيل Netlify CMS
1. تأكد من تفعيل Identity (الخطوة 4)
2. تأكد من تفعيل Git Gateway
3. ادع المستخدمين المصرح لهم لإدارة المحتوى

### 7. النطاق المخصص (اختياري)
1. Site settings > Domain management
2. Add custom domain
3. اتبع تعليمات DNS

## المميزات المفعلة

### المصادقة (Netlify Identity)
- تسجيل دخول/إنشاء حساب
- إدارة الأدوار والصلاحيات
- تسجيل دخول بمقدمي الخدمة الخارجيين
- رسائل بريد إلكتروني مخصصة
- حماية الصفحات والمحتوى

### الأمان
- Headers أمنية شاملة
- Content Security Policy محدث لـ Identity
- HTTPS إجباري
- حماية من XSS و CSRF

### الأداء
- تخزين مؤقت محسن للأصول الثابتة
- ضغط Gzip/Brotli تلقائي
- CDN عالمي
- تحسين الصور

### SEO
- إعادة توجيه للـ SPA
- Sitemap تلقائي
- Meta tags محسنة
- Open Graph

### CMS
- لوحة تحكم بالعربية
- إدارة المحتوى بدون برمجة
- رفع الصور المباشر
- معاينة المحتوى
- مصادقة متكاملة مع Identity

## استكشاف الأخطاء

### مشاكل البناء
```bash
# تحقق من الـ logs
netlify logs

# اختبار محلي
netlify dev
```

### مشاكل Identity
- تأكد من تفعيل Identity في Dashboard
- تحقق من إعدادات Registration
- امسح cache المتصفح
- تحقق من Console logs للأخطاء

### مشاكل النماذج
- تأكد من تفعيل Forms في Netlify
- تحقق من Functions logs
- اختبر API endpoints

### مشاكل CMS
- تأكد من تفعيل Identity
- تحقق من Git Gateway
- امسح cache المتصفح

## أمثلة الاستخدام

### حماية صفحة بالمصادقة
```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

<ProtectedRoute>
  <AdminPanel />
</ProtectedRoute>
```

### حماية صفحة بدور معين
```tsx
<ProtectedRoute requiredRole="admin">
  <SuperAdminPanel />
</ProtectedRoute>
```

### استخدام Hook للمصادقة
```tsx
import { useNetlifyIdentity } from '@/hooks/useNetlifyIdentity';

const { user, isAuthenticated, login, logout } = useNetlifyIdentity();
```

## الدعم الفني
- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)
- [Netlify Community](https://community.netlify.com)
- [Status Page](https://status.netlify.com)
