const staticCacheName = 'rest-rev-static-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
       '/',
       '/index.html',
       '/restaurant.html',
       '/css/styles.css',
       '/js/main.js',
       '/js/dbhelper.js',
       '/js/restaurant_info.js',
       '/img/1.jpg',
       '/img/2.jpg',
       '/img/3.jpg',
       '/img/4.jpg',
       '/img/5.jpg',
       '/img/6.jpg',
       '/img/7.jpg',
       '/img/8.jpg',
       '/img/9.jpg',
       '/img/10.jpg'             
      ])
      .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('rest-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  var requestUrl = new URL(event.request.url);

  event.respondWith(
    caches.match(event.request, {
      ignoreSearch: true
    }).then(function(response) {
      return response || fetch(event.request);
    })
  );
});