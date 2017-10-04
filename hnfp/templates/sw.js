var CACHE_NAME = 'hoonahCache-v0.1';
var urlsToCache = [
  '/manifest.json',
  '/sw.js',
  '/static/hnfp/css/materialize.css',
  '/static/hnfp/css/style.css',
  '/static/hnfp/css/openlayers/ol.css',
  '/static/hnfp/css/openlayers/layerswitcher.css',
  '/static/bower_components/jquery/dist/jquery.js',
  '/static/hnfp/js/materialize/materialize.min.js',
  '/static/hnfp/js/alerts.js',
  '/static/hnfp/js/app.hnfp.js',
  '/static/hnfp/js/dashboard.js',
  '/static/hnfp/js/map.hnfp.js',
  '/static/hnfp/js/map.landuse.js',
  '/static/hnfp/js/observations.js',
  '/static/hnfp/js/offline.js',
  '/static/hnfp/js/projects.js',
  '/static/hnfp/js/data/hoonah_cabins.geojson',
  '/static/hnfp/js/data/hoonah_landownership.geojson',
  '/static/hnfp/js/data/hoonah_roads.geojson',
  '/static/hnfp/js/materialize/materialize.min.js',
  '/static/hnfp/js/openlayers/layerswitcher.js',
  '/static/hnfp/js/openlayers/ol.js',
  '/login/',
  '/registered/',
  '/myaccount/',
  '/dashboard/',
  '/alert/',
  '/alert/new/',
  '/observation/',
  '/observation/new/',
  '/landuse/',
  '/landuse/new/',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  )
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.filter(function(cacheName) {
        return true;
      }).map(function(cacheName) {
        return caches.delete(cacheName);
      }))
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
