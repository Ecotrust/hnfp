$(document).ready(function() {
  $('#new-project-btn').click(function(event) {
    landuseProject.initNew();
  });
  $('#checkbox_alerts').change(function(event) {
    if (event.target.checked === true) {
      landuseMap.showAlerts();
    } else {
      landuseMap.hideAlerts();
    }
  });
  $('#checkbox_observations').change(function(event) {
    if (event.target.checked === true) {
      landuseMap.showObservations();
    } else {
      landuseMap.hideObservations();
    }
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
    drawProjectArea();
    drawEndListener();
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
  addImpact: function() {
    $('.add-impact').click(function() {
      let $wrap = $('.impact-wrap'),
          $impactSections = $('.impact-wrap section');
      $('.impact-wrap section:first-of-type').clone().appendTo($wrap);
      $('select').material_select();
    });
  },
  setMinCompletionDate: function(min) {
    let completionMin = new Date(min),
        y = completionMin.getFullYear(),
        m = completionMin.getMonth(),
        d = completionMin.getDate();
    $('#completion_date').pickadate({
      selectMonths: true,
      selectYears: 100,
      selectMonths: true,
      min: new Date(parseInt(y),parseInt(m),parseInt(d)),
      closeOnSelect: true,
    });
  },
  initNew: function() {
    $newProjectWrap.toggleClass('visible');
    landuseMap.removePopup();
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
            landuseProject.addImpact();
            visibleProjectLayer(true);
            removeNewProjectSourceFeatures();
        },
        error: function (result) {
            //debugger;
        }
    }).done(function() {
      $('#start_date').pickadate({
        selectMonths: true,
        selectYears: 100,
        min: new Date(),
        today: 'Today',
        clear: 'Clear',
        close: 'Close',
        closeOnSelect: true, // Close upon selecting a date
        onSet: function(val) {
          if (val.select) {
            landuseProject.setMinCompletionDate(val.select);
          }
        },
      });
      $projectForm.submit(function(e) {
        e.preventDefault();
        convertProjToWKT();
        removeProjectInteractions();
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
        let newData = data.length - 1;
        addProjectToMap(data[newData]);
        visibleProjectLayer(false);
        landuseProject.close();
        $projectForm.html('');
      },
      error: function (error) {
        $projectForm.prepend(error);
      }
    });
  },
  addProjArea: function(data) {
    var beginSlice = data.indexOf('{"type":"MultiPolygon"'),
        endSlice = data.indexOf(',"properties"');
        sliceIt = data.slice(beginSlice, endSlice);
    $('#area').val(sliceIt);
  },
  addAreaToForm: function(projArea) {
    $('#area').val(projArea);
  }
};
