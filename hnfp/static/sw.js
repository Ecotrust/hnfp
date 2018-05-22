importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);
    workbox.core.setCacheNameDetails({
      prefix: 'hnfp',
      suffix: 'v3.11'
    });

    workbox.precaching.precacheAndRoute([]);

    // Background sync
    const hnfpQueue = new workbox.backgroundSync.Plugin('hnfpQueue', {
      maxRetentionTime: 24 * 60 * 2
    });

    // JSON post requests off network add to background sync queue
    // background sync queue stored in IndexedDB
    // when browser regains connectivity, a sync event, requests are retried

    workbox.routing.registerRoute(
      new RegExp('(.*)(?:create|delete|update|detail)(.*)'),
      workbox.strategies.networkFirst({
        networkTimetoutSeconds: 3,
        cacheName: 'hnfp-queue',
        plugins: [hnfpQueue],
      }),
    );

    workbox.routing.registerRoute(
      /.*\.(?:html)/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'html-cache'
      }),
    );

    workbox.routing.registerRoute(
      /(.*)observation(.*)/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'observation-cache'
      }),
    );

    workbox.routing.registerRoute(
      /(.*)alert(.*)/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'alert-cache'
      })
    );

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
      workbox.strategies.CacheFirst({
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
