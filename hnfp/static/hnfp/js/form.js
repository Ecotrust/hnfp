$(document).ready( function() {
  $('.stepper').activateStepper({
    autoFocusInput: true,
  });

  $('.stepper').on('step5', function() {
    initMap();
  });
});

$('#btn-register').on( 'click', function() {
  var regForm = document.getElementById('register-form'),
      formData = new FormData( regForm );
  $.ajax({
    url : '/registering/',
    method: 'POST',
    data : formData,
    contentType: false,
    processData: false,
    success: function(data) {
      console.log('success');
    },
    error: function() {
      console.log('return error, but account may have been created');
    }
  }).done( function(res) {
    // console.log(res);
  });
});

$('#submit-form').on( 'click', function(e) {
  e.preventDefault();
  window.location.pathname = '/registered/';
});
