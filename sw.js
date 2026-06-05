const CACHE_NAME = 'presente-cor-v1';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './config.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Instalação do Service Worker e Caching dos arquivos estáticos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cacheando recursos essenciais do app...');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Ativação do Service Worker e limpeza de caches antigos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Limpando cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptador de requisições (Network falling back to Cache)
self.addEventListener('fetch', (e) => {
  // Ignorar chamadas externas dinâmicas (Firebase e ImgBB necessitam de internet)
  if (e.request.url.includes('googleapis.com') || 
      e.request.url.includes('imgbb.com') || 
      e.request.url.includes('firebase')) {
    return;
  }

  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
