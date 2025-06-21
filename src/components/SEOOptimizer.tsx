
import React, { useEffect } from 'react';

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEOOptimizer: React.FC<SEOOptimizerProps> = ({
  title = "سطحة هيدروليك السعودية - خدمة نقل السيارات 24 ساعة",
  description = "خدمة سطحة هيدروليك احترافية في السعودية ⚡ نقل السيارات المعطلة والمساعدة على الطريق 24/7",
  keywords = "سطحة هيدروليك، نقل سيارات، مساعدة طريق، سطحة سيارات، خدمة 24 ساعة",
  image = "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=630",
  url = "https://your-domain.com/"
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
    updateMetaTag('robots', 'index, follow, max-image-preview:large');
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:locale', 'ar_SA', true);
    
    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Arabic-specific meta tags
    updateMetaTag('language', 'Arabic');
    updateMetaTag('geo.country', 'Saudi Arabia');
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    
  }, [title, description, keywords, image, url]);

  return null;
};

export default SEOOptimizer;
