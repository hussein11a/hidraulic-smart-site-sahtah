import React, { useEffect, useRef } from 'react';
import './FloatingButtons.css'; // سنقوم بإنشاء هذا الملف لاحقًا

interface FloatingButtonsProps {
  phoneNumber: string;
  whatsappNumber: string;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({ phoneNumber, whatsappNumber }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // يمكن إضافة أي منطق JavaScript إضافي هنا إذا لزم الأمر
    // مثل تتبع النقرات أو التفاعل مع عناصر أخرى في الصفحة
    // حاليًا، معظم التحسينات موجودة في CSS

    const handleScroll = () => {
      // مثال: يمكن إخفاء الأزرار عند التمرير لأسفل بسرعة
      // أو تغيير موضعها بناءً على التمرير
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="floating-buttons-container" ref={containerRef}>
      <a
        href={`tel:${phoneNumber}`}
        className="floating-btn floating-btn--call"
        aria-label={`اتصل بنا على الرقم ${phoneNumber}`}
      >
        <span className="floating-btn__icon">📞</span>
        <span className="floating-btn__text">اتصل</span>
      </a>
      <a
        href={`https://wa.me/${whatsappNumber}`}
        className="floating-btn floating-btn--whatsapp"
        aria-label="تواصل معنا عبر الواتساب"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="floating-btn__icon">💬</span>
        <span className="floating-btn__text">واتساب</span>
      </a>
    </div>
  );
};

export default FloatingButtons;


