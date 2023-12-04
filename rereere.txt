const CACHE_NAME = 'files';
const urlsToCache = [
  "/",
  "/index.html",
  "/playlists.html",
  "/greeting.js",
  "/app.js",
  "/search.js",
  "/service-worker.js",
  "/manifest.json",
  "/liked.png",
  "/style.css",
  "/music/songs/the-box.jpeg",
  "/music/images/metamorphosis.mp3",
  "/music/images/metamorphosis.jpeg",
  "/music/songs/rapture.mp3",
  "/music/images/rapture.jpeg",
  "/music/songs/close-eyes.mp3",
  "/music/images/close-eyes.jpeg",
  "/music/songs/lovely-bastards.mp3",
  "/music/images/lovely-bastards.jpeg",
  "/music/songs/memory-reboot.mp3",
  "/music/images/memory-reboot.jpeg",
  "/music/songs/devil-eyes.mp3",
  "/music/images/devil-eyes.jpeg",

];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Cache opened');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }

      return fetch(event.request).then(function (response) {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
