const CACHE_NAME = "unique-uren-cache-v1";
const ASSETS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/icon.jpg"
];

// Installeer de service worker en cache de bestanden
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Bestanden in cache opgeslagen.");
            return cache.addAll(ASSETS);
        })
    );
});

// Haal bestanden uit cache wanneer offline
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Werk de cache bij als er een nieuwe versie is
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
});