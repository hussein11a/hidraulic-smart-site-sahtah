
import React, { useEffect } from 'react';

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  locale?: string;
  siteName?: string;
}

const SEOOptimizer: React.FC<SEOOptimizerProps> = ({
  title = "سطحة هيدروليك السعودية - خدمة نقل السيارات 24 ساعة | أفضل سطحة في الرياض",
  description = "خدمة سطحة هيدروليك احترافية في السعودية ⚡ نقل السيارات المعطلة والمساعدة على الطريق 24/7 🚛 أسرع وصول، أفضل أسعار، خدمة موثوقة في جميع أنحاء المملكة",
  keywords = "سطحة هيدروليك، نقل سيارات، مساعدة طريق، سطحة سيارات، خدمة 24 ساعة، سطحة الرياض، نقل مركبات، إنقاذ سيارات، سطحة متنقلة، خدمة سطحة، سطحة السعودية، رقم سطحة، سطحة سريعة، سطحة رخيصة، سطحة موثوقة",
  image = "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=630&fit=crop&crop=center&auto=format&q=80",
  url = "https://your-domain.com/",
  type = "website",
  author = "سطحة هيدروليك السعودية",
  locale = "ar_SA",
  siteName = "سطحة هيدروليك السعودية"
}) => {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:locale', locale, true);
    updateMetaTag('og:site_name', siteName, true);
    
    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Arabic-specific meta tags
    updateMetaTag('language', 'Arabic');
    updateMetaTag('geo.country', 'Saudi Arabia');
    updateMetaTag('geo.region', 'SA');
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    
    // JSON-LD structured data for current page
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url + "#webpage",
      "url": url,
      "name": title,
      "description": description,
      "image": image,
      "inLanguage": "ar-SA",
      "isPartOf": {
        "@id": "https://your-domain.com/#website"
      },
      "about": {
        "@id": "https://your-domain.com/#business"
      },
      "mainEntity": {
        "@type": "Service",
        "name": "خدمة سطحة هيدروليك",
        "description": description,
        "provider": {
          "@id": "https://your-domain.com/#business"
        },
        "areaServed": {
          "@type": "Country",
          "name": "السعودية"
        },
        "serviceType": "نقل السيارات والمساعدة على الطريق",
        "hoursAvailable": "Mo-Su 00:00-23:59"
      },
      "breadcrumb": {
        "@id": "https://your-domain.com/#breadcrumb"
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2", ".highlight"]
      }
    };
    
    // Update or create JSON-LD script
    let jsonLdScript = document.querySelector('script[type="application/ld+json"]#page-data');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.type = 'application/ld+json';
      jsonLdScript.id = 'page-data';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(structuredData);
    
  }, [title, description, keywords, image, url, type, author, locale, siteName]);

  // Performance monitoring
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
        if (entry.entryType === 'layout-shift') {
          console.log('CLS:', entry.value);
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default SEOOptimizer;
