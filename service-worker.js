const CACHE_NAME = 'unique-uren-calculator-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/service-worker.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js'
];

// Installeer Service Worker en cache de bestanden
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Bestanden gecachet');
            return cache.addAll(ASSETS);
        })
    );
});

// Intercept requests en laad uit cache als er geen internet is
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});

// Verwijder oude caches bij updates
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
});
