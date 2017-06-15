$(document).ready( function() {
  $('.stepper').activateStepper();
  var formAction = function formSubmission() {
    var action = document.querySelector('form');
    action.action = '/registered';
  };
});
