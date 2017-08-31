$(document).ready(function() {
  $('.collapsible').collapsible();
  $('#new-alert-btn').click(function() {
    alerts.initNew();
  });
});

$newAlertsWrap = $('#map-panel');
$alertForm = $( '#alert-form' );

var alerts = {
  startNew: function() {
    $('#stepone').removeClass('visible');
    $('#steptwo').addClass('visible');
    $('#use-my-location').click(function() {
      findLocation();
      alerts.stepTwo();
    });
    $('#choose-from-map').click(function() {
      drawLocation();
      alerts.stepTwo();
    })
  },
  stepTwo: function() {
    $('#steptwo').removeClass('visible');
    $('#stepthree').addClass('visible');
    $newAlertsWrap.addClass('short');
    $('#loc-correct').click(function() {
      alerts.setInputLoc();
      let hide = '#stepthree';
      alerts.showStepFour(hide);
    });
  },
  showStepFour: function(step) {
    $(step).removeClass('visible');
    $('#stepfour').addClass('visible');
    $newAlertsWrap.removeClass('short');
    $newAlertsWrap.addClass('tall');
  },
  backStepThree: function() {
    var loc = getLocationPoint();
    $('#stepchangeloc').addClass('visible');
    $('#stepfour').removeClass('visible');
    $newAlertsWrap.addClass('short');
    $newAlertsWrap.removeClass('tall');
    $('#loc-change').click(function() {
      alerts.setInputLoc();
      let hide = '#stepchangeloc';
      alerts.showStepFour(hide);
    });
  },
  locOkay: function() {
    let hide = '#stepchangeloc';
    alerts.showStepFour(hide);
  },
  setInputLoc: function() {
    $('#alert_location').val(getLocationPoint());
  },
  close: function() {
    $newAlertsWrap.find('form').html('');
    $newAlertsWrap.removeClass('visible tall');
  },
  showSpinner: function() {
    $('.preloader-wrapper').addClass('active');
  },
  hideSpinner: function() {
    $('.preloader-wrapper').removeClass('active');
  },
  initNew: function() {
    $newAlertsWrap
    $newAlertsWrap.toggleClass('visible');
    if (!$newAlertsWrap.hasClass('visible')) {
      $alertForm.html('');
      return;
    }
    return $.ajax({
        url: '/alert/new/',
        success: function(data) {
            $alertForm.html(data);
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
      $alertForm.submit(function(e) {
        e.preventDefault();
        alerts.create(e.target);
      })
    });
  },
  create: function(form) {
    $form = $(form).serialize();
    return $.ajax({
      type: 'POST',
      url: '/alert/create/',
      data: $form,
      success: function(data) {
        addToMap(data);
        alerts.close();
        $alertForm.html('');
      },
      error: function (error) {
        $alertForm.prepend(error);
      }
    });
  }
};
