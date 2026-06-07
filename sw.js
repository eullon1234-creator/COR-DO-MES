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

const MEDIA_CACHE_NAME = 'presente-cor-media-v1';

// Função para limitar o tamanho do cache de mídias (FIFO)
function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(() => {
          trimCache(cacheName, maxItems);
        });
      }
    });
  });
}

// Interceptador de requisições
self.addEventListener('fetch', (e) => {
  const url = e.request.url;

  // Ignorar requisições que não sejam GET (ex: POST para salvar dados/fotos)
  if (e.request.method !== 'GET') {
    return;
  }

  // Ignorar Range requests (obrigatório para compatibilidade de áudio/vídeo no Safari do iOS)
  if (e.request.headers.has('range')) {
    return;
  }

  // Detectar arquivos de mídia dinâmicos ou locais (fotos, músicas, vídeos)
  const isMedia = url.includes('i.ibb.co') || 
                  e.request.destination === 'image' || 
                  e.request.destination === 'audio' || 
                  e.request.destination === 'video' ||
                  /\.(mp3|ogg|wav|mp4|webm|mov|gif)/i.test(url);

  if (isMedia) {
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(e.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(MEDIA_CACHE_NAME).then((cache) => {
              cache.put(e.request, responseToCache);
              trimCache(MEDIA_CACHE_NAME, 50); // Limite de 50 mídias salvas
            });
          }
          return networkResponse;
        }).catch(() => {
          // Falha silenciosa em caso offline
        });
      })
    );
    return;
  }

  // Ignorar chamadas externas dinâmicas (Firebase e chamadas de API do ImgBB)
  if (url.includes('googleapis.com') || 
      url.includes('api.imgbb.com') || 
      url.includes('firebase')) {
    return;
  }

  // Cache-first com fallback de rede para arquivos estáticos essenciais do PWA
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
