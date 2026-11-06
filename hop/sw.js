// hop! — kurulabilir uygulama için basit servis çalışanı (önbellek yok, her zaman güncel)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => { e.respondWith(fetch(e.request)); });
