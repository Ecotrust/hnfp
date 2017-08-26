if ('serviceWorker' in navigator) {
  console.log("Will the service worker register?");
  navigator.serviceWorker.register('/sw.js')
    .then(function(reg){

    }).catch(function(err) {
      console.log(err)
    });
}

var CACHE_NAME = 'Hoonah Stewards';
var urlsToCache = [
  '/',
  '/dashboard/',
  '/observation/',
  '/observation/new',
  '/observation/create',
  '/static/'
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
