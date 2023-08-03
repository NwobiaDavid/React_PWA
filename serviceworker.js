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
self.addEventListener('fetch', (e)=>{
    e.respondWith(
        caches.match(e.request)
        .then(()=>{
            return fetch(e.request)
            .catch(()=> caches.match('offline.html'))
        })
    )
}); 

//activate sw
self.addEventListener('activate', (e)=>{
    const cacheList = [];
    cacheList.push(CACHE_NAME);

    e.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheNames)=>{
                if(!cacheList.includes(cacheNames)){
                    return caches.delete(cacheNames);
                }
            })
        ))
    )
})
