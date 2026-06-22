/* =============================================================================
   AMPERZAND — Service Worker (sw.js)
   Enables offline support and faster repeat visits by caching key assets.
   ============================================================================= */

const CACHE_NAME = 'amperzand-v1';

// Files to pre-cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/amperzand-brand.css',
  '/css/amperzand-responsive.css',
  '/css/fonts.css',
  '/css/vendor.css',
  '/js/amperzand-custom.js',
  '/js/amperzand-data.js',
  '/js/vendor/jquery.min.js',
  '/assets/icons/favicon.svg'
];

// Install: pre-cache all listed assets
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(PRECACHE_ASSETS); })
      .catch(function (err) { console.warn('[SW] Pre-cache partial failure:', err); })
  );
  self.skipWaiting();
});

// Activate: remove outdated caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) { return key !== CACHE_NAME; })
          .map(function (key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

// Fetch: network-first strategy with cache fallback
self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(function () {
        return caches.match(event.request);
      })
  );
});
