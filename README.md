
# سطحة هيدروليك - موقع خدمات احترافي

موقع ويب احترافي لخدمات السطحة الهيدروليكية مع نظام إدارة محتوى متكامل وحماية شاملة.

## المميزات الرئيسية

### 🚀 الأداء والسرعة
- تصميم خفيف وسريع التحميل
- دعم PWA للعمل بدون إنترنت
- تحسين صور تلقائي
- تحميل كسول للمحتوى

### 🛡️ الحماية والأمان
- تعطيل النسخ والسحب
- حماية من فتح أدوات المطور
- تشفير المحتوى الحساس
- منع سرقة الأكواد

### 📱 التصميم المتجاوب
- دعم كامل للهواتف والأجهزة اللوحية
- وضع ليلي ونهاري ذكي
- تحسين للشاشات العربية (RTL)
- خطوط عربية احترافية

### ⚙️ إدارة المحتوى
- لوحة تحكم Netlify CMS
- تحرير المحتوى بدون برمجة
- إدارة الخدمات والإعدادات
- رفع الصور المباشر

## التقنيات المستخدمة

- **Frontend**: React 18 + TypeScript + Vite
- **التصميم**: Tailwind CSS + shadcn/ui
- **إدارة المحتوى**: Netlify CMS
- **PWA**: Service Worker + Manifest
- **الخطوط**: Google Fonts (Tajawal)
- **الاستضافة**: Netlify + GitHub

## التثبيت والتشغيل

### المتطلبات
- Node.js 18+ 
- npm أو yarn
- Git

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone https://github.com/yourusername/hydraulic-tow-truck.git
cd hydraulic-tow-truck
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **تشغيل الخادم المحلي**
```bash
npm run dev
```

4. **بناء المشروع للإنتاج**
```bash
npm run build
```

## النشر على Netlify

### 1. ربط GitHub

1. ادفع الكود إلى GitHub repository
2. اذهب إلى [Netlify Dashboard](https://app.netlify.com)
3. اضغط "New site from Git"
4. اختر GitHub repository
5. اتبع خطوات النشر

### 2. إعداد Netlify CMS

1. **تفعيل Git Gateway**
   - اذهب إلى Site settings > Identity
   - اضغط "Enable Identity"
   - في Services اختر "Enable Git Gateway"

2. **إعداد المصادقة**
   - اضغط "Settings and usage"
   - اختر "Invite users" أو "Open registration"
   - أضف المستخدمين المصرح لهم

3. **الوصول للوحة التحكم**
   - اذهب إلى `yoursite.netlify.app/admin`
   - سجل الدخول أو أنشئ حساب جديد

### 3. الإعدادات المتقدمة

**متغيرات البيئة (اختياري)**
```bash
VITE_SITE_URL=https://yoursite.netlify.app
VITE_PHONE_NUMBER=+966503269219
VITE_WHATSAPP_NUMBER=+966503269219
```

**Build Settings في Netlify:**
- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions` (إذا احتجت)

## إدارة المحتوى

### الوصول للوحة التحكم
- URL: `yoursite.netlify.app/admin`
- تسجيل الدخول مطلوب

### الأقسام المتاحة

1. **إعدادات الموقع** (`/admin/#/collections/site_settings`)
   - عنوان الموقع والوصف
   - أرقام التواصل
   - إعدادات SEO
   - ألوان الموقع

2. **الخدمات** (`/admin/#/collections/services`)
   - إضافة/تعديل/حذف الخدمات
   - ترتيب الخدمات
   - تفعيل/إلغاء الخدمات

3. **أزرار التواصل** (`/admin/#/collections/contact_buttons`)
   - إعدادات زر الهاتف
   - إعدادات زر الواتساب
   - ألوان الأزرار

4. **التذييل** (`/admin/#/collections/footer`)
   - نص حقوق الطبع
   - الروابط الإضافية

## التخصيص

### تغيير الألوان
1. اذهب للوحة التحكم > إعدادات الموقع
2. قسم "إعدادات الألوان"
3. اختر الألوان المطلوبة
4. احفظ التغييرات

### إضافة خدمة جديدة
1. اذهب للوحة التحكم > الخدمات
2. اضغط "إضافة خدمة جديدة"
3. املأ البيانات المطلوبة
4. احفظ ونشر

### تعديل أرقام التواصل
1. اذهب للوحة التحكم > إعدادات الموقع
2. قسم معلومات التواصل
3. حدث الأرقام
4. احفظ التغييرات

## الأمان والحماية

### المميزات الأمنية المطبقة

- ✅ تعطيل الزر الأيمن
- ✅ منع اختصارات النسخ (Ctrl+C, Ctrl+A, etc.)
- ✅ تعطيل أدوات المطور (F12, Ctrl+Shift+I)
- ✅ منع سحب الصور والنصوص
- ✅ تشفير Console في الإنتاج
- ✅ حماية من Hotlinking
- ✅ Headers أمنية في Netlify

### إعدادات إضافية (netlify.toml)

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```

## SEO والتحسين

### المميزات المطبقة
- ✅ Meta tags محسنة
- ✅ Open Graph للشبكات الاجتماعية
- ✅ Structured Data
- ✅ Sitemap.xml
- ✅ دعم RTL للعربية
- ✅ تحسين الصور
- ✅ خطوط محسنة

### اختبار الأداء
```bash
# تشغيل Lighthouse
npm run lighthouse

# تحليل Bundle
npm run analyze
```

## الدعم الفني

### المشاكل الشائعة

**1. لوحة التحكم لا تعمل**
- تأكد من تفعيل Netlify Identity
- تحقق من إعدادات Git Gateway
- امسح cache المتصفح

**2. الخطوط لا تظهر**
- تحقق من اتصال الإنترنت
- تأكد من تحميل Google Fonts

**3. PWA لا يعمل offline**
- تحقق من تسجيل Service Worker
- امسح cache المتصفح
- تأكد من إعدادات HTTPS

### إعداد النطاق المخصص

1. اذهب إلى Netlify Dashboard
2. Site settings > Domain management
3. Add custom domain
4. اتبع تعليمات DNS

### النسخ الاحتياطي

```bash
# تصدير البيانات
npm run export-data

# استيراد البيانات
npm run import-data
```

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## المساهمة

نرحب بالمساهمات! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) قبل البدء.

---

**تطوير:** [اسم المطور]  
**التحديث الأخير:** يناير 2024  
**الإصدار:** 1.0.0

🚛 **سطحة هيدروليك - خدمتكم راحتنا**
