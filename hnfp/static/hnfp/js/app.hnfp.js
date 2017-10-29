$(document).ready( function() {
  $('.parallax').parallax();
  $('.button-collapse').sideNav();
});

/*
  ***
  lazy loading images
    img with data-src attribute will get lazy loaded
    the src for these images are set after page load
*/

[].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
	img.setAttribute('src', img.getAttribute('data-src'));
	img.onload = function() {
		img.removeAttribute('data-src');
	};
});
