function registerServiceWorker(){
    if ('serviceWorker' in navigator){
        navigator.serviceWorker.register('sw.js', { scope: '/' }).then(() => {
            print("registarred");

        }).catch(error => {
            console.log("oopsie daisy- failed to register", error);
        });
    }
}

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('music-player-cache').then(cache => {
            return cache.addAll([
                "/",
                "/index.html",
                "/playlists.html",
                "/greeting.js",
                "/jolly.gif",
                "/app.js",
                "/search.js",
                "/service-worker.js",
                "/manifest.json",
                "/liked.png",
                "/style.css",
                "music/songs/the-box.jpeg",
                "music/images/metamorphosis.mp3",
                "music/images/metamorphosis.jpeg",
                "music/songs/rapture.mp3",
                "music/images/rapture.jpeg",
                "music/songs/close-eyes.mp3",
                "music/images/close-eyes.jpeg",
                "music/songs/lovely-bastards.mp3",
                "music/images/lovely-bastards.jpeg",
                "music/songs/memory-reboot.mp3",
                "music/images/memory-reboot.jpeg",
                "music/songs/devil-eyes.mp3",
                "music/images/devil-eyes.jpeg"  
            ]);
        })
    );
});