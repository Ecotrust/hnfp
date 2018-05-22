importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    // Background sync
    const hnfpQueue = new workbox.backgroundSync.Plugin('hnfpQueue', {
      maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
    });

    // cache names
    workbox.core.setCacheNameDetails({
      prefix: 'hnfp',
      suffix: 'v3.10'
    });

    // JSON post requests off network add to background sync queue
    // background sync queue stored in IndexedDB
    // when browser regains connectivity, a sync event, requests are retried

    workbox.routing.registerRoute(
      /.*\/?(create|update|delete|detail)\/?.*/,
      new workbox.strategies.NetworkOnly({
        plugins: [hnfpQueue]
      }),
      'POST'
    );

    // observations
    workbox.routing.registerRoute(
      '/observation',
      new workbox.strategies.staleWhileRevalidate({
        cacheName: 'observations'
      }),
    )

    // Google storage
    workbox.routing.registerRoute(
      /.*(?:googleapis)\.com.*$/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'googleapis',
      }),
    );

    workbox.routing.registerRoute(
      /.*(?:gstatic)\.com.*$/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'gstatic',
      }),
    );

    // cache and serve images
    // fallback to network
    // cache for 30 days
    workbox.routing.registerRoute(
      /.*\.(?:png|jpg|jpeg|svg|gif)/,
      new workbox.strategies.CacheFirst({
        cacheName: 'hnfp-image-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 2000,
            maxAgeSeconds: 90 * 24 * 60 * 60, // 90 Days
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
      /\.*\/admin\/hnfp\/.*/,
      new workbox.strategies.NetworkOnly()
    );

    workbox.routing.setDefaultHandler(({url, event, params}) => {
        workbox.strategies.staleWhileRevalidate()
    });

    workbox.googleAnalytics.initialize();

    workbox.skipWaiting();
    workbox.clientsClaim();

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute([])
