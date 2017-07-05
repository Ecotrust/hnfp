$(document).ready( function() {
  $('.stepper').activateStepper();
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
    success: function() {
      console.log('success');
    },
    error: function() {
      console.log('error');
    }
  }).done( function(res) {
    console.log(res);
  });
});

$('#submit-form').on( 'click', function(e) {
  this.form.submit();
});
