import { useState, useEffect } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  available: boolean;
  sort_order: number;
}

export const useServiceData = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        const servicesResponse = await fetch('/src/data/services.json');
        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json();
          if (servicesData?.services && Array.isArray(servicesData.services)) {
            setServices(servicesData.services.sort((a: Service, b: Service) => a.sort_order - b.sort_order));
          }
        }
      } catch (error) {
        // Using default services data
        setServices([
          {
            id: 1,
            title: 'نقل السيارات المعطلة',
            description: 'خدمة نقل السيارات المعطلة بأحدث المعدات الهيدروليكية',
            icon: '🚛',
            available: true,
            sort_order: 1
          },
          {
            id: 2,
            title: 'مساعدة على الطريق',
            description: 'خدمة المساعدة الفورية على الطريق 24/7',
            icon: '🔧',
            available: true,
            sort_order: 2
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { services, isLoading };
};