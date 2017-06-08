$('.modal').modal({
  dismissible: true, // Modal can be dismissed by clicking outside of the modal
  opacity: .8, // Opacity of modal background
  inDuration: 300, // Transition in duration
  outDuration: 200, // Transition out duration
  startingTop: '4%', // Starting top style attribute
  endingTop: '10%', // Ending top style attribute
  ready: function(modal, trigger) {
    console.log(modal, trigger);
  },
  complete: function() {} // Callback for Modal close
});

$(document).ready( function() {
  $('.parallax').parallax();
  $('.button-collapse').sideNav();
  $('.slider').slider({
    'indicators': false
  });
  // initial pause slider
  $('.slider').slider('pause');
});
