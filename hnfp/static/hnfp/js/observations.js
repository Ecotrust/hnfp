$(document).ready(function() {
  $('.collapsible').collapsible();
  $('#add-observation-btn').click(function() {
    observations.initNew();
  });
});

$newObservationWrapper = $('#new-observation');
$drawingForm = $( '#drawing-form' );

var observations = {
  startNew: function() {
    $('#stepone').removeClass('visible');
    $('#steptwo').addClass('visible');
    $('#use-my-location').click(function() {
      findLocation();
      observations.stepTwo();
    });
    $('#choose-from-map').click(function() {
      drawLocation();
      observations.stepTwo();
    })
  },
  stepTwo: function() {
    $('#steptwo').removeClass('visible');
    $('#stepthree').addClass('visible');
    $newObservationWrapper.addClass('short');
    $('#loc-correct').click(function() {
      observations.setInputLoc();
      let hide = '#stepthree';
      observations.showStepFour(hide);
    });
  },
  showStepFour: function(step) {
    $(step).removeClass('visible');
    $('#stepfour').addClass('visible');
    $newObservationWrapper.removeClass('short');
    $newObservationWrapper.addClass('tall');
  },
  backStepThree: function() {
    var loc = getLocationPoint();
    $('#stepchangeloc').addClass('visible');
    $('#stepfour').removeClass('visible');
    $newObservationWrapper.addClass('short');
    $newObservationWrapper.removeClass('tall');
    $('#loc-change').click(function() {
      observations.setInputLoc();
      let hide = '#stepchangeloc';
      observations.showStepFour(hide);
    });
  },
  locOkay: function() {
    let hide = '#stepchangeloc';
    observations.showStepFour(hide);
  },
  setInputLoc: function() {
    $('#observation_location').val(getLocationPoint());
  },
  close: function() {
    $newObservationWrapper.find('form').html('');
    $newObservationWrapper.removeClass('visible tall');
  },
  showSpinner: function() {
    $('.preloader-wrapper').addClass('active');
  },
  hideSpinner: function() {
    $('.preloader-wrapper').removeClass('active');
  },
  initNew: function() {
    $newObservationWrapper
    $newObservationWrapper.toggleClass('visible');
    if (!$newObservationWrapper.hasClass('visible')) {
      $drawingForm.html('');
      return;
    }
    return $.ajax({
        url: '/observation/new/',
        success: function(data) {
            $drawingForm.html(data);
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
      $drawingForm.submit(function(e) {
        e.preventDefault();
        observations.create(e.target);
      })
    });
  },
  create: function(form) {
    $form = $(form).serialize();
    console.log($form);
    return $.ajax({
      type: 'POST',
      url: '/observation/create/',
      data: $form,
      success: function(data) {
        addToMap(data);
        observations.close();
        $drawingForm.html('');
      },
      error: function (error) {
        $drawingForm.prepend(error);
      }
    });
  }
};
