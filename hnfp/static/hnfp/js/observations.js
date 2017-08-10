$(document).ready(function() {
  $('.collapsible').collapsible();
});

var observations = {
  initNew: function(el) {
    return $.ajax({
        url: '/observation/new/',
        success: function(data) {
            $( '#drawing-form' ).html(data);
        },
        error: function (result) {
            //debugger;
        }
    }).done(function() {
      $('.timepicker').pickatime({
        default: 'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        donetext: 'Okay', // text for done-button
        cleartext: 'Clear', // text for clear-button
        autoclose: false, // automatic close timepicker
        aftershow: function(){} //Function for after opening timepicker
      });
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 5,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
      });
      $('#drawing-form').submit(function(e) {
        e.preventDefault();
        observations.create(e.target);
      })
    });
  },
  create: function(form) {
    $form = $(form).serialize();
    return $.ajax({
      type: 'POST',
      url: '/observation/create/',
      data: $form,
      success: function(data) {
        $('#drawing-form').html('');
      },
      error: function (erro) {
        $('#drawing-form').prepend(error);
      }
    });
  }
};
