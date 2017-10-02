$(document).ready( function() {
  $('.stepper').activateStepper({
    autoFocusInput: true,
  });

  let step5Check = 0;
  $('.stepper').on('step5', function() {
    if (step5Check < 1) {
      initMap();
    }
    step5Check++;
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
      success: function(data) {
        console.log('success');
      },
      error: function(error) {
        console.log(error);
      }
    }).done( function(res) {
      // console.log(res);
    });
  });

  $('#submit-form').on( 'click', function(e) {
    e.preventDefault();
    let form = document.getElementById('register-form');
    let $form = $(form).serialize();
    $.ajax({
      type: 'POST',
      url: '/save_survey/',
      data: $form,
      success: function(data) {
        window.location.pathname = '/registered/';
      },
      error: function(error) {
        console.log(error);
        window.location.pathname = '/registered/';
      }
    }).done( function(res) {
      console.log(res);
    });
  });
});

var survey = {
  regionTallyTotal: [],
  setRegionValue: function(regionProps, element) {
    $('#region-name').text(regionProps.NAME);
    $('#region').val(regionProps.NAME);
    $('#regiontally').val('');
  },
  addRegionToTotals: function() {
      let $region = $('#region').val(),
          $tally = $('#regiontally').val(),
          $totals = $('.region-totals');
      if ($tally !== '') {
        let $newRegion = {
          'region': $region,
          'total': $tally
        }
        survey.regionTallyTotal.push($newRegion);
      }
  },
  watchRegionTally: function() {
    $('#regiontally').blur(function() {
      survey.addRegionToTotals();
    });
  }
}
