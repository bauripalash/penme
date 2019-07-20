var cacheName = 'penme';
var filesToCache = [
  '/',
  '/index.html',
  '/css/bulma/bulmaswatch.min.css.map',
  '/css/bulma/bulmaswatch.min.css',
  '/css/main.css',
  '/js/quill/quill.core.css',
  '/js/quill/quill.core.js',
  '/js/quill/quill.min.js',
  '/js/quill/quill.min.js.map',
  '/js/quill/quill.snow.css',
  '/js/jspdf.min.js',
  '/js/main.js',
  '/js/modal-fx.min.js',
];self.addEventListener('install', function(e) {
  // console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      // console.log('[ServiceWorker] Caching app shell');
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