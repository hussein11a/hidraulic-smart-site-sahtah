
import React from 'react';

interface EnhancedSEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

const EnhancedSEO: React.FC<EnhancedSEOProps> = ({
  title = "سطحة هيدروليك السعودية - خدمة نقل السيارات 24 ساعة",
  description = "خدمة سطحة هيدروليك احترافية في السعودية ⚡ نقل السيارات المعطلة والمساعدة على الطريق 24/7 🚛 أسرع وصول، أفضل أسعار، خدمة موثوقة",
  canonicalUrl = "https://your-domain.com/",
  structuredData
}) => {
  
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "سطحة هيدروليك السعودية",
    "description": description,
    "url": canonicalUrl,
    "telephone": "+966501234567",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA",
      "addressRegion": "الرياض"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.7136,
      "longitude": 46.6753
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "serviceType": "خدمة سطحة هيدروليك",
    "areaServed": {
      "@type": "Country",
      "name": "السعودية"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2500",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  React.useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Add structured data
    const structuredDataScript = document.getElementById('structured-data');
    if (structuredDataScript) {
      structuredDataScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData || defaultStructuredData);
    document.head.appendChild(script);

    return () => {
      const structuredDataScript = document.getElementById('structured-data');
      if (structuredDataScript) {
        structuredDataScript.remove();
      }
    };
  }, [title, description, canonicalUrl, structuredData]);

  return null;
};

export default EnhancedSEO;
