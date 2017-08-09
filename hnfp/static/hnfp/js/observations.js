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
        autoclose: true, // automatic close timepicker
        ampmclickable: true, // make AM PM clickable
        aftershow: function(){} //Function for after opening timepicker
      });
      $('#drawing-form').submit(function(e) {
        e.preventDefault();
        observations.addNew(e.target);
      })
    });
  },
  addNew: function(form) {
    console.log(form);
    return $.ajax({
      type: 'POST',
      url: '/observation/add/',
      data: $(form).serialize(),
      success: function(data) {
        console.log(data);
      },
      error: function (result) {
        //debugger;
      }
    })
  }
};
