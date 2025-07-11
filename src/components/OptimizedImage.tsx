
import React, { useState, useCallback } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  // Generate WebP and fallback URLs
  const getOptimizedUrl = (originalSrc: string, format: 'webp' | 'original' = 'original') => {
    if (originalSrc.includes('unsplash.com')) {
      const params = new URLSearchParams({
        w: width?.toString() || '800',
        h: height?.toString() || '600',
        fit: 'crop',
        crop: 'center',
        auto: 'format',
        q: '80'
      });
      
      if (format === 'webp') {
        params.set('fm', 'webp');
      }
      
      return `${originalSrc}?${params.toString()}`;
    }
    return originalSrc;
  };

  if (hasError) {
    return (
      <div 
        className={`bg-slate-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-slate-500 text-sm">صورة غير متاحة</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: width && height ? `${width}/${height}` : '16/9' }}>
      {/* Loading skeleton with proper sizing */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted animate-pulse"
          style={{ 
            width: width || '100%', 
            height: height || 'auto',
            aspectRatio: width && height ? `${width}/${height}` : '16/9'
          }}
        />
      )}
      
      {/* Optimized image with WebP support */}
      <picture>
        <source 
          srcSet={getOptimizedUrl(src, 'webp')} 
          type="image/webp" 
        />
        <img
          src={getOptimizedUrl(src)}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;
