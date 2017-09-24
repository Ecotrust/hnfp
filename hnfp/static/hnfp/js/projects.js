$(document).ready(function() {
  $('#new-project-btn').click(function(event) {
    landuseProject.initNew();
  });
});

$newProjectWrap = $('#new-project');
$projectForm = $( '#project-form' );

var landuseProject = {
  startNew: function() {
    $('#stepone').removeClass('visible');
    $('#steptwo').addClass('visible');
    $('#use-my-location').click(function() {
      findLocation();
      landuseProject.stepTwo();
    });
    $('#choose-from-map').click(function() {
      drawLocation();
      landuseProject.stepTwo();
    });
  },
  stepTwo: function() {
    $('#steptwo').removeClass('visible');
    $('#stepthree').addClass('visible');
    $('#loc-correct').click(function() {
      landuseProject.setInputLoc();
      let hide = '#stepthree';
      landuseProject.showStepFour(hide);
    });
  },
  showStepFour: function(step) {
    $(step).removeClass('visible');
    $('#stepfour').addClass('visible');
  },
  backStepThree: function() {
    var loc = getLocationPoint();
    $('#stepchangeloc').addClass('visible');
    $('#stepfour').removeClass('visible');
    $('#loc-change').click(function() {
      landuseProject.setInputLoc();
      let hide = '#stepchangeloc';
      landuseProject.showStepFour(hide);
    });
  },
  locOkay: function() {
    let hide = '#stepchangeloc';
    landuseProject.showStepFour(hide);
  },
  setInputLoc: function() {
    $('#observation_location').val(getLocationPoint());
  },
  close: function() {
    $newProjectWrap.find('form').html('');
  },
  showSpinner: function() {
    $('.preloader-wrapper').addClass('active');
  },
  hideSpinner: function() {
    $('.preloader-wrapper').removeClass('active');
  },
  initNew: function() {
    $newProjectWrap
    $newProjectWrap.toggleClass('visible');
    if (!$newProjectWrap.hasClass('visible')) {
      $projectForm.html('');
      return;
    }
    return $.ajax({
        url: '/observation/new/',
        success: function(data) {
            $projectForm.html(data);
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
      $projectForm.submit(function(e) {
        e.preventDefault();
        landuseProject.create(e.target);
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
        addToMap(data);
        landuseProject.close();
        landuseProject.showAddObservationBtn(true);
        $projectForm.html('');
      },
      error: function (error) {
        $projectForm.prepend(error);
      }
    });
  }
};
