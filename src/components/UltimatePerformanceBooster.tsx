import React, { useEffect } from 'react';

const UltimatePerformanceBooster: React.FC = () => {
  useEffect(() => {
    // Critical Path optimization - Immediate execution
    const optimizeCriticalPath = () => {
      // Preload critical fonts immediately with highest priority
      const fontPreload = document.createElement('link');
      fontPreload.rel = 'preload';
      fontPreload.href = 'https://fonts.gstatic.com/s/tajawal/v11/Iura6YBj_oCad4k1nzGBC5xLhLE.woff2';
      fontPreload.as = 'font';
      fontPreload.type = 'font/woff2';
      fontPreload.crossOrigin = 'anonymous';
      fontPreload.fetchPriority = 'high';
      document.head.insertBefore(fontPreload, document.head.firstChild);

      // Optimize LCP image with absolute priority
      const lcpImage = document.querySelector('img[src*="53c7547b-fc11-4442-b5f6-798e6e1aa08f.png"]') as HTMLImageElement;
      if (lcpImage) {
        lcpImage.fetchPriority = 'high';
        lcpImage.loading = 'eager';
        lcpImage.decoding = 'sync';
        lcpImage.style.contentVisibility = 'auto';
        lcpImage.style.containIntrinsicSize = '400px 267px';
        
        // Preload LCP image with highest priority
        const imagePreload = document.createElement('link');
        imagePreload.rel = 'preload';
        imagePreload.as = 'image';
        imagePreload.href = lcpImage.src;
        imagePreload.fetchPriority = 'high';
        document.head.insertBefore(imagePreload, document.head.firstChild);
      }

      // Eliminate render-blocking CSS
      const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
      cssLinks.forEach(link => {
        const linkEl = link as HTMLLinkElement;
        if (linkEl.href.includes('fonts.googleapis.com')) {
          linkEl.media = 'print';
          linkEl.onload = () => { linkEl.media = 'all'; };
        }
      });
    };

    // Aggressive CLS elimination
    const eliminateAllLayoutShifts = () => {
      // Reserve space for all dynamic content immediately
      const style = document.createElement('style');
      style.textContent = `
        * { 
          contain: layout style; 
        }
        
        body, html {
          contain: layout style paint;
          height: 100vh;
          margin: 0;
          padding: 0;
        }
        
        /* Fixed positioning for all containers */
        .container, section, div, article, main, header, footer {
          contain: layout style paint;
          content-visibility: auto;
          contain-intrinsic-size: auto 100px;
        }
        
        /* Button stability */
        button {
          contain: layout style;
          min-height: 44px;
          min-width: 44px;
        }
        
        /* Image stability */
        img {
          aspect-ratio: 16/9;
          display: block;
          width: 100%;
          height: auto;
          contain: layout size style;
          content-visibility: auto;
        }
        
        /* Text stability */
        h1, h2, h3, h4, h5, h6, p, span {
          contain: layout;
          line-height: 1.4;
        }
        
        /* Navigation stability */
        nav, .fixed {
          contain: layout style paint;
          transform: translateZ(0);
          will-change: auto;
        }
      `;
      document.head.appendChild(style);
    };

    // Reduce unused JavaScript and CSS
    const optimizeAssets = () => {
      // Remove unused CSS rules
      if (document.styleSheets) {
        Array.from(document.styleSheets).forEach(sheet => {
          try {
            if (sheet.cssRules) {
              const rules = Array.from(sheet.cssRules);
              rules.forEach((rule, index) => {
                if (rule.type === CSSRule.STYLE_RULE) {
                  const styleRule = rule as CSSStyleRule;
                  if (!document.querySelector(styleRule.selectorText)) {
                    sheet.deleteRule(index);
                  }
                }
              });
            }
          } catch (e) {
            // Cross-origin stylesheets can't be accessed
          }
        });
      }

      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach(script => {
        const scriptEl = script as HTMLScriptElement;
        if (!scriptEl.src.includes('index-') && !scriptEl.defer) {
          scriptEl.defer = true;
        }
      });
    };

    // Optimize DOM size and complexity
    const optimizeDOM = () => {
      // Remove empty elements
      const emptyElements = document.querySelectorAll('div:empty, span:empty, p:empty');
      emptyElements.forEach(el => {
        if (!el.hasAttribute('data-keep')) {
          el.remove();
        }
      });

      // Flatten unnecessary nesting
      const deepNested = document.querySelectorAll('div > div > div > div > div');
      deepNested.forEach(el => {
        const parent = el.parentElement;
        if (parent && parent.children.length === 1) {
          parent.replaceWith(el);
        }
      });
    };

    // Advanced caching and compression
    const implementAdvancedCaching = () => {
      // Register service worker for aggressive caching
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      }

      // Enable compression headers simulation
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Encoding';
      meta.content = 'gzip, br';
      document.head.appendChild(meta);

      // Cache API for critical resources
      if ('caches' in window) {
        caches.open('critical-v1').then(cache => {
          const criticalResources = [
            '/',
            '/lovable-uploads/53c7547b-fc11-4442-b5f6-798e6e1aa08f.png',
            'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap'
          ];
          cache.addAll(criticalResources).catch(() => {});
        });
      }
    };

    // Reduce First Input Delay and improve TTI
    const optimizeInteractivity = () => {
      // Use passive event listeners for better performance
      const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'wheel', 'mousewheel'];
      passiveEvents.forEach(eventType => {
        document.addEventListener(eventType, () => {}, { passive: true });
      });

      // Optimize click handlers with delegation
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.matches('button, a, [role="button"]')) {
          e.stopPropagation();
        }
      }, { passive: false });

      // Reduce main thread blocking
      const heavyTasks = () => {
        return new Promise(resolve => {
          requestIdleCallback(() => {
            // Move heavy computations to idle time
            const elements = document.querySelectorAll('*');
            let count = 0;
            const processChunk = () => {
              const end = Math.min(count + 100, elements.length);
              for (let i = count; i < end; i++) {
                // Minimal processing per element
                elements[i].setAttribute('data-optimized', 'true');
              }
              count = end;
              if (count < elements.length) {
                requestIdleCallback(processChunk);
              } else {
                resolve(null);
              }
            };
            processChunk();
          });
        });
      };
      
      heavyTasks();
    };

    // WebP and modern image formats
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const imgEl = img as HTMLImageElement;
        
        // Check WebP support and optimize accordingly
        const canvas = document.createElement('canvas');
        const webpSupported = canvas.toDataURL('image/webp').indexOf('webp') > 0;
        
        if (webpSupported && imgEl.src && !imgEl.src.includes('.webp')) {
          // Create picture element for WebP support
          const picture = document.createElement('picture');
          const webpSource = document.createElement('source');
          webpSource.srcset = imgEl.src.replace(/\.(jpg|jpeg|png)/, '.webp');
          webpSource.type = 'image/webp';
          
          picture.appendChild(webpSource);
          picture.appendChild(imgEl.cloneNode());
          imgEl.parentNode?.replaceChild(picture, imgEl);
        }

        // Add size attributes for stability
        if (!imgEl.width || !imgEl.height) {
          imgEl.width = 400;
          imgEl.height = 267;
        }
      });
    };

    // Real-time performance monitoring
    const monitorPerformance = () => {
      if ('PerformanceObserver' in window) {
        // Monitor LCP in real-time
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          if (lastEntry.startTime > 2500) {
            // Trigger aggressive optimization if LCP is still slow
            optimizeCriticalPath();
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Monitor CLS and fix immediately
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          if (clsValue > 0.05) {
            eliminateAllLayoutShifts();
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Monitor FID/INP
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const fid = (entry as any).processingStart - (entry as any).startTime;
            if (fid > 100) {
              optimizeInteractivity();
            }
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      }
    };

    // Execute all optimizations immediately and in parallel
    const executeAllOptimizations = async () => {
      // Critical path optimizations (blocking)
      optimizeCriticalPath();
      eliminateAllLayoutShifts();
      
      // Non-blocking optimizations
      setTimeout(() => {
        optimizeAssets();
        optimizeDOM();
        implementAdvancedCaching();
        optimizeImages();
        optimizeInteractivity();
        monitorPerformance();
      }, 0);
    };

    executeAllOptimizations();

    // Cleanup
    return () => {
      // Clean up observers if needed
    };
  }, []);

  return null;
};

export default UltimatePerformanceBooster;