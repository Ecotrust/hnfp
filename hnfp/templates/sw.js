var cacheName = 'hoonahs-stewards';
var dataCacheName = 'hoonah-data';
var urlsToCache = [
  '/',
  '/static/hnfp/css/materialize.css',
  '/static/hnfp/css/style.css',
  '/hnfp/',
  '/myaccount/',
  '/alert/',
  '/dashboard/'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(fromCache(event.request).catch(fromServer(event.request)));
  event.waitUntil(update(event.request));
});

self.addEventListener('sync', function(event) {
  self.registration.showNotification("Sync event fired!");
});

self.addEventListener('push', function(event) {
  /* if (event.data.text() == 'new-alert') {
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
  } */
});

self.addEventListener('notificationclick', function(event) {
  /* if (event.notification.tag == 'new-alert') {
    // Assume that all of the resources needed to render /alert/ have previously been cached, e.g. as part of the install handler.
    new WindowClient('/dashboard/');
  } */
});

function precache() {
  return caches.open(cacheName).then(function (cache) {
    return cache.addAll(precacheFiles);
  });
}

function update(request) {
  //this is where we call the server to get the newest version of the
  //file to use the next time we show view
  return caches.open(cacheName).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

function fromCache(request) {
  //we pull files from the cache first thing so we can show them fast
  return caches.open(cacheName).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function fromServer(request){
  //this is the fallback if it is not in the cahche to go to the server and get it
return fetch(request).then(function(response){ return response})
}
