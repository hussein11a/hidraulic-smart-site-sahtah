import React, { useEffect, useState } from 'react';

interface ResponsivePerformanceManagerProps {
  isDarkMode: boolean;
  isMobile: boolean;
}

const ResponsivePerformanceManager: React.FC<ResponsivePerformanceManagerProps> = ({ isDarkMode, isMobile }) => {
  const [connectionType, setConnectionType] = useState<string>('unknown');
  const [deviceMemory, setDeviceMemory] = useState<number>(4);

  useEffect(() => {
    // Detect network conditions
    const detectNetworkConditions = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        setConnectionType(connection?.effectiveType || 'unknown');
        
        connection?.addEventListener('change', () => {
          setConnectionType(connection.effectiveType);
        });
      }
    };

    // Detect device capabilities
    const detectDeviceCapabilities = () => {
      if ('deviceMemory' in navigator) {
        setDeviceMemory((navigator as any).deviceMemory || 4);
      }
    };

    // Adaptive performance based on device and network
    const optimizePerformance = () => {
      const isLowEndDevice = deviceMemory <= 2;
      const isSlowNetwork = ['slow-2g', '2g', '3g'].includes(connectionType);
      const shouldOptimizeAggressively = isLowEndDevice || isSlowNetwork || isMobile;

      // Adjust performance settings
      if (shouldOptimizeAggressively) {
        // Reduce animation quality
        document.documentElement.style.setProperty('--animation-duration', '0.15s');
        document.documentElement.style.setProperty('--animation-timing', 'ease-out');
        
        // Limit concurrent animations
        document.documentElement.style.setProperty('--max-concurrent-animations', '2');
        
        // Reduce blur effects
        document.documentElement.style.setProperty('--blur-intensity', 'blur(2px)');
      } else {
        // Full quality animations
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
        document.documentElement.style.setProperty('--animation-timing', 'cubic-bezier(0.4, 0, 0.2, 1)');
        document.documentElement.style.setProperty('--max-concurrent-animations', '10');
        document.documentElement.style.setProperty('--blur-intensity', 'blur(8px)');
      }

      // Dynamic image quality
      const images = document.querySelectorAll('img[data-src]');
      images.forEach((img) => {
        const imgElement = img as HTMLImageElement;
        const src = imgElement.dataset.src;
        
        if (src && src.includes('unsplash.com')) {
          const quality = shouldOptimizeAggressively ? 'q=60' : 'q=80';
          const format = 'fm=webp';
          imgElement.dataset.src = `${src}&${quality}&${format}`;
        }
      });
    };

    // Preload critical resources based on device capabilities
    const smartPreloading = () => {
      const isHighEndDevice = deviceMemory >= 8 && !isMobile;
      const isFastNetwork = ['4g'].includes(connectionType);
      
      if (isHighEndDevice && isFastNetwork) {
        // Preload more resources
        const criticalResources = [
          '/lovable-uploads/53c7547b-fc11-4442-b5f6-798e6e1aa08f.png',
          'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap'
        ];

        criticalResources.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = url;
          document.head.appendChild(link);
        });
      }
    };

    // Adaptive scroll handling
    const adaptiveScrollHandling = () => {
      let rafId: number;
      let isScrolling = false;

      const handleScroll = () => {
        if (!isScrolling) {
          isScrolling = true;
          
          rafId = requestAnimationFrame(() => {
            // Throttle scroll events on low-end devices
            const throttleDelay = isMobile || deviceMemory <= 2 ? 100 : 16;
            
            setTimeout(() => {
              isScrolling = false;
            }, throttleDelay);
          });
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (rafId) cancelAnimationFrame(rafId);
      };
    };

    // Initialize optimizations
    detectNetworkConditions();
    detectDeviceCapabilities();
    optimizePerformance();
    smartPreloading();
    const cleanupScroll = adaptiveScrollHandling();

    return cleanupScroll;
  }, [connectionType, deviceMemory, isMobile, isDarkMode]);

  // Battery API optimization
  useEffect(() => {
    const optimizeForBattery = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          
          const updatePerformanceBasedOnBattery = () => {
            const isLowBattery = battery.level < 0.2;
            const isCharging = battery.charging;
            
            if (isLowBattery && !isCharging) {
              // Reduce performance to save battery
              document.documentElement.style.setProperty('--reduce-animations', 'true');
              document.documentElement.style.setProperty('--animation-duration', '0.1s');
              
              // Disable non-essential animations
              const animatedElements = document.querySelectorAll('.animate-pulse, .animate-spin');
              animatedElements.forEach(el => {
                (el as HTMLElement).style.animationPlayState = 'paused';
              });
            } else {
              // Restore normal performance
              document.documentElement.style.setProperty('--reduce-animations', 'false');
              
              const animatedElements = document.querySelectorAll('.animate-pulse, .animate-spin');
              animatedElements.forEach(el => {
                (el as HTMLElement).style.animationPlayState = 'running';
              });
            }
          };

          battery.addEventListener('levelchange', updatePerformanceBasedOnBattery);
          battery.addEventListener('chargingchange', updatePerformanceBasedOnBattery);
          
          updatePerformanceBasedOnBattery();
        } catch (error) {
          console.log('Battery API not supported');
        }
      }
    };

    optimizeForBattery();
  }, []);

  return null;
};

export default ResponsivePerformanceManager;