// var CACHE_NAME = 'hoonahCache-v2.0.5';
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.5/workbox-sw.js');
const queue = new workbox.backgroundSync.Queue('hoonahQueue');

if (workbox) {
  console.log('workbox good to go');

  workbox.routing.registerRoute(
    new RegExp('/'),
    workbox.strategies.networkFirst(),
  );

  workbox.routing.registerRoute(
    new RegExp('/static/(.*)'),
    workbox.strategies.staleWhileRevalidate(),
  );

  workbox.routing.registerRoute(
    new RegExp('.*'),
    workbox.strategies.staleWhileRevalidate(),
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
  // Parse the URL:
  var requestURL = new URL(event.request.url);
  // Routing for local URLs
  if (requestURL.origin == location.origin) {
    if (event.request.method == 'POST') {
      if (navigator.onLine) {
        event.respondWith(
          fetch(event.request)
        );
      } else {
        event.respondWith(
          queue.addRequest(request)
        );
      }
      return;
    }
  }
  if (requestURL.path === 'navbar') {
    event.respondWith(
      Promise.all([
        caches.match('/navbar.html').then(function(response) {
          return response.text();
        }),
        caches.match(requestURL.path + '.json').then(function(response) {
          return response.json();
        })
      ]).then(function(responses) {
        var template = responses[0];
        var data = responses[1];

        return new Response(renderTemplate(template, data), {
          headers: {
            'Content-Type': 'text/html'
          }
        });
      })
    )
  }

  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  )
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

workbox.precaching.precacheAndRoute([]);
