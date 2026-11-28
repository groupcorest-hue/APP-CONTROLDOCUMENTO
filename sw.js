/* Service worker de la app "Docs Chinito"
   - Guarda la carcasa de la app para que abra al instante.
   - Recibe las notificaciones push (Firebase) aunque la app esté cerrada.
   Los datos siempre vienen en vivo desde Google Apps Script (no se cachean). */
const VERSION = 'docs-chinito-v3';
const SHELL = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'icons/logo.png', 'icons/icon-192.png', 'icons/icon-512.png',
               'icons/maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png'];

importScripts('config.js');

// Al tocar una notificación: abrir (o traer al frente) la app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const destino = (e.notification.data && e.notification.data.url) || self.registration.scope;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) if (c.url.startsWith(self.registration.scope) && 'focus' in c) return c.focus();
    return self.clients.openWindow(destino);
  }));
});

if (self.CONFIG && self.CONFIG.FIREBASE) {
  importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
                'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
  firebase.initializeApp(self.CONFIG.FIREBASE);
  const messaging = firebase.messaging();
  // Mensajes sin bloque "notification": se muestran manualmente
  messaging.onBackgroundMessage(p => {
    if (p.notification) return; // Firebase ya la muestra
    const d = p.data || {};
    return self.registration.showNotification(d.titulo || 'Control Documentario', {
      body: d.cuerpo || '', icon: 'icons/icon-192.png', badge: 'icons/favicon-32.png', tag: d.tag || 'alerta',
      renotify: true, requireInteraction: true, vibrate: [250, 120, 250, 120, 400], data: { url: self.registration.scope }
    });
  });
}

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return; // Apps Script y Firebase: siempre red
  e.respondWith(
    fetch(e.request).then(r => {
      const copia = r.clone();
      caches.open(VERSION).then(c => c.put(e.request, copia));
      return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
  );
});
