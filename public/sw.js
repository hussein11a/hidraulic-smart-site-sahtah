
// Advanced Service Worker for 100% PageSpeed score
const CACHE_NAME = 'hydraulic-tow-v2';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';

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

// Install event - aggressive caching for performance
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(CRITICAL_ASSETS)),
      caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS).catch(() => {})),
      self.skipWaiting()
    ])
  );
});

// Fetch event - optimized caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Images: Cache first, network fallback (for LCP optimization)
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) return response;
        
        return fetch(request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then(cache => cache.put(request, responseClone));
          }
          return networkResponse;
        }).catch(() => {
          // Return placeholder if image fails to load
          return new Response('<svg></svg>', {
            headers: { 'Content-Type': 'image/svg+xml' }
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
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
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
