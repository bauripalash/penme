var cacheName = 'penme';
var filesToCache = [
  '/',
  '/index.html',
  '/static/all.min.css',
  '/static/all.min.js',
  '/static/quill.min.js.map',
  '/static/orbitron/Orbitron Black-0.woff2',
];self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
