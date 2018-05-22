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

    const hnfpAlertQueue = new workbox.backgroundSync.Plugin('hnfpAlertQueue', {
      maxRetentionTime: 24 * 60 * 2
    });

    const matchCb = ({url, event}) => {
      return (url.pathname === '/observation/create/');
    };

    const matchAlertCb = ({url, event}) => {
      return (url.pathname === '/alert/create/');
    };

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

    workbox.routing.registerRoute(
      /(.*)dashboard(.*)/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'dashboard-cache'
      })
    );

    workbox.routing.registerRoute(
      matchCb,
      workbox.strategies.networkOnly({
        plugins: [hnfpQueue],
      }),
      'POST'
    );

    workbox.routing.registerRoute(
      matchAlertCb,
      workbox.strategies.networkOnly({
        plugins: [hnfpAlertQueue],
      }),
      'POST'
    );

    workbox.routing.registerRoute(
      /.*\.(?:html)/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'html-cache'
      }),
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
      workbox.strategies.cacheFirst({
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

    workbox.routing.setDefaultHandler(({url, event, params}) => {
        workbox.strategies.staleWhileRevalidate()
    });

    workbox.skipWaiting();
    workbox.clientsClaim();

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
