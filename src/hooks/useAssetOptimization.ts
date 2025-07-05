import { useEffect } from 'react';

export const useAssetOptimization = () => {
  useEffect(() => {
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

    setTimeout(() => {
      optimizeAssets();
      optimizeDOM();
      optimizeImages();
    }, 0);
  }, []);
};