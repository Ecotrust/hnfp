var CACHE_NAME = 'Hoonah Stewards';
var urlsToCache = [
  '/',
  '/dashboard/',
  '/observation/',
  '/observation/new',
  '/observation/create',
  '/hnfp/blocks/extra_css.html',
  '/static/hnfp/css/style.css',
  '/static/hnfp/css/materialize.css',
  '/static/hnfp/css/materialize_stepper.css',
  '/static/hnfp/css/materialize.css',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

/* self.addEventListener('fetch', function(event) {
  // If a match isn't found in the cache, the response
  // will look like a connection error
  event.respondWith(caches.match(event.request));
}); */

self.addEventListener('sync', function(event) {
  self.registration.showNotification("Sync event fired!");
});

self.addEventListener('push', function(event) {
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
});

self.addEventListener('notificationclick', function(event) {
  if (event.notification.tag == 'new-alert') {
    // Assume that all of the resources needed to render /alert/ have previously been cached, e.g. as part of the install handler.
    new WindowClient('/alert/');
  }
});
