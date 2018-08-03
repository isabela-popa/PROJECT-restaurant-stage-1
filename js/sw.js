// Store the latest cache in a variable
let newCache = 'restaurant-reviews-v3';

// Cache the URLs
self.addEventListener('install', event => {
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
        '/index.html',
        '/restaurant.html'
    ];

    // Open a new cache and cache the URLs
    event.waitUntil(
        caches.open(newCache).then(cache =>
            cache.addAll(cacheUrls)
        )
    );
});

// Remove the old caches
self.addEventListener('activate', event =>
    event.waitUntil(
        caches.keys().then(oldCaches =>
            Promise.all(
                oldCaches.filter(oldCache =>
                    oldCache.startsWith('restaurant-reviews-') &&
                    oldCache != newCache
                ).map(oldCache =>
                    caches.delete(oldCache)
                )
            )
        )
    )
);

// Add listener for fetch event
self.addEventListener('fetch', event =>
    // If it exists, bring the content from the cache storage, otherwise fetch it from network
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            return fetch(event.request);
        })
    )
);
