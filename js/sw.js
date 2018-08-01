// Cache the URLs
self.addEventListener('install', function (event) {
    // add the urls to cache to an array
    let cacheUrls = [
        '/',
        '/css/styles.css',
        '/data/restaurants.json',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        // '/index.html',
        '/restaurant.html'
    ];

    event.waitUntil(
        // Open a cache and cache the URLs
        caches.open('restaurant-reviews-v1').then(function (cache) {
            return cache.addAll(
                cacheUrls
            );
        })
    );
});


// Add listener for fetch event
self.addEventListener('fetch', function (event) {
    // If it exists, bring the content from the cache storage, otherwise fetch it from network
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) return response;
            return fetch(event.request);
        })
    );
});
