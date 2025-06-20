
import React, { useEffect } from 'react';

const MetaTags: React.FC = () => {
  useEffect(() => {
    // Add meta tags to head
    const metaTags = [
      { name: 'title', content: 'سطحة هيدروليك السعودية - خدمة نقل السيارات 24 ساعة | أفضل سطحة في الرياض' },
      { name: 'description', content: 'خدمة سطحة هيدروليك احترافية في السعودية ⚡ نقل السيارات المعطلة والمساعدة على الطريق 24/7 🚛 أسرع وصول، أفضل أسعار، خدمة موثوقة في جميع أنحاء المملكة' },
      { name: 'keywords', content: 'سطحة هيدروليك، نقل سيارات، مساعدة طريق، سطحة سيارات، خدمة 24 ساعة، سطحة الرياض، نقل مركبات، إنقاذ سيارات، سطحة متنقلة، خدمة سطحة، سطحة السعودية، رقم سطحة، سطحة سريعة، سطحة رخيصة، سطحة موثوقة' },
      { name: 'author', content: 'سطحة هيدروليك السعودية' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }
    ];

    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.name = tag.name;
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Add Open Graph tags
    const ogTags = [
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'سطحة هيدروليك السعودية' },
      { property: 'og:title', content: 'سطحة هيدروليك السعودية - خدمة نقل السيارات 24 ساعة | أفضل سطحة في الرياض' },
      { property: 'og:description', content: 'خدمة سطحة هيدروليك احترافية في السعودية ⚡ نقل السيارات المعطلة والمساعدة على الطريق 24/7 🚛 أسرع وصول، أفضل أسعار، خدمة موثوقة في جميع أنحاء المملكة' },
      { property: 'og:image', content: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=630&fit=crop&crop=center&auto=format&q=80' },
      { property: 'og:url', content: 'https://your-domain.com/' },
      { property: 'og:locale', content: 'ar_SA' }
    ];

    ogTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', tag.property);
      meta.content = tag.content;
      document.head.appendChild(meta);
    });
  }, []);

  return null;
};

export default MetaTags;
