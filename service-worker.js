const CACHE = 'hellen-financeiro-v1';
const ARQUIVOS = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).catch(()=>{}));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(nomes => Promise.all(nomes.filter(n => n !== CACHE).map(n => caches.delete(n))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
