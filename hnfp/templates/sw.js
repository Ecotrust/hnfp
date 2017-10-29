var CACHE_NAME = 'hoonahCache-v0.7';
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
  '/static/fonts/function/function.woff',
  '/static/fonts/function/function_bold.woff',
  '/static/fonts/material/MaterialIcons-Regular.woff',
  // Images
  '/static/img/logo.svg',
  '/static/img/logo.png',
  '/static/img/icons/i_news.svg',
  '/static/img/icons/i_pencil.svg',
  '/static/img/icons/i_profile.svg',
  '/static/img/icons/i_rain.svg',
  '/static/img/icons/i_search.svg',
  '/static/img/icons/i_user.svg',
  '/static/img/icons/layers.png',
  '/static/img/icons/category/i_bear.svg',
  '/static/img/icons/category/i_berries.svg',
  '/static/img/icons/category/i_crab.svg',
  '/static/img/icons/category/i_custom.svg',
  '/static/img/icons/category/i_deer.svg',
  '/static/img/icons/category/firewood.svg',
  '/static/img/icons/category/i_fish.svg',
  '/static/img/icons/category/i_medicinal_herbs.svg',
  '/static/img/icons/category/i_mushrooms.svg',
  '/static/img/icons/category/i_shellfish.svg',
  '/static/img/icons/category/i_shrimp.svg',
  // JavaScript
  '/static/hnfp/js/app.hnfp.js',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mysite-static-v3').then(function(cache) {

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      cache.addAll(urlsToCacheFirst);
      return cache.addAll(urlsToCacheSecond);
    })
  )
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (expectedCaches.indexOf(cacheName) == -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
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
