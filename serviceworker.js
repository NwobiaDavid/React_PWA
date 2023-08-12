const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offline.html'];

//install sw
self.addEventListener('install', (e)=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            console.log("opened cache");

            return cache.addAll(urlsToCache);
        })
    )
});

//listen for req
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then((response) => {
                // If a match is found in cache, return the cached response
                if (response) {
                    return response;
                }
                // If the request is not found in cache, fetch it from the network
                return fetch(e.request)
                    .then((response) => {
                        // If the fetch is successful, add the response to cache and return it
                        return caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(e.request, response.clone());
                                return response;
                            });
                    })
                    .catch(() => {
                        // If the fetch fails, return the offline page from cache
                        return caches.match('offline.html');
                    });
            })
    );
});


//activate sw
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

