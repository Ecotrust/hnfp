// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('/sw.js')
//       .then(function(registration) {
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//       })
//       .catch(function(err) {
//         console.log('ServiceWorker registration failed: ', err);
//       });
//   });
// }
//
// Check that service workers are registered
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
        .then(function(response) {
            console.log('ServiceWorker registration successful with scope: %o', response);
          })
          .catch(function(response) {
            console.log('ServiceWorker registration failed: ', response);
          });
  });
}
