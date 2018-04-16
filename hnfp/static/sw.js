importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
// // var CACHE_NAME = 'hoonahCache-v2.1';
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.0/workbox-sw.js');
// const queue = new workbox.backgroundSync.Queue('hoonahQueue');
// const createHandler = ({url, event, params}) => {
//   return fetch(event.request)
//   .catch((response) => {
//     var clone = event.request.clone();
//     queue.addRequest(clone)
//   })
// };
//
// const staleRevalidate = workboxSW.strategies.staleWhileRevalidate({
//   cacheName: 'staleRevalidate',
//   cacheExpiration: {
//     maxEntries: 200
//   }
// });
//
// if (workbox) {
//   console.log('workbox good to go');
//
//   workbox.router.registerRoute('*', args => {
//     return staleRevalidate.handle(args);
//   });
//
//   workbox.routing.registerRoute(
//     new RegExp('/static/(.*)'),
//     workbox.strategies.staleWhileRevalidate(),
//   );
//
//   workbox.routing.registerRoute(
//       /\.(?:js|css|html)$/,
//       workbox.strategies.staleWhileRevalidate({
//         cacheName: 'static-resources',
//       }),
//     );
//
//     workbox.routing.registerRoute(
//       /\.(?:png|jpg|jpeg|svg)$/,
//       workbox.strategies.cacheFirst({
//         cacheName: 'images',
//         plugins: [
//           new workbox.expiration.Plugin({
//             maxEntries: 60,
//             maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//           }),
//         ],
//       }),
//     );
//
//   workbox.routing.registerRoute(
//     new RegExp('https://storage.googleapis.com.*'),
//     workbox.strategies.cacheFirst(),
//   );
//
//   workbox.routing.registerRoute(
//     '/observation/create/',
//     createHandler,
//     'POST'
//   );
//
// } else {
//   console.log(`Boo! Workbox didn't load 😬`);
// }
//
//
// // self.addEventListener('fetch', function(event) {
// //   // Parse the URL:
// //   var requestURL = new URL(event.request.url);
// //   if (requestURL.path === 'navbar') {
// //     event.respondWith(
// //       Promise.all([
// //         caches.match('/navbar.html').then(function(response) {
// //           return response.text();
// //         }),
// //         caches.match(requestURL.path + '.json').then(function(response) {
// //           return response.json();
// //         })
// //       ]).then(function(responses) {
// //         var template = responses[0];
// //         var data = responses[1];
// //
// //         return new Response(renderTemplate(template, data), {
// //           headers: {
// //             'Content-Type': 'text/html'
// //           }
// //         });
// //       })
// //     )
// //   }
// //
// //   event.respondWith(
// //     fetch(event.request).catch(function() {
// //       return caches.match(event.request);
// //     })
// //   )
// // });
//
// // function addToCache(request) {
// //   caches.open(CACHE_NAME).then(function(cache) {
// //     cache.add(request);
// //   })
// // }
//
// /* self.addEventListener('push', function(event) {
//   if (event.data.text() == 'new-alert') {
//     event.waitUntil(
//       caches.open('alerts').then(function(cache) {
//         return fetch('/alerts.json').then(function(response) {
//           cache.put('/alerts.json', response.clone());
//           return response.json();
//         });
//       }).then(function(alert) {
//         registration.showNotification("New Alert", {
//           body: alert[0]
//         });
//       })
//     );
//   }
// }); */
//
// /* self.addEventListener('notificationclick', function(event) {
//   if (event.notification.tag == 'new-alert') {
//     // Assume that all of the resources needed to render /alert/ have previously been cached, e.g. as part of the install handler.
//     new WindowClient('/dashboard/');
//   }
// }); */
//
// workbox.precaching.precacheAndRoute([
//   {
//     "url": "__init__.py",
//     "revision": "d41d8cd98f00b204e9800998ecf8427e"
//   },
//   {
//     "url": "admin.py",
//     "revision": "72ac56f5b86cac7fae6d290a776bbe6a"
//   },
//   {
//     "url": "apps.py",
//     "revision": "43e1c0aad8b6ae92e28111b1e60c9634"
//   },
//   {
//     "url": "data_catalog/__init__.py",
//     "revision": "d41d8cd98f00b204e9800998ecf8427e"
//   },
//   {
//     "url": "data_catalog/migrations/__init__.py",
//     "revision": "d41d8cd98f00b204e9800998ecf8427e"
//   },
//   {
//     "url": "data_catalog/migrations/0001_initial.py",
//     "revision": "9176319b254f68bad1d19a398d0212af"
//   },
//   {
//     "url": "data_catalog/migrations/0002_datacatalog_description.py",
//     "revision": "319427b3959b86063516520a4aacdd52"
//   },
//   {
//     "url": "data_catalog/models.py",
//     "revision": "ffb43401cbf1640a47fd0d4157c0268e"
//   },
//   {
//     "url": "data_catalog/templates/data_catalog/data_catalog.html",
//     "revision": "1c2493e67f8aefa992e0957e18520c2b"
//   },
//   {
//     "url": "data_catalog/templates/data_catalog/includes/layer_info.html",
//     "revision": "8d598043a3c481b2d2c95c6f0056de4a"
//   },
//   {
//     "url": "data_catalog/templates/data_catalog/override-detail.html",
//     "revision": "ac21516745a4ae238b4de761c44d636c"
//   },
//   {
//     "url": "data_catalog/templates/data_catalog/theme_card.html",
//     "revision": "8c9e9f7fcc5da174f64ffa19d41e2e42"
//   },
//   {
//     "url": "data_catalog/templates/data_catalog/theme.html",
//     "revision": "523127ca15ae8b288d10a89de250cbd8"
//   },
//   {
//     "url": "data_catalog/urls.py",
//     "revision": "d936c7aac42b43a29719372f23db510c"
//   },
//   {
//     "url": "data_catalog/views.py",
//     "revision": "836961b4111b83c5b49cb3b61a87104c"
//   },
//   {
//     "url": "forms.py",
//     "revision": "a8d87982baa1e7abcc4538e268ee1c96"
//   },
//   {
//     "url": "migrations/__init__.py",
//     "revision": "d41d8cd98f00b204e9800998ecf8427e"
//   },
//   {
//     "url": "migrations/0001_initial.py",
//     "revision": "d4f265f5149f55982e0a6b456ea6a092"
//   },
//   {
//     "url": "migrations/0001_squashed_0026_auto_20170822_1712.py",
//     "revision": "40f5f9b3c1860abe774f69caba768d49"
//   },
//   {
//     "url": "migrations/0002_auto_20170710_1438.py",
//     "revision": "c446f15760cadb301a153cf8d29cf804"
//   },
//   {
//     "url": "migrations/0002_auto_20170830_1639.py",
//     "revision": "9869d9f0c4235b5dfccffaed09967792"
//   },
//   {
//     "url": "migrations/0003_auto_20170830_1749.py",
//     "revision": "ff01f521730d35d2d81a3f18f61ea95b"
//   },
//   {
//     "url": "migrations/0003_post.py",
//     "revision": "7da8f55784f317f265e434f2a928b15a"
//   },
//   {
//     "url": "migrations/0004_aoi_jobopportunity.py",
//     "revision": "7cb14d04e297b4701b96ceba1902922f"
//   },
//   {
//     "url": "migrations/0004_observation_observer_username.py",
//     "revision": "e788eb3f55cd454b43610df0aa9abf08"
//   },
//   {
//     "url": "migrations/0005_auto_20170728_1518.py",
//     "revision": "59240c69852e4972ae3daaa461f21426"
//   },
//   {
//     "url": "migrations/0005_landuseprojects.py",
//     "revision": "5855192d341efa643a38c13044a52911"
//   },
//   {
//     "url": "migrations/0006_auto_20170728_1536.py",
//     "revision": "af4ec33e5106bb53cc308e57773d7bb6"
//   },
//   {
//     "url": "migrations/0006_auto_20170922_1546.py",
//     "revision": "e2f49406a7e1ca4760cde6a76ce83990"
//   },
//   {
//     "url": "migrations/0007_auto_20170808_1556.py",
//     "revision": "f457ba73a0163477d7981845e040dd4a"
//   },
//   {
//     "url": "migrations/0007_landuseprojects_category.py",
//     "revision": "50364ec810097ef9fd2fa54a9ccf0ca5"
//   },
//   {
//     "url": "migrations/0008_auto_20170808_1558.py",
//     "revision": "aca5dc46059f317e01bb3c2bcb8c95ec"
//   },
//   {
//     "url": "migrations/0008_auto_20170923_1715.py",
//     "revision": "eb046da479e11c320b4c94d5ec4325d2"
//   },
//   {
//     "url": "migrations/0009_auto_20170809_1521.py",
//     "revision": "c37d9dc6a87701eea52137ca9395af52"
//   },
//   {
//     "url": "migrations/0009_auto_20170925_1247.py",
//     "revision": "861094c5bfbe68d16fe8de570486097e"
//   },
//   {
//     "url": "migrations/0010_auto_20170809_1626.py",
//     "revision": "8de39fc8b876653855c3a05d5864832d"
//   },
//   {
//     "url": "migrations/0010_auto_20170926_1355.py",
//     "revision": "6a5ac382bc6c054df3a5b3f22fea3024"
//   },
//   {
//     "url": "migrations/0011_auto_20170809_1635.py",
//     "revision": "bd2a599df1b290f146241c24a3dd580e"
//   },
//   {
//     "url": "migrations/0011_auto_20170927_1013.py",
//     "revision": "cb19c8a73ea6c325daa27ce2825b1b77"
//   },
//   {
//     "url": "migrations/0012_auto_20170810_1103.py",
//     "revision": "ed5cbe06e991335eaa1ea453977701b3"
//   },
//   {
//     "url": "migrations/0012_auto_20170927_1228.py",
//     "revision": "dbe00c0acde788b590f888540c41d1a0"
//   },
//   {
//     "url": "migrations/0013_auto_20170927_1256.py",
//     "revision": "1d3308513a80ce20c7ea55f686f42f1b"
//   },
//   {
//     "url": "migrations/0014_auto_20170927_1310.py",
//     "revision": "e063a6de8d6479afc1f03ae0d9a5de88"
//   },
//   {
//     "url": "migrations/0015_auto_20170816_1303.py",
//     "revision": "7b7a3e360b6e2fbf393edcd334f10dd1"
//   },
//   {
//     "url": "migrations/0015_auto_20170927_1312.py",
//     "revision": "3b4a9053268b9aaed4d9bc5e31ccf281"
//   },
//   {
//     "url": "migrations/0016_auto_20170816_1332.py",
//     "revision": "888f3b579f4a0718683114c004f658e0"
//   },
//   {
//     "url": "migrations/0016_auto_20170927_1620.py",
//     "revision": "c13640f11f90ed048506e2c7eeca2ce0"
//   },
//   {
//     "url": "migrations/0017_auto_20170816_1509.py",
//     "revision": "94e79d5e7b029b8725eebbc26fce5779"
//   },
//   {
//     "url": "migrations/0017_auto_20170928_1440.py",
//     "revision": "4c83745d1c427305624fdbe2e9ab79fb"
//   },
//   {
//     "url": "migrations/0018_auto_20170816_1528.py",
//     "revision": "1b1b33a3d6868dda75b83aad733dbbac"
//   },
//   {
//     "url": "migrations/0018_surveyresults.py",
//     "revision": "dc46d9f95a17bb291e455fe34c137733"
//   },
//   {
//     "url": "migrations/0019_auto_20170819_1718.py",
//     "revision": "51087d7a93866276d52b70c596750973"
//   },
//   {
//     "url": "migrations/0019_auto_20171002_1619.py",
//     "revision": "d2014e8df5e3d04f45459acaca0fe651"
//   },
//   {
//     "url": "migrations/0020_auto_20170820_1602.py",
//     "revision": "64d12afa001f80ce985585a2f45e01e7"
//   },
//   {
//     "url": "migrations/0020_auto_20171002_1621.py",
//     "revision": "3f6c246c14dd682715cd553e1503f1a3"
//   },
//   {
//     "url": "migrations/0021_auto_20170822_1249.py",
//     "revision": "4a20a1e9dbbd8f9104fb047ca461026e"
//   },
//   {
//     "url": "migrations/0021_auto_20171003_1155.py",
//     "revision": "56bb722533688af81aa68c996c213575"
//   },
//   {
//     "url": "migrations/0022_auto_20170822_1313.py",
//     "revision": "bbfeebe0e875a057c5c0e7de3abb66e4"
//   },
//   {
//     "url": "migrations/0022_auto_20171020_1646.py",
//     "revision": "2a164a82ae48326348be0a638234e3ae"
//   },
//   {
//     "url": "migrations/0023_observation_observation_photo.py",
//     "revision": "d1ab1e85e479bd30a1f606770799ba49"
//   },
//   {
//     "url": "migrations/0024_alert_alert_photo.py",
//     "revision": "b728a13c37c5049e0c7edae8a0cfd500"
//   },
//   {
//     "url": "migrations/0025_auto_20170822_1446.py",
//     "revision": "87bd5cf85260f0ba62c7ab914e25a321"
//   },
//   {
//     "url": "migrations/0025_auto_20171023_1626.py",
//     "revision": "bde430b210a4bf0aa04c2c53247f10f4"
//   },
//   {
//     "url": "migrations/0026_auto_20170822_1712.py",
//     "revision": "2e6221a0a0071bcf935afa1e354cf5b3"
//   },
//   {
//     "url": "migrations/0026_remove_alert_observation_photo.py",
//     "revision": "e84b7368aea985f3d44542e6fbcb2b88"
//   },
//   {
//     "url": "migrations/0027_auto_20171024_1245.py",
//     "revision": "34d42abf824a89a980345940225cecb2"
//   },
//   {
//     "url": "migrations/0028_auto_20171024_1421.py",
//     "revision": "2fc08e161af4d32be454ca48a3692e22"
//   },
//   {
//     "url": "migrations/0029_auto_20171024_1626.py",
//     "revision": "44f2d6c00ac79aabd2f3d753a1204faf"
//   },
//   {
//     "url": "migrations/0030_auto_20171025_1511.py",
//     "revision": "5ead8461652605f7b8e3541d05fc10bd"
//   },
//   {
//     "url": "migrations/0031_auto_20171025_1529.py",
//     "revision": "dddc9d5d65ba74c65134a7c7565fe533"
//   },
//   {
//     "url": "migrations/0032_auto_20171101_1521.py",
//     "revision": "19dfa207221d121a93fa3b8ede78665b"
//   },
//   {
//     "url": "migrations/0033_auto_20171103_1128.py",
//     "revision": "7caa81f1169dede89157411da80a69bc"
//   },
//   {
//     "url": "migrations/0034_auto_20171129_1609.py",
//     "revision": "5faabb6bf75dcfc80eaa01273da2979f"
//   },
//   {
//     "url": "migrations/0035_auto_20171130_1353.py",
//     "revision": "19a7dc81f2f22c79991094ffd2e94600"
//   },
//   {
//     "url": "models.py",
//     "revision": "6cdcc8ce711872ad8e52ea6b0ecafeb0"
//   },
//   {
//     "url": "proj_urls.py",
//     "revision": "eca69b7af51588779940d4272f474e11"
//   },
//   {
//     "url": "project_settings.py",
//     "revision": "c8fb322041f0225f737cadeee0c23003"
//   },
//   {
//     "url": "static/hnfp/css/d3/billboard.min.css",
//     "revision": "59e86dd7b57a65eea733efe234956938"
//   },
//   {
//     "url": "static/hnfp/css/material-icons.css",
//     "revision": "c5941eed2e20a509114128aab1e96edf"
//   },
//   {
//     "url": "static/hnfp/css/material.min.css",
//     "revision": "df4b60389c70988da37574c0fb18caf7"
//   },
//   {
//     "url": "static/hnfp/css/materialize_stepper.css",
//     "revision": "ef11a6de7202ecc8d9c5a110a759cd34"
//   },
//   {
//     "url": "static/hnfp/css/materialize.css",
//     "revision": "3b97fe6456c578086f5b9d7c09125a72"
//   },
//   {
//     "url": "static/hnfp/css/materialize.min.css",
//     "revision": "8f5c6949be948d6aed6ee7a73ac92db5"
//   },
//   {
//     "url": "static/hnfp/css/openlayers/layerswitcher.css",
//     "revision": "257fcd88d0d23294d6df5ce55ae5321d"
//   },
//   {
//     "url": "static/hnfp/css/openlayers/ol.css",
//     "revision": "9307a55d70f7a6c5db88a42baeee5fe1"
//   },
//   {
//     "url": "static/hnfp/css/overwrite.css",
//     "revision": "aa5ae31fe16ba6966e3ab36fd680f8a7"
//   },
//   {
//     "url": "static/hnfp/css/style.css",
//     "revision": "a851583b72e40d62c06a6be64b685d57"
//   },
//   {
//     "url": "static/hnfp/fonts/material/MaterialIcons-Regular.svg",
//     "revision": "a1adea65594c502f9d9428f13ae210e1"
//   },
//   {
//     "url": "static/hnfp/img/aurora.jpg",
//     "revision": "f0735e46d76ebf427e019f2abb1d9176"
//   },
//   {
//     "url": "static/hnfp/img/aurora.png",
//     "revision": "4a8bf8ba77b65b6389735208291776c6"
//   },
//   {
//     "url": "static/hnfp/img/aurora@2x.png",
//     "revision": "f70f73af9ea2431ed0f49e52bb9c3fdf"
//   },
//   {
//     "url": "static/hnfp/img/bg_berries.png",
//     "revision": "b48ca2f4ea2ace44ea0a2da6310925b4"
//   },
//   {
//     "url": "static/hnfp/img/bg_eagle.jpg",
//     "revision": "3ce234e049b8133b63a1eeaf80890cac"
//   },
//   {
//     "url": "static/hnfp/img/bg_mountain.jpg",
//     "revision": "4ea6a674089c388f664bb5ff19a4fd56"
//   },
//   {
//     "url": "static/hnfp/img/bg.jpg",
//     "revision": "2017c06bb3f6df97c49bc3bb027390c3"
//   },
//   {
//     "url": "static/hnfp/img/canoe.jpg",
//     "revision": "ed9dbc2ac7de0fb82582c52e4410773a"
//   },
//   {
//     "url": "static/hnfp/img/eagle_soar.jpg",
//     "revision": "3ce234e049b8133b63a1eeaf80890cac"
//   },
//   {
//     "url": "static/hnfp/img/fishers.png",
//     "revision": "ff31f6a6f9a9f0ab845d74aa7953cf72"
//   },
//   {
//     "url": "static/hnfp/img/ianaj-0816.jpg",
//     "revision": "aec287f42dfdc40efa6dea5b1fda4a1b"
//   },
//   {
//     "url": "static/hnfp/img/ianaj-banana.jpg",
//     "revision": "85c8ae751bba2fee87783ff69dc6542e"
//   },
//   {
//     "url": "static/hnfp/img/ianaj-glacier.jpg",
//     "revision": "02923cd71f8d75ed3afc63202623dd32"
//   },
//   {
//     "url": "static/hnfp/img/ianaj-hummingbird.jpg",
//     "revision": "1e19167289a6c8f42bb66972f6268268"
//   },
//   {
//     "url": "static/hnfp/img/ianaj-loon.jpg",
//     "revision": "57590354627fac405677e0aac9561c6e"
//   },
//   {
//     "url": "static/hnfp/img/ianaj-mantid.jpg",
//     "revision": "4ed241e69e652c8acfcdcb16f2c86670"
//   },
//   {
//     "url": "static/hnfp/img/ianaj-monkey.jpg",
//     "revision": "342eff98369efba27ed0a16daa13d275"
//   },
//   {
//     "url": "static/hnfp/img/ianaj-moss.jpg",
//     "revision": "32025f714789b403451cc3542b829b32"
//   },
//   {
//     "url": "static/hnfp/img/ianaj-osprey.jpg",
//     "revision": "a7ae588256e18591a3c1d1ab51220268"
//   },
//   {
//     "url": "static/hnfp/img/ianaj-solistice.jpg",
//     "revision": "c8247d0c21d43651676c6b37cc460c7c"
//   },
//   {
//     "url": "static/hnfp/img/ianaj-stellers.jpg",
//     "revision": "f34f0a20619a546ffd072b36896a8503"
//   },
//   {
//     "url": "static/hnfp/img/ianaj-stream (1).jpg",
//     "revision": "6ae848e6fff559d8ac9e0199b391d474"
//   },
//   {
//     "url": "static/hnfp/img/ianaj-stream.jpg",
//     "revision": "5fbc148727efad8f953bede55e0db9bc"
//   },
//   {
//     "url": "static/hnfp/img/icons/category/i_bear.png",
//     "revision": "db46a3208a765d8e2d424f221aa8f200"
//   },
//   {
//     "url": "static/hnfp/img/icons/category/i_berries.png",
//     "revision": "b68222ee9d5aa0fdc2c75ca567811768"
//   },
//   {
//     "url": "static/hnfp/img/icons/category/i_crab.png",
//     "revision": "15cd368d30c30a877f2c5be33fff7475"
//   },
//   {
//     "url": "static/hnfp/img/icons/category/i_custom.png",
//     "revision": "437546eb17d8bc223cc68bbae478458f"
//   },
//   {
//     "url": "static/hnfp/img/icons/category/i_deer.png",
//     "revision": "64299f41179451544ac3d5acf9c8a3f0"
//   },
//   {
//     "url": "static/hnfp/img/icons/category/i_firewood.png",
//     "revision": "726ca05707eefde142efd8d395c94fd7"
//   },
//   {
//     "url": "static/hnfp/img/icons/category/i_fish.png",
//     "revision": "472434cc9ca9c7516501fb1922122079"
//   },
//   {
//     "url": "static/hnfp/img/icons/category/i_medicinal_herbs.png",
//     "revision": "7f7e1301b8c75342af33312ead1103af"
//   },
//   {
//     "url": "static/hnfp/img/icons/category/i_mushrooms.png",
//     "revision": "bdd7548673974ab9bd3101468d00efd0"
//   },
//   {
//     "url": "static/hnfp/img/icons/category/i_shellfish.png",
//     "revision": "39fc3d73c4131846f41c0704411329b7"
//   },
//   {
//     "url": "static/hnfp/img/icons/category/i_shrimp.png",
//     "revision": "239da4a9ea782e9c90aad87fe9a1fb00"
//   },
//   {
//     "url": "static/hnfp/img/icons/category/i_visible.png",
//     "revision": "5cf47fd0171aef1157b4fcc7f076a07a"
//   },
//   {
//     "url": "static/hnfp/img/icons/categoryCaps/i_Bear.png",
//     "revision": "db46a3208a765d8e2d424f221aa8f200"
//   },
//   {
//     "url": "static/hnfp/img/icons/categoryCaps/i_Berries.png",
//     "revision": "b68222ee9d5aa0fdc2c75ca567811768"
//   },
//   {
//     "url": "static/hnfp/img/icons/categoryCaps/i_Crab.png",
//     "revision": "15cd368d30c30a877f2c5be33fff7475"
//   },
//   {
//     "url": "static/hnfp/img/icons/categoryCaps/i_Custom.png",
//     "revision": "437546eb17d8bc223cc68bbae478458f"
//   },
//   {
//     "url": "static/hnfp/img/icons/categoryCaps/i_Deer.png",
//     "revision": "64299f41179451544ac3d5acf9c8a3f0"
//   },
//   {
//     "url": "static/hnfp/img/icons/categoryCaps/i_Firewood.png",
//     "revision": "726ca05707eefde142efd8d395c94fd7"
//   },
//   {
//     "url": "static/hnfp/img/icons/categoryCaps/i_Fish.png",
//     "revision": "472434cc9ca9c7516501fb1922122079"
//   },
//   {
//     "url": "static/hnfp/img/icons/categoryCaps/i_Medicinal Herbs.png",
//     "revision": "7f7e1301b8c75342af33312ead1103af"
//   },
//   {
//     "url": "static/hnfp/img/icons/categoryCaps/i_Mushrooms.png",
//     "revision": "bdd7548673974ab9bd3101468d00efd0"
//   },
//   {
//     "url": "static/hnfp/img/icons/categoryCaps/i_Shellfish.png",
//     "revision": "39fc3d73c4131846f41c0704411329b7"
//   },
//   {
//     "url": "static/hnfp/img/icons/categoryCaps/i_Shrimp.png",
//     "revision": "239da4a9ea782e9c90aad87fe9a1fb00"
//   },
//   {
//     "url": "static/hnfp/img/icons/categoryCaps/i_Visible.png",
//     "revision": "5cf47fd0171aef1157b4fcc7f076a07a"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/Fireworks PNG/Climacons.fw.png",
//     "revision": "1e049d8894ffac7b2239d2f17a1ba25f"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Download.svg",
//     "revision": "495d5ae7bb891c7a23e4bb9e300bc3ab"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Drizzle-Alt.svg",
//     "revision": "e6bf18fdb346b98015e2cb952c9851a1"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Drizzle-Moon-Alt.svg",
//     "revision": "0fe2e6ef69ee6794d35db130c8431fe3"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Drizzle-Moon.svg",
//     "revision": "d70ff67d385cd8f4b247cbc926fe80a8"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Drizzle-Sun-Alt.svg",
//     "revision": "ff76f4921d2531c24c63e188c9a3d60f"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Drizzle-Sun.svg",
//     "revision": "373424edae594859875c54ab07c46f6e"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Drizzle.svg",
//     "revision": "9134aeaf848c5ed24523005410756854"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Fog-Alt.svg",
//     "revision": "788adf71ba1fe5a50e21db06e8c99153"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Fog-Moon-Alt.svg",
//     "revision": "8b5e56f354492dd0c8621779ddb25ca2"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Fog-Moon.svg",
//     "revision": "c5f2b8dfe687c7367c6a1e157b21bb90"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Fog-Sun-Alt.svg",
//     "revision": "62e09bfe1b5111c6cd6bfa360d3154e0"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Fog-Sun.svg",
//     "revision": "1b5e34fe7681c315437fa97d861cdcf2"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Fog.svg",
//     "revision": "3694ef67610075498c91cdb7b2bfb2f4"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Hail-Alt.svg",
//     "revision": "ba9623dd21c805d64214eefba9a8751a"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Hail-Moon-Alt.svg",
//     "revision": "0178600a32e4d091ab2259eda1b36435"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Hail-Moon.svg",
//     "revision": "9afd582ba305ba2b9a13b6e84aecf6b9"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Hail-Sun-Alt.svg",
//     "revision": "b21c2883532ea6f673448cc1b8e0521b"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Hail-Sun.svg",
//     "revision": "c59a2ca0f62767be2467d9cf7b174991"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Hail.svg",
//     "revision": "f4e14d44ac01a70d61f1cb77c4eebe21"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Lightning-Moon.svg",
//     "revision": "ac5ff67eb35a20a042b256757ed3a0b6"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Lightning-Sun.svg",
//     "revision": "cf6de5e0e58386d8584303828b4e5cc6"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Lightning.svg",
//     "revision": "1afe7efda2ae788f15823e0f19d4a140"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Moon.svg",
//     "revision": "675a7cddcf441a98bad0880208ecdb37"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Rain-Alt.svg",
//     "revision": "40e43308bdcee2ddf18dca56c6808126"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Rain-Moon-Alt.svg",
//     "revision": "b6494a0cdd46559ef8af86c187a9aa7a"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Rain-Moon.svg",
//     "revision": "63673e209760fa664cd2bab7a375465a"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Rain-Sun-Alt.svg",
//     "revision": "8887782aae1920b0e2e40c438ae8d87f"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Rain-Sun.svg",
//     "revision": "21f3488dcb8633980ff88052a08d0720"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Rain.svg",
//     "revision": "316ec3310f84545f10f9525b44509d10"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Refresh.svg",
//     "revision": "1a3ff0e0813e0a1d7f75bb0776e95e78"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Snow-Alt.svg",
//     "revision": "35404d3acb64aeb0eb68d9da2e81f3d7"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Snow-Moon-Alt.svg",
//     "revision": "4e87f8ee078092f8774c35c08f45333a"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Snow-Moon.svg",
//     "revision": "3d1eeb72e0264664431da512ea2a0056"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Snow-Sun-Alt.svg",
//     "revision": "8d46ddf8f722ad1c4b4d419a32c01bf9"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Snow-Sun.svg",
//     "revision": "07412169c1732072fc70afa4673c5ea7"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Snow.svg",
//     "revision": "20379c89e064dca7173f49395ec16223"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Sun.svg",
//     "revision": "534afba6dc879efc03f27d5c964416bf"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Upload.svg",
//     "revision": "a6dbb3509c3a762ee0e9cbfb138c04be"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Wind-Moon.svg",
//     "revision": "78ffd09752e6bd576c832ece395b8bc4"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Wind-Sun.svg",
//     "revision": "db04153367effefc05ee21b72057374d"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud-Wind.svg",
//     "revision": "2a8661ec0e951cce9158ce43bf453430"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Cloud.svg",
//     "revision": "79b3c647bcb4502fe1f95e9d9c5de5d9"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Compass-East.svg",
//     "revision": "3fa8690231003f8540823fe421857c10"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Compass-North.svg",
//     "revision": "71b48d990110c3e95f6a3668f75fbb65"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Compass-South.svg",
//     "revision": "b9b95ea565e1f90c04138855f80bc889"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Compass-West.svg",
//     "revision": "42dcf9b677872dbfd9115554498bdc6e"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Compass.svg",
//     "revision": "8c91c8ff78749275527c7d471e9d49a1"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Degrees-Celcius.svg",
//     "revision": "00fd6cfa975fddd483ce2cb5fd5ba4dc"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Degrees-Fahrenheit.svg",
//     "revision": "b0d84b9b51f6afc6e7c815ae3f5021d7"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Moon-First-Quarter.svg",
//     "revision": "71b77c7313a910b0ceec4c130d8170a4"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Moon-Full.svg",
//     "revision": "652494611ce5ec575a32a7f3a1979cdb"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Moon-Last-Quarter.svg",
//     "revision": "16d9371b9d40d9f8fbaf5fd76aaf2cdd"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Moon-New.svg",
//     "revision": "9cbf8f5cc9f7800fd21c341c079adba4"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Moon-Waning-Crescent.svg",
//     "revision": "9414d27d57883ee5897d9e9c25f7cf6d"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Moon-Waning-Gibbous.svg",
//     "revision": "44ce562289de6feeb2ca3d9c0ea3eea3"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Moon-Waxing-Crescent.svg",
//     "revision": "f61d586466dac663e6b232481d83834f"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Moon-Waxing-Gibbous.svg",
//     "revision": "882d22faf4ef039aa68313806341d9fc"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Moon.svg",
//     "revision": "b87ca8b626b1d792e4b35da43f795ba7"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Shades.svg",
//     "revision": "7fe9f96369e7ce0c9a24ffe9a6312559"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Snowflake.svg",
//     "revision": "eace860f9832be6116f644968bcdc121"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Sun-Low.svg",
//     "revision": "88e3ce8c3de6ef15a67fb04d1e2403d9"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Sun-Lower.svg",
//     "revision": "a04dee428437237e5038c4dc5f94068d"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Sun.svg",
//     "revision": "53f709c56c0cb268362ba119c34e072a"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Sunrise.svg",
//     "revision": "8ee30ada8809ebb12c2e9c441601d7ba"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Sunset.svg",
//     "revision": "525cab6cf9e5a243e2ed1ca26f120941"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Thermometer-100.svg",
//     "revision": "82ca5b36433bf50ca1b983d2cab2f81c"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Thermometer-25.svg",
//     "revision": "17f9297427e2447adf60402bd6ec3a8f"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Thermometer-50.svg",
//     "revision": "36fc0d8e41981dd1fb9d2fd9b9aaadad"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Thermometer-75.svg",
//     "revision": "76ead3f47aa104b27aabeee6358f7351"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Thermometer-Zero.svg",
//     "revision": "14f4131cc738f8c3c56b2b696013fe99"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Thermometer.svg",
//     "revision": "cbd69f43be6e55ea7e50690058e6a49b"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Tornado.svg",
//     "revision": "b6e81ba5cf340047ac2d230b394e613d"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Umbrella.svg",
//     "revision": "7028e28e68e2531756fbc7bd998f12b1"
//   },
//   {
//     "url": "static/hnfp/img/icons/climacons/SVG/Wind.svg",
//     "revision": "6b4d10062fb150d93eb6d0a550d19947"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_alert_darkblue.png",
//     "revision": "546117a478a079460036be6242c6a85a"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_alert_darkblue.svg",
//     "revision": "09654a3ea0ef40d22970ea10ca392820"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_alert_red.png",
//     "revision": "d9eb3c4a04c39ca60d45591e2d47e2b0"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_alert_red.svg",
//     "revision": "8c2e63f7a66e7a1c2ed3007cdfa6bf33"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_alert_white.svg",
//     "revision": "2f367ab76b01e67b583cab37e4bfe79d"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_bear_alt.png",
//     "revision": "bb2c0d9b57da9c03a0e8cc705ac4b30c"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_bear_alt.svg",
//     "revision": "c148bdc80014067e77044a7e769ea755"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_bear.png",
//     "revision": "db46a3208a765d8e2d424f221aa8f200"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_bear.svg",
//     "revision": "3b88ea5bbe070b02dc3f4a026c3aeab7"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_berries_alt.png",
//     "revision": "55429421f64ec9abfead964afb5b422c"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_berries_alt.svg",
//     "revision": "1ed575da2ce8bfd62c9a46dd9041eecb"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_berries.png",
//     "revision": "b68222ee9d5aa0fdc2c75ca567811768"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_berries.svg",
//     "revision": "03a608539282ad53277c37db83d44155"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_binoculars_white.svg",
//     "revision": "68b979e172738b6ba4937448cbc75458"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_binoculars.png",
//     "revision": "df8e3ae007a086804874ad59a8985fb5"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_binoculars.svg",
//     "revision": "3d1ef80b45d0f365bb4a654602bae9d0"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_cal.png",
//     "revision": "7c85ee152b0971470e5d8cfe8c0ad37c"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_cal.svg",
//     "revision": "711e36a5020f2d95d4cc3b443ee52327"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_checklist_white.svg",
//     "revision": "4e74181baca0119ecf7f48bbb1fee3b5"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_checklist.png",
//     "revision": "d4cab7c9406e30ed0d9392b19598cc0d"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_checklist.svg",
//     "revision": "0c96dc129ca3fd16a2b8ce6b08fa7abb"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_clipboard.png",
//     "revision": "7ec141c658dc4e646601806f3cd71299"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_clipboard.svg",
//     "revision": "cbe7e4eb8a8c481bc3416c71cd147045"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_close.svg",
//     "revision": "44c5be5127ffcc9cb5756bfcd576b8cc"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_comment_white.svg",
//     "revision": "ba941864ce277b3c576db72842735a6f"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_comment.png",
//     "revision": "bd82a244496d85ad4560e0f9cb2ff297"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_comment.svg",
//     "revision": "8a779afeb16bb11875ac81dbabf186ab"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_crab_alt.png",
//     "revision": "e4d022e402076be407a6c8ac03ac8689"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_crab_alt.svg",
//     "revision": "288593e75703b4febf52cafa59e3ea20"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_crab.png",
//     "revision": "c14c6b71111d294e50a301ac8628322e"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_crab.svg",
//     "revision": "46ceeef00c5d01ecd966980877834fc0"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_deer_alt.png",
//     "revision": "07d564a656ff3c1dc40ad17eba5b14c6"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_deer_alt.svg",
//     "revision": "65809b6885f087f06f70fa62d0b2a602"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_deer.png",
//     "revision": "eddd2220e2b51122c79f74f62cb1ead2"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_deer.svg",
//     "revision": "baab2c2fad2531d3c0ad7a20531cb839"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_dot_yellow.svg",
//     "revision": "6c5e5a30d246104df76b5ff37336e634"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_eye_alt.png",
//     "revision": "a49a39723f7dc20449ba73d90498a587"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_eye_alt.svg",
//     "revision": "3c54c81e1573ff3b31c815be3e620787"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_eye.png",
//     "revision": "4cc38650751f9cafa1a8dac64e345b8a"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_eye.svg",
//     "revision": "c964a3f02448acb91d4441b9050581ad"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_fb_white.svg",
//     "revision": "fc9caa8135f575da59d943b361cbacdf"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_fb.png",
//     "revision": "9dcb50d1b8c4ee7b84945ab73ddbd8cc"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_fb.svg",
//     "revision": "f19427d79710d1b6e06ee19f55926867"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_fish_alt.png",
//     "revision": "b538c0a13577a9fd68826ad89af902c8"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_fish_alt.svg",
//     "revision": "1141c17483aee9d6df3caeb67e41449d"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_fish.png",
//     "revision": "1ddbf2eff1c511a0a7873c1e88362f43"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_fish.svg",
//     "revision": "d3ffffb3d753824d90c7907d4cb8fed0"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_fungi_alt.png",
//     "revision": "0d9a76b8df779b2169a1c8dff922f667"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_fungi_alt.svg",
//     "revision": "2ecf564920b43a05dc1985258b170b16"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_fungi.png",
//     "revision": "8dd3243de12dbaef430276d0f1108833"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_fungi.svg",
//     "revision": "6dbf3ce3008ca85e7a5dbfce8f71f2ce"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_log_alt.png",
//     "revision": "d856788e3b321ba60983086e5e3a7d7f"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_log_alt.svg",
//     "revision": "c4e216fe645f33e05e33f6ff4ab4f17d"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_log.png",
//     "revision": "586788c9ecd864cd8c1d1bde389e9ae2"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_log.svg",
//     "revision": "3df4f31b119717c92aba6fea019ff7c8"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_news.png",
//     "revision": "6f8dd7264a5dcc152c4251cb47b9801e"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_news.svg",
//     "revision": "3e6833dfd6ea840a201b6c7e7cc1d17e"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_pencil.png",
//     "revision": "feec3cd89a36da03ee179b75b16308ff"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_pencil.svg",
//     "revision": "0e96d825e5f11d3459c998a85e98d70f"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_plant_alt.png",
//     "revision": "21aa377dd36e7991adcaab24ae397e05"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_plant_alt.svg",
//     "revision": "b90cdb87c436cf9b9d30a8adb4b4497b"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_plant.png",
//     "revision": "89f1cadfe520004d39001d1885072ec7"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_plant.svg",
//     "revision": "ecd0e04dc97c11795ebe0a80805c7252"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_point_1_selected.svg",
//     "revision": "e5adfff559c2c2f9564e5d312832d941"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_point_1.png",
//     "revision": "2187faa8cde1f2651d751b7f074cf349"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_point_2.png",
//     "revision": "dd04f6ae8e6e5263010560fbbcf28698"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_point_2.svg",
//     "revision": "d1f7ec58655f33c849b3a3b17183b647"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_profile.png",
//     "revision": "c1d5f89ee306b2a148caff357e9ffa57"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_profile.svg",
//     "revision": "1d2b2f26d0e5ea4c4d060f55444ebf77"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_rain_blue.svg",
//     "revision": "a2b6de2209976fb122cac0593fc8721b"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_rain_white.svg",
//     "revision": "e283e65199c161187d73499810e4a38b"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_rain.png",
//     "revision": "0d41dcd1b5c5208d682068b037ca7533"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_rain.svg",
//     "revision": "a2b6de2209976fb122cac0593fc8721b"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_search.png",
//     "revision": "f7b9c6823549cd4c2195c23a8f5948a2"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_search.svg",
//     "revision": "afff464a391bdfbc535a12e65f16d133"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_shellfish_alt.png",
//     "revision": "384307af848a279574dd83154940d190"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_shellfish_alt.svg",
//     "revision": "b29dfe5d7b3c4c23f96217e30c390551"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_shellfish.png",
//     "revision": "c5aa4f1f4e2c719bd5172efe706826fa"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_shellfish.svg",
//     "revision": "b7a4c0a55abc99e14604dce1cdd26693"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_shrimp_alt.png",
//     "revision": "ac705fbe7d6d91d06185de50458fac72"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_shrimp_alt.svg",
//     "revision": "9cc9731adf69294ffec1f79a128a57b0"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_shrimp.png",
//     "revision": "bf78f7052710ab45c10fb1a1c6ec0a43"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_shrimp.svg",
//     "revision": "e651777f9df87e4501d668ca2845d8ac"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_star_alt.png",
//     "revision": "24a6668ffb4c3e5d4a92b1d9546a9939"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_star_alt.svg",
//     "revision": "4f12bdfea7747671600ebe39a64beaf8"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_star.png",
//     "revision": "6adfb93d52a4c967d31662f4f3ba1f4a"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_star.svg",
//     "revision": "24d18efeb597357f2449dd8dc454a2f2"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_user_white.svg",
//     "revision": "de6d1a3bd41ff885511d51ab691acfc6"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_user.png",
//     "revision": "fad45148480ce237dbbde9bf97799ead"
//   },
//   {
//     "url": "static/hnfp/img/icons/i_user.svg",
//     "revision": "dbbfe049fe7cb7a0032b749eee184e58"
//   },
//   {
//     "url": "static/hnfp/img/icons/layers_white.png",
//     "revision": "8fc11afba94f9058db6385cdd41b3479"
//   },
//   {
//     "url": "static/hnfp/img/icons/layers_white.svg",
//     "revision": "ec5da852a4976f34cb4c25a557ba92ba"
//   },
//   {
//     "url": "static/hnfp/img/icons/layers.png",
//     "revision": "406c3360e2e7f178dd224a9f15f5e7d7"
//   },
//   {
//     "url": "static/hnfp/img/joe.png",
//     "revision": "6640bbf869e1cb2ace045f10037db5c1"
//   },
//   {
//     "url": "static/hnfp/img/joeanna.png",
//     "revision": "738482cd093103f6c09c2ed99bdc8320"
//   },
//   {
//     "url": "static/hnfp/img/logo_adfg.png",
//     "revision": "8e7f33f7cae2be393877fbdff9a771e1"
//   },
//   {
//     "url": "static/hnfp/img/logo_cityofhoonah.jpg",
//     "revision": "6d7d34ee129efbe10b4193d96d3f0735"
//   },
//   {
//     "url": "static/hnfp/img/logo_ecotrust.svg",
//     "revision": "2a61a53b92fdb67a0ed75c887413ddac"
//   },
//   {
//     "url": "static/hnfp/img/logo_hia.jpg",
//     "revision": "0510efe7962a89611114b973604eab37"
//   },
//   {
//     "url": "static/hnfp/img/logo_hoonahtotem.jpg",
//     "revision": "418078110cb6debdd7615f24d89d735e"
//   },
//   {
//     "url": "static/hnfp/img/logo_nature_conservancy.png",
//     "revision": "2075018aa86df44aacb736888f8e64a2"
//   },
//   {
//     "url": "static/hnfp/img/logo_nature_conservancy.svg",
//     "revision": "1556f2b6ddbe973bd28e47e00076e32d"
//   },
//   {
//     "url": "static/hnfp/img/logo_nrcs.svg",
//     "revision": "a40af7e89553a560ff945fe4a685d8ae"
//   },
//   {
//     "url": "static/hnfp/img/logo_sealaska.jpg",
//     "revision": "d131502cd14de35b09dfd50584fa60a9"
//   },
//   {
//     "url": "static/hnfp/img/logo_tnc.svg",
//     "revision": "44a471da85b7766e1e9e41721e8c8204"
//   },
//   {
//     "url": "static/hnfp/img/logo_uaf.svg",
//     "revision": "b869fdcb37d49c9b58d23efe0d170dec"
//   },
//   {
//     "url": "static/hnfp/img/logo_usfs.svg",
//     "revision": "f404ac748f98d783c44f9f470fb15ce6"
//   },
//   {
//     "url": "static/hnfp/img/logo.png",
//     "revision": "8805b2df0adf267d9419c2f06f28ae46"
//   },
//   {
//     "url": "static/hnfp/img/logo.svg",
//     "revision": "d0bb5b1addd25c3b37f084af4ab324d8"
//   },
//   {
//     "url": "static/hnfp/img/mountain_bridge_white.png",
//     "revision": "d1638dbdf593291b75425389f82635a2"
//   },
//   {
//     "url": "static/hnfp/img/mountain_ridge_blue.png",
//     "revision": "5edebb70698cb5f64c7be687a0ed6617"
//   },
//   {
//     "url": "static/hnfp/img/mountain_ridge_blue.svg",
//     "revision": "883de88535e2731328c8f70e2b21046b"
//   },
//   {
//     "url": "static/hnfp/img/mountain_ridge_white.svg",
//     "revision": "3e0c1923c00af361fd30b468eab54904"
//   },
//   {
//     "url": "static/hnfp/img/mussels.png",
//     "revision": "019de00e30b3febdf3afa24c59fc8778"
//   },
//   {
//     "url": "static/hnfp/img/touch/homescreen.svg",
//     "revision": "170cb215b59e6bc772185a0da3e1e29d"
//   },
//   {
//     "url": "static/hnfp/img/touch/homescreen128.png",
//     "revision": "7f7887d29500bba5451017b1ce2f8c5e"
//   },
//   {
//     "url": "static/hnfp/img/touch/homescreen144.png",
//     "revision": "f0def09515ecaa3158e9a0f8f1467a83"
//   },
//   {
//     "url": "static/hnfp/img/touch/homescreen152.png",
//     "revision": "36b867a944334119fb853a85fea217ad"
//   },
//   {
//     "url": "static/hnfp/img/touch/homescreen168.png",
//     "revision": "483e5358e40fd45e6cb93c5e65cb4f24"
//   },
//   {
//     "url": "static/hnfp/img/touch/homescreen180.png",
//     "revision": "8963af15233ea8af43233d28f864f7ee"
//   },
//   {
//     "url": "static/hnfp/img/touch/homescreen192.png",
//     "revision": "e21465903338d8b61e520df9b818b5a1"
//   },
//   {
//     "url": "static/hnfp/img/touch/homescreen48.png",
//     "revision": "d096dd7d26eaf72e72b0311a066e8201"
//   },
//   {
//     "url": "static/hnfp/img/touch/homescreen72.png",
//     "revision": "a6821d58edddb048a7cc6f1d4b011e05"
//   },
//   {
//     "url": "static/hnfp/img/touch/homescreen96.png",
//     "revision": "010f24c84a25a840076a65d942313c9e"
//   },
//   {
//     "url": "static/hnfp/img/touch/icon_600.png",
//     "revision": "821239ad1ec4367338b2dc45818f1a61"
//   },
//   {
//     "url": "static/hnfp/img/watersheds.png",
//     "revision": "5536ff50c436e23c439e462fd7378839"
//   },
//   {
//     "url": "static/hnfp/img/watersheds.svg",
//     "revision": "68ec3a3c1f46ef669e2d090d23d23d7c"
//   },
//   {
//     "url": "static/hnfp/img/White.png",
//     "revision": "11bc7be51d17c237df29052a8eefcf18"
//   },
//   {
//     "url": "static/hnfp/img/White.svg",
//     "revision": "adb70557140c7d04b846096627c317d3"
//   },
//   {
//     "url": "static/hnfp/js/alerts.js",
//     "revision": "e4f65eaac07bafadcc49d277e87d8948"
//   },
//   {
//     "url": "static/hnfp/js/app.hnfp.js",
//     "revision": "14b166b7257e2d39aca4e930e6509228"
//   },
//   {
//     "url": "static/hnfp/js/d3/billboard.min.js",
//     "revision": "8302073fcbb4c19138df4257bd752903"
//   },
//   {
//     "url": "static/hnfp/js/d3/d3.min.js",
//     "revision": "49e8de4b8730bb7c837196488a591842"
//   },
//   {
//     "url": "static/hnfp/js/d3/localforage/localforage.js",
//     "revision": "64d5bd2b93d500220486a1adf9ef6d61"
//   },
//   {
//     "url": "static/hnfp/js/d3/localforage/localforage.min.js",
//     "revision": "04bbe882c627de0c0d294e1fa7d8ca8b"
//   },
//   {
//     "url": "static/hnfp/js/d3/localforage/localforage.nopromises.js",
//     "revision": "e85eabb740fd32bf8133acc847af657e"
//   },
//   {
//     "url": "static/hnfp/js/d3/localforage/localforage.nopromises.min.js",
//     "revision": "64d3abc6c348e3ddc67ba95f9d4f4e5e"
//   },
//   {
//     "url": "static/hnfp/js/dashboard.js",
//     "revision": "7b4ad2b929aa776cb6f644e26bfdd0e1"
//   },
//   {
//     "url": "static/hnfp/js/form_map.js",
//     "revision": "77d4c7bb94c53d8de0efadd1a94f701f"
//   },
//   {
//     "url": "static/hnfp/js/form.js",
//     "revision": "2191c307431a282eb83de1f18c7ac33b"
//   },
//   {
//     "url": "static/hnfp/js/jquery-3.2.1.min.js",
//     "revision": "c9f5aeeca3ad37bf2aa006139b935f0a"
//   },
//   {
//     "url": "static/hnfp/js/map.hnfp.js",
//     "revision": "bfba2409ddbdf6e44acb7fcfef7306a1"
//   },
//   {
//     "url": "static/hnfp/js/map.landuse.js",
//     "revision": "6ab7f6c9c329f57c756640a3ea841cd8"
//   },
//   {
//     "url": "static/hnfp/js/materialize/materialize_stepper.js",
//     "revision": "9391125c91f0b3591c1148a94a0042e2"
//   },
//   {
//     "url": "static/hnfp/js/materialize/materialize.js",
//     "revision": "b0f990d180b98bbcd855b8871990a366"
//   },
//   {
//     "url": "static/hnfp/js/materialize/materialize.min.js",
//     "revision": "f476c5962dee001df49cf73b43979c1f"
//   },
//   {
//     "url": "static/hnfp/js/materialize/starter.js",
//     "revision": "9018cf4461aaec97838f658c5750a1b1"
//   },
//   {
//     "url": "static/hnfp/js/observations.js",
//     "revision": "055cc93a78e942c04180d8bb85bf33e8"
//   },
//   {
//     "url": "static/hnfp/js/offline.js",
//     "revision": "3adc2b069ec6fe3ee9d9e02d9d18ca2a"
//   },
//   {
//     "url": "static/hnfp/js/openlayers/layerswitcher.js",
//     "revision": "ea80001f9bfefee836bc6c48fcb9673c"
//   },
//   {
//     "url": "static/hnfp/js/openlayers/ol.js",
//     "revision": "2f79c767c9ba56b4996daba5c3e3f131"
//   },
//   {
//     "url": "static/hnfp/js/projects.js",
//     "revision": "d0a9bd286ad34ba6617ca7694c3af0fa"
//   },
//   {
//     "url": "static/hnfp/js/workbox.js",
//     "revision": "5c061d8f7fda59b5a1a13cbad864e585"
//   },
//   {
//     "url": "templates/base.html",
//     "revision": "5ef887b0c9913e918a48f285f91e643b"
//   },
//   {
//     "url": "templates/hnfp/account.html",
//     "revision": "4cb2a18386b200cea5344dc8098e6c19"
//   },
//   {
//     "url": "templates/hnfp/alert_confirm_delete.html",
//     "revision": "c94761156131be5e404d25c23261a6bc"
//   },
//   {
//     "url": "templates/hnfp/alert_update.html",
//     "revision": "3be1aad5c35b77594306d4e28a3958f7"
//   },
//   {
//     "url": "templates/hnfp/alert.html",
//     "revision": "0528e1157e69323c76f7d2ad287640fe"
//   },
//   {
//     "url": "templates/hnfp/blocks/extra_css.html",
//     "revision": "af05738ee0564fc24d5ec25b44826264"
//   },
//   {
//     "url": "templates/hnfp/blocks/extra_head.html",
//     "revision": "0e11bf4be7de67b89cf7229e50ced797"
//   },
//   {
//     "url": "templates/hnfp/blocks/extra_js.html",
//     "revision": "f7916b70a97b5277d1a544fa18a394ba"
//   },
//   {
//     "url": "templates/hnfp/blocks/footer.html",
//     "revision": "c35a71096ac9f9e0d86cb77ef82680cd"
//   },
//   {
//     "url": "templates/hnfp/blocks/logos.html",
//     "revision": "20ac51f2604bcf02d388a1674714d934"
//   },
//   {
//     "url": "templates/hnfp/blocks/navbar.html",
//     "revision": "94861477cb1502d5febf17cc55bd588f"
//   },
//   {
//     "url": "templates/hnfp/blocks/observation_icons.html",
//     "revision": "1cf946e6e947968c552175f87714aff0"
//   },
//   {
//     "url": "templates/hnfp/dashboard.html",
//     "revision": "b64104183f4e9ce2d971f884054bdd71"
//   },
//   {
//     "url": "templates/hnfp/dashboard/alerts.html",
//     "revision": "921d4c9db54172bf4e32f338a7cdbc20"
//   },
//   {
//     "url": "templates/hnfp/dashboard/blog.html",
//     "revision": "6ea857e1e46539e8066d7ba05a8f24b7"
//   },
//   {
//     "url": "templates/hnfp/dashboard/events.html",
//     "revision": "89e78754a48d675f890e54764e6fc87b"
//   },
//   {
//     "url": "templates/hnfp/dashboard/observation.html",
//     "revision": "40245a90339d9ef7546e4189b57121b4"
//   },
//   {
//     "url": "templates/hnfp/dashboard/open_positions.html",
//     "revision": "fda486a5337a04f5d89d7d45ca648bd3"
//   },
//   {
//     "url": "templates/hnfp/dashboard/weather.html",
//     "revision": "9a91741dd6421ad72d0e2ee6d78e659a"
//   },
//   {
//     "url": "templates/hnfp/home.html",
//     "revision": "1a03374367ce34628343d36231bd5db7"
//   },
//   {
//     "url": "templates/hnfp/index.html",
//     "revision": "5f0bef1f1d91a68b8ddba73d7b269cc7"
//   },
//   {
//     "url": "templates/hnfp/job.html",
//     "revision": "b69659fb016acf106af03c08260ce12c"
//   },
//   {
//     "url": "templates/hnfp/land_use_survey.html",
//     "revision": "a8f17b355a938b88c1763331c08c38a1"
//   },
//   {
//     "url": "templates/hnfp/landuse/new_project.html",
//     "revision": "99862db9c4fe3198fa0383212a157655"
//   },
//   {
//     "url": "templates/hnfp/landuse/page.html",
//     "revision": "1b1ae98a246f5be2b97d192f2b88c58a"
//   },
//   {
//     "url": "templates/hnfp/landuseproject_confirm_delete.html",
//     "revision": "10edfa3d1109946b4e143d27a6fd96e4"
//   },
//   {
//     "url": "templates/hnfp/landuseproject_update.html",
//     "revision": "02971b2e3b0b0712ffd050b82db29b7c"
//   },
//   {
//     "url": "templates/hnfp/login.html",
//     "revision": "658c924481dc897bbe7d673b0db37931"
//   },
//   {
//     "url": "templates/hnfp/new_alert.html",
//     "revision": "e01625b4bc44cf7801ed01acc96727f3"
//   },
//   {
//     "url": "templates/hnfp/new_observation.html",
//     "revision": "cd777a48dac595fc6a206b30a0467735"
//   },
//   {
//     "url": "templates/hnfp/observation_confirm_delete.html",
//     "revision": "cd947850386a4bdcc38e08e8e7834024"
//   },
//   {
//     "url": "templates/hnfp/observation_update.html",
//     "revision": "687decee826410c2b0dfc027fbf170b9"
//   },
//   {
//     "url": "templates/hnfp/observation.html",
//     "revision": "4fad567f7d6c35bc8aa16054818eedea"
//   },
//   {
//     "url": "templates/hnfp/post_detail.html",
//     "revision": "95dbec2975a189a1b29b1a9b52d50109"
//   },
//   {
//     "url": "templates/hnfp/post_list.html",
//     "revision": "1d5b4f840b186cb2f63f75a17cda2be0"
//   },
//   {
//     "url": "templates/hnfp/survey/survey_actions.html",
//     "revision": "ae8476a54827b95dac8e41774b81a514"
//   },
//   {
//     "url": "templates/hnfp/survey/survey_basic_info.html",
//     "revision": "7ab8f34dd4beadf2e4e36cd494d225eb"
//   },
//   {
//     "url": "templates/hnfp/survey/survey_forest_use.html",
//     "revision": "b56933be3c9f6bc6e8d907a89dbeef84"
//   },
//   {
//     "url": "templates/hnfp/survey/survey_land_use_rank.html",
//     "revision": "39a57224c719f4ec9cb1d11476d75204"
//   },
//   {
//     "url": "templates/hnfp/survey/survey_location.html",
//     "revision": "32ec27093d0b103d428a8864d1160b96"
//   },
//   {
//     "url": "templates/hnfp/survey/survey_your_profile_1.html",
//     "revision": "36176b97f527eaa78298a3de2d6b8016"
//   },
//   {
//     "url": "templates/hnfp/survey/survey_your_profile_2.html",
//     "revision": "f955286f9220a5469bb95305649f2ced"
//   },
//   {
//     "url": "templates/hnfp/welcome_steward.html",
//     "revision": "34a8e15e5765cd913e2525362c9d194f"
//   },
//   {
//     "url": "templatetags/__init__.py",
//     "revision": "d41d8cd98f00b204e9800998ecf8427e"
//   },
//   {
//     "url": "templatetags/survey_extras.py",
//     "revision": "87b6c1a431ef346cbef762b9c21a8335"
//   },
//   {
//     "url": "tests.py",
//     "revision": "465b7e9f69bfd158c850cdfbc7306818"
//   },
//   {
//     "url": "urls.py",
//     "revision": "4c716627d62eed717af461659a4727a2"
//   },
//   {
//     "url": "views.py",
//     "revision": "60a2c6347f31b791e83a66d7e57d4d90"
//   }
// ]);
