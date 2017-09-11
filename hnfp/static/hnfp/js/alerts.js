$(document).ready(function() {
  $('#new-alert-btn').click(function() {
    alerts.initNew();
  });
  if (typeof recent_alerts !== 'undefined') {
    alerts.recentAlerts(recent_alerts);
  }
});

$newAlertsWrap = $('#map-panel');
$recentAlertsWrap = $('.recent-alerts')
$alertForm = $( '#alert-form' );

var alerts = {
  recentAlerts: function(alerts) {
    for (let alert of alerts) {
      if (alert.alert_comment == null) {
        alert.alert_comment = '';
      }
      $recentAlertsWrap.append(`<div class="row">
        <div class="col s10 offset-s1">
          <article id="alert_${alert.alert_id}">
            <div class="hexagon">${alert.alert_id}</div>
            <h3>${alert.alert_type}</h3>
            <p><em>posted by ${alert.alert_username}<br />${alert.alert_date} ${alert.alert_time}</em></p>
            <p>${alert.alert_comment}</p>
          </article>
        </div>
      </div>`);
    }
  },
  scrollToAlert: function(alert_id) {
    var alert_div ='alert_' + alert_id;
    alert_div = alert_div.toString();
    var mapPanel = document.getElementById('map-panel');
    var pos = $('#map-panel').find('#' + alert_div).position();
    $('#map-panel').slideUp( 300 ).slideDown( 300 ).scrollTop(pos.top);
  },
  startNew: function() {
    $('#stepone').removeClass('visible');
    $('#steptwo').addClass('visible');
    showLocation();
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
        addAlertsToMap(data);
        hideLocation();
        alerts.close();
        $alertForm.html('');
        Materialize.toast('Alert Report Submission Successful', 4000);
      },
      error: function (error) {
        $alertForm.prepend(error);
        hideLocation();
        Materialize.toast('Alert Report Submission Failed. Please Ensure You Have Internet Access & Try Again.', 6000);
      }
    });
  }
};
