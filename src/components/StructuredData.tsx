
import React, { useEffect } from 'react';

interface StructuredDataProps {
  type: 'service' | 'article' | 'faq' | 'review' | 'breadcrumb';
  data: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  
  useEffect(() => {
    const generateStructuredData = () => {
      switch (type) {
        case 'service':
          return {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": data.name,
            "description": data.description,
            "provider": {
              "@type": "LocalBusiness",
              "name": "سطحة هيدروليك السعودية",
              "telephone": "+966501234567",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SA",
                "addressLocality": "الرياض"
              }
            },
            "areaServed": {
              "@type": "Country",
              "name": "السعودية"
            },
            "availableChannel": {
              "@type": "ServiceChannel",
              "servicePhone": "+966501234567",
              "availableLanguage": "Arabic"
            },
            "hoursAvailable": "Mo-Su 00:00-23:59",
            "serviceType": data.serviceType || "نقل السيارات"
          };

        case 'article':
          return {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": data.headline,
            "description": data.description,
            "image": data.image,
            "author": {
              "@type": "Organization",
              "name": "سطحة هيدروليك السعودية"
            },
            "publisher": {
              "@type": "Organization",
              "name": "سطحة هيدروليك السعودية",
              "logo": {
                "@type": "ImageObject",
                "url": "https://your-domain.com/icon-192x192.png"
              }
            },
            "datePublished": data.datePublished,
            "dateModified": data.dateModified,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": data.url
            },
            "inLanguage": "ar-SA"
          };

        case 'faq':
          return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": data.questions.map((q: any) => ({
              "@type": "Question",
              "name": q.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": q.answer
              }
            }))
          };

        case 'review':
          return {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
              "@type": "LocalBusiness",
              "name": "سطحة هيدروليك السعودية"
            },
            "author": {
              "@type": "Person",
              "name": data.author
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": data.rating,
              "bestRating": "5",
              "worstRating": "1"
            },
            "reviewBody": data.reviewBody,
            "datePublished": data.datePublished
          };

        case 'breadcrumb':
          return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": data.items.map((item: any, index: number) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "item": item.url
            }))
          };

        default:
          return null;
      }
    };

    const structuredData = generateStructuredData();
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `structured-data-${type}`;
      script.textContent = JSON.stringify(structuredData);
      
      // Remove existing script with same ID
      const existingScript = document.getElementById(`structured-data-${type}`);
      if (existingScript) {
        existingScript.remove();
      }
      
      document.head.appendChild(script);
      
      return () => {
        const scriptToRemove = document.getElementById(`structured-data-${type}`);
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    }
  }, [type, data]);

  return null;
};

export default StructuredData;
