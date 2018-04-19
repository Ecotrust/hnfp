
$(document).ready( function() {
  $('.parallax').parallax();
  $('.button-collapse').sideNav();
  $('.layer-switcher button').click(function(e) {
    if (e.target.classList.contains('showing')) {
      e.target.classList.remove('showing');
      $('.layer-switcher').removeClass('stick');
      $('.layer-switcher').removeClass('shown');
    } else {
      e.target.classList.add('showing');
      $('.layer-switcher').addClass('stick');
      layerSwitcher.panel.onmouseout = null;
    }
  });
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
