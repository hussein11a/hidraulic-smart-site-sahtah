
// Ultra-optimized Service Worker for 100% PageSpeed score
const CACHE_NAME = 'hydraulic-tow-v4';
const STATIC_CACHE = 'static-v4';
const DYNAMIC_CACHE = 'dynamic-v4';
const CRITICAL_CACHE = 'critical-v4';

// Critical resources to cache immediately for LCP optimization
const CRITICAL_ASSETS = [
  '/',
  '/manifest.json',
  '/lovable-uploads/53c7547b-fc11-4442-b5f6-798e6e1aa08f.png'
];

// Static assets to cache
const STATIC_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap'
];

// Install event - ultra-aggressive caching for maximum performance
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CRITICAL_CACHE).then(cache => cache.addAll(CRITICAL_ASSETS)),
      caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS).catch(() => {})),
      self.skipWaiting()
    ])
  );
});

// Fetch event - optimized caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Images: Instant cache first for zero LCP delay
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(CRITICAL_CACHE).then(cache => {
        return cache.match(request).then(response => {
          if (response) return response;
          
          return fetch(request, { priority: 'high' }).then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              cache.put(request, responseClone);
            }
            return networkResponse;
          }).catch(() => {
            // Return optimized placeholder
            return new Response('<svg width="400" height="267" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/></svg>', {
              headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'max-age=31536000' }
            });
          });
        });
      })
    );
  }
  // Fonts: Cache first for immediate render
  else if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) return response;
        
        return fetch(request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(STATIC_CACHE).then(cache => cache.put(request, responseClone));
          }
          return networkResponse;
        });
      })
    );
  } 
  // JS/CSS: Network first, cache fallback
  else if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(
      fetch(request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(STATIC_CACHE).then(cache => cache.put(request, responseClone));
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(request);
      })
    );
  } 
  // HTML and other: Network first
  else {
    event.respondWith(
      fetch(request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then(cache => cache.put(request, responseClone));
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(request);
      })
    );
  }
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheName.includes('v4')) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  return new Promise((resolve, reject) => {
    // Handle any background tasks here
    resolve();
  });
}

// Push notifications (if needed in future)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'رسالة جديدة من سطحة هيدروليك',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'عرض التفاصيل',
        icon: '/images/checkmark.png'
      },
      {
        action: 'close',
        title: 'إغلاق',
        icon: '/images/xmark.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('سطحة هيدروليك', options)
  );
});
