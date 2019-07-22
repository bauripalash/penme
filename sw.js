var cacheName = 'penme';
var filesToCache = [
  '/',
  '/index.html',
  '/static/all.min.css',
  '/static/js/quill/quill.core.js',
  '/static/js/quill/quill.min.js',
  '/static/js/quill/quill.min.js.map',
  '/static/orbitron/Orbitron Black-0.woff2',
  '/static/js/jspdf.min.js',
  '/static/js/main.js',
  '/static/js/modal-fx.min.js',
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