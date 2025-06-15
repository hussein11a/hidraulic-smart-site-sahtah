
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
VITE_PHONE_NUMBER=+966501234567
VITE_WHATSAPP_NUMBER=+966501234567
```

### 4. تفعيل Netlify CMS
1. اذهب إلى Site settings > Identity
2. اضغط "Enable Identity"
3. في Registration preferences، اختر "Invite only"
4. في Services، اضغط "Enable Git Gateway"
5. ادع المستخدمين المصرح لهم

### 5. النطاق المخصص (اختياري)
1. Site settings > Domain management
2. Add custom domain
3. اتبع تعليمات DNS

## المميزات المفعلة

### الأمان
- Headers أمنية شاملة
- Content Security Policy
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

## استكشاف الأخطاء

### مشاكل البناء
```bash
# تحقق من الـ logs
netlify logs

# اختبار محلي
netlify dev
```

### مشاكل النماذج
- تأكد من تفعيل Forms في Netlify
- تحقق من Functions logs
- اختبر API endpoints

### مشاكل CMS
- تأكد من تفعيل Identity
- تحقق من Git Gateway
- امسح cache المتصفح

## الدعم الفني
- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community](https://community.netlify.com)
- [Status Page](https://status.netlify.com)
