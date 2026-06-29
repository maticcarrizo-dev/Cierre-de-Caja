const CACHE_NAME = 'caja-v1';
const ASSETS = [
  './',
  'index.html',
  'manifest.json'
];

// Instalar el Service Worker y almacenar archivos en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Estrategia: Buscar primero en internet, si falla usar la caché
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});