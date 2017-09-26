$(document).ready(function() {
  $('#new-project-btn').click(function(event) {
    landuseProject.initNew();
  });
});

$newProjectWrap = $('#new-project');
$projectForm = $( '#project-form' );

var landuseProject = {
  stepOne: function() {
    $('.card').removeClass('visible');
    $('#stepone').addClass('visible');
    $('#stepone a').click(function(e) {
      e.preventDefault();
      let projCat = e.target.dataset.value;
      $('#category').val(projCat);
      landuseProject.stepTwo();
    });
  },
  stepTwo: function() {
    $('.card').removeClass('visible');
    $('#steptwo').addClass('visible');
  },
  stepThree: function() {
    $('.card').removeClass('visible');
    $('#stepthree').addClass('visible');
  },
  stepFour: function(step) {
    $('.card').removeClass('visible');
    $('#stepfour').addClass('visible');
  },
  stepFive: function() {
    $('.card').removeClass('visible');
    $('#stepfive').addClass('visible');
    // Draw area on map
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
    $newProjectWrap.toggleClass('visible');
    // check if visible has been taken away or added
    if (!$newProjectWrap.hasClass('visible')) {
      $projectForm.html('');
      return;
    }
    return $.ajax({
        url: '/landuse/new/',
        success: function(data) {
            $projectForm.html(data);
            landuseProject.stepOne();
            $('select').material_select();
        },
        error: function (result) {
            //debugger;
        }
    }).done(function() {
      $('.project_date').pickadate({
        selectMonths: true,
        selectYears: 100,
        min: new Date(2000,1,1),
        today: 'Today',
        clear: 'Clear',
        close: 'Close',
        closeOnSelect: true // Close upon selecting a date,
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
      url: '/landuse/create/',
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
