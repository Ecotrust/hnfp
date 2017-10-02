$('.stepper').activateStepper({});
$(document).ready( function() {

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

  $('#register-form').submit(function(event) {
    event.preventDefault();
    $regform = $(event.target).serialize();
    console.log($regform);
    $.ajax({
      type: 'POST',
      url: '/save_survey/',
      data: $regform,
      success: function(data) {
        console.log('no');
        window.location.pathname = '/registered/';
      },
      error: function(error,err) {
        console.log(err);
        window.location.pathname = '/registered/';
      }
    })
    .done(function(d) {
      console.log(d);
    })
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
