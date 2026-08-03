const CACHE_NAME = 'osm-ride-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon-192.png'
];

// Instala o service worker e armazena os arquivos locais essenciais em cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intercepta requisições de rede para retornar o cache caso esteja offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});