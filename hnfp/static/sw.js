importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    // Background sync
    const bgSyncPlugin = new workbox.backgroundSync.Plugin('hnfpQueue', {
      maxRetentionTime: 2 * 24 * 60 // Retry for max of 48 Hours
    });

    // cache names
    workbox.core.setCacheNameDetails({
      prefix: 'hnfp',
      suffix: 'v2'
    });

    // JSON post requests off network add to background sync queue
    // background sync queue stored in IndexedDB
    // when browser regains connectivity, a sync event, requests are retried
    workbox.routing.registerRoute(
      /.*\/create\/.*/g,
      new workbox.strategies.NetworkOnly({
          cacheName: 'hnfp-bg-sync',
          plugins: [bgSyncPlugin]
      }),
      'POST'
    );

    // cache and serve images
    // fallback to network
    // cache for 30 days
    workbox.routing.registerRoute(
      /.*\.(?:png|jpg|jpeg|svg|gif)/g,
      new workbox.strategies.CacheFirst({
        cacheName: 'hnfp-image-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

    // cache and serve css and js
    // then update cache version with network version in background
    // serve new version next refresh
    workbox.routing.registerRoute(
      /\.(?:js|css)$/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'hnfp-js-css',
      }),
    );

    // only allow admin access when connected to network
    workbox.routing.registerRoute(
      new RegExp('.*/admin/hnfp/.*'),
      workbox.strategies.networkOnly()
    );

    workbox.routing.setDefaultHandler(({url, event, params}) => {
        workbox.strategies.staleWhileRevalidate()
    });


} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute([])
