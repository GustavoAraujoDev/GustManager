const cacheName = 'churras-v1';
const filesToCache = [
  'index.html',
  'agenda.html',
  'controlePerda.html',
  'dashboard.html',
  'estoque.html',
  'funcionario.html',
  'pedidos.html',
  'receita.html',
  'relatorio.html',
  'logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  console.log('[SW] Ativado');
  return self.clients.claim();
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/') // redireciona quando o usuário clica
  );
});