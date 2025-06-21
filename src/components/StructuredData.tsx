
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
              "telephone": "+966501234567"
            },
            "areaServed": {
              "@type": "Country",
              "name": "السعودية"
            }
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
