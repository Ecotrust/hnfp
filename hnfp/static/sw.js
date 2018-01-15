// var CACHE_NAME = 'hoonahCache-v2.0.3';
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.3/workbox-sw.js');
const queue = workbox.backgroundSync.Queue('hoonahQueue');

if (workbox) {
  console.log('did it');

  workbox.routing.registerRoute(
    new RegExp('/static/(.*)'),
    workbox.strategies.staleWhileRevalidate(),
  );

  workbox.routing.registerRoute(
    new RegExp('/'),
    workbox.strategies.staleWhileRevalidate({
      plugins: [
        new workbox.backgroundSync.Plugin('hoonahQueue')
      ],
    }),
  );

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// var urlsToCacheFirst = [
//   // Templates
//
// ];
//
// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       return cache.addAll(urlsToCacheFirst);
//     })
//   )
// });

// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//           if(cacheName != CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

self.addEventListener('fetch', function(event) {
  if (event.request.method === 'POST') {
    try {
      await fetch(event.request);
    } catch (err) {
      queue.addRequest(request);
    }
  } else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      }).catch(function() {
      // fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    )
  }
});

self.addEventListener('message', function(event) {
    console.log(event);
  });

// function addToCache(request) {
//   caches.open(CACHE_NAME).then(function(cache) {
//     cache.add(request);
//   })
// }

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
