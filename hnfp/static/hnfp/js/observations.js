$(document).ready(function() {
  $('select').material_select();
  $('.collapsible').collapsible();
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 1 // Creates a dropdown of 15 years to control year
  });
  $('#add-observation-btn').click( function(e) {
    e.preventDefault();
    observations.addNew();
  })
});

var observations = {
    init: function() {

    },
    addNew: function() {
      $.ajax({
        url: 'hnfp/new_observation',
      }).done(function(data) {
        $( '#new-observation' ).html(data);
      });
    },
    icons: {
      'bear': {
        'name': 'bear',
        'icon': 'hnfp/img/icons/i_bear.svg',
        'id': 'bear',
        'databind': 'bear'
      },
      'deer': {
        'name': 'deer',
        'icon': 'hnfp/img/icons/i_bear.svg',
        'id': 'bear',
        'databind': 'bear'
      },
      'fungi': {
        'name': 'bear',
        'icon': 'hnfp/img/icons/i_bear.svg',
        'id': 'bear',
        'databind': 'bear'
      }
    }
};
