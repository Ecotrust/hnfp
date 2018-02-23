// var CACHE_NAME = 'hoonahCache-v2.1';
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.0/workbox-sw.js');
const queue = new workbox.backgroundSync.Queue('hoonahQueue');
const createHandler = ({url, event, params}) => {
  return fetch(event.request)
  .catch((response) => {
    var clone = event.request.clone();
    queue.addRequest(clone)
  })
};

const staleRevalidate = workboxSW.strategies.staleWhileRevalidate({
  cacheName: 'staleRevalidate',
  cacheExpiration: {
    maxEntries: 200
  }
});

if (workbox) {
  console.log('workbox good to go');

  workbox.router.registerRoute('*', args => {
    return staleRevalidate.handle(args);
  });

  workbox.routing.registerRoute(
    new RegExp('/static/(.*)'),
    workbox.strategies.staleWhileRevalidate(),
  );

  workbox.routing.registerRoute(
      /\.(?:js|css|html)$/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'static-resources',
      }),
    );

    workbox.routing.registerRoute(
      /\.(?:png|jpg|jpeg|svg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      }),
    );

  workbox.routing.registerRoute(
    new RegExp('https://storage.googleapis.com.*'),
    workbox.strategies.cacheFirst(),
  );

  workbox.routing.registerRoute(
    '/observation/create/',
    createHandler,
    'POST'
  );

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}


// self.addEventListener('fetch', function(event) {
//   // Parse the URL:
//   var requestURL = new URL(event.request.url);
//   if (requestURL.path === 'navbar') {
//     event.respondWith(
//       Promise.all([
//         caches.match('/navbar.html').then(function(response) {
//           return response.text();
//         }),
//         caches.match(requestURL.path + '.json').then(function(response) {
//           return response.json();
//         })
//       ]).then(function(responses) {
//         var template = responses[0];
//         var data = responses[1];
//
//         return new Response(renderTemplate(template, data), {
//           headers: {
//             'Content-Type': 'text/html'
//           }
//         });
//       })
//     )
//   }
//
//   event.respondWith(
//     fetch(event.request).catch(function() {
//       return caches.match(event.request);
//     })
//   )
// });

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
