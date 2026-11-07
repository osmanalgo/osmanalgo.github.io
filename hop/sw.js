// hop! — kurulabilir uygulama için basit servis çalışanı (önbellek yok, her zaman güncel)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => { e.respondWith(fetch(e.request)); });

// Bildirime dokununca sipariş sayfasını öne getir
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    const c = cs.find(x => x.url.includes('musteri.html'));
    return c ? c.focus() : self.clients.openWindow('musteri.html');
  }));
});
