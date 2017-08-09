$(document).ready(function() {
  $('.collapsible').collapsible();
  $('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'Okay', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: true, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
  });

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

    });
  },
  addNew: function(el) {
    return $.ajax({
      url: 'hnfp/new_observation',
    }).done(function(data) {
      $( '#new-observation' ).html(data);
    });
  }
};
