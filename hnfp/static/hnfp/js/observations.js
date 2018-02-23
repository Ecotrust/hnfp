$(document).ready(function() {
  $('.collapsible').collapsible();
  $('#add-observation-btn').click(function(event) {
    observations.initNew();
  });
  let trackCheckbox = document.getElementById('track');
  if (trackCheckbox !== null) {
    trackCheckbox.addEventListener('change', function() {
      if (this.checked) {
        observations.startTracking();
      } else {
        observations.stopTracking();
      }
    });
  }
});

$newObservationWrapper = $('#new-observation');
$drawingForm = $( '#drawing-form' );

var observations = {
  stepTwo: function() {
    $('#steptwo').removeClass('visible');
    $('#stepthree').addClass('visible');
    $('#loc-correct').click(function() {
      observations.setInputLoc();
      let hide = '#stepthree';
      observations.showStepFour(hide);
    });
  },
  showStepFour: function(step) {
    $(step).removeClass('visible');
    $('#stepfour').addClass('visible');
    $('select').material_select();
  },
  backStepThree: function() {
    var loc = getLocationPoint();
    $('#stepchangeloc').addClass('visible');
    $('#stepfour').removeClass('visible');
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
      });
      $('#steptwo').addClass('visible');
      $('#use-my-location').click(function() {
        findLocation();
        observations.stepTwo();
        observationMap.styleLocation();
      });
      $('#choose-from-map').click(function() {
        drawLocation();
        observations.stepTwo();
      })
    });
  },
  create: function(form) {
    $form = $(form).serialize();
    if (navigator.onLine) {
      return $.ajax({
        type: 'POST',
        url: '/observation/create/',
        data: $form,
        success: function(data) {
          let newData = data.length - 1;
          addObservationToMap(data[newData]);
          observations.close();
          $drawingForm.html('');
        },
        error: function (error) {
          $drawingForm.prepend(error);
        }
      });
    } else {
      // remove the form and let user know they are offline
      observations.close();
      $drawingForm.html('');
      $drawingForm.prepend(`<p>You are offline.</p><p>Don't worry your observation is safe and will be automatically synced with your account when your back online.</p><p>Add as many observations as you would like. All will be synced.</p>`);
    }
  },
  startTracking: function() {
    trackLocation();
  },
  stopTracking: function() {
    stopTrackingLocation();
  }
};
