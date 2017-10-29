var CACHE_NAME = 'hoonahCache-v0.8';
var urlsToCacheFirst = [
  // CSS
  '/static/hnfp/css/materialize.css',
  '/static/hnfp/css/style.css',
  '/static/hnfp/css/openlayers/ol.css',
  '/static/hnfp/css/openlayers/layerswitcher.css',
  // JS
  '/static/hnfp/js/jquery-3.2.1.min.js',
  '/static/hnfp/js/materialize/materialize.min.js',
  '/static/hnfp/js/openlayers/ol.js',
  '/static/hnfp/js/openlayers/layerswitcher.js',
  '/static/hnfp/js/map.hnfp.js',
  '/static/hnfp/js/map.landuse.js',
  '/static/hnfp/js/alerts.js',
  '/static/hnfp/js/observations.js',
  '/static/hnfp/js/dashboard.js',
  '/static/hnfp/js/projects.js',
];
var urlsToCacheSecond = [
  // Fonts
  '/static/hnfp/fonts/function/function.woff',
  '/static/hnfp/fonts/function/function_bold.woff',
  '/static/hnfp/fonts/material/MaterialIcons-Regular.woff',
  // Images
  '/static/hnfp/img/logo.svg',
  '/static/hnfp/img/logo.png',
  '/static/hnfp/img/icons/i_news.svg',
  '/static/hnfp/img/icons/i_pencil.svg',
  '/static/hnfp/img/icons/i_profile.svg',
  '/static/hnfp/img/icons/i_rain.svg',
  '/static/hnfp/img/icons/i_search.svg',
  '/static/hnfp/img/icons/i_user.svg',
  '/static/hnfp/img/icons/layers.png',
  '/static/hnfp/img/icons/category/i_bear.png',
  '/static/hnfp/img/icons/category/i_berries.png',
  '/static/hnfp/img/icons/category/i_crab.png',
  '/static/hnfp/img/icons/category/i_custom.png',
  '/static/hnfp/img/icons/category/i_deer.png',
  '/static/hnfp/img/icons/category/i_firewood.png',
  '/static/hnfp/img/icons/category/i_fish.png',
  '/static/hnfp/img/icons/category/i_medicinal_herbs.png',
  '/static/hnfp/img/icons/category/i_mushrooms.png',
  '/static/hnfp/img/icons/category/i_shellfish.png',
  '/static/hnfp/img/icons/category/i_shrimp.png',
  // JavaScript
  '/static/hnfp/js/app.hnfp.js',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      cache.addAll(urlsToCacheSecond);
      return cache.addAll(urlsToCacheFirst);
    })
  )
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

/* self.addEventListener('push', function(event) {
  if (event.data.text() == 'new-alert') {
    event.waitUntil(
      caches.open('alerts').then(function(cache) {
        return fetch('/alerts.json').then(function(response) {
          cache.put('/alerts.json', response.clone());
          return response.json();
        });
      }).then(function(alert) {
        registration.showNotification("New Alert", {
          body: alert[0]
        });
      })
    );
  }
}); */

/* self.addEventListener('notificationclick', function(event) {
  if (event.notification.tag == 'new-alert') {
    // Assume that all of the resources needed to render /alert/ have previously been cached, e.g. as part of the install handler.
    new WindowClient('/dashboard/');
  }
}); */
