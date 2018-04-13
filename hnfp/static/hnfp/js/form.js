$(document).ready( function() {

    $('.collapsible').collapsible({
        accordion: false, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        onOpen: function(el) {
            console.log(el);
        }, // Callback for Collapsible open
        onClose: function(el) {
            console.log(el);
        } // Callback for Collapsible close
    });

    $('.collapsible_create_account').collapsible({
        accordion: false,
    });

    $('.survey-actions .btn').on('click', function(event) {
        if (event.target.classList.contains('next-step')) {
            $parent = $(this).parentsUntil('ul');
            console.log($parent[$parent.length - 1]);
        } else {
            // console.log($(event).parents());
        }
        $('.collapsible').collapsible('open', 0);
    });

    initMap();

    $('#btn-register').on( 'click', function(event) {
        event.preventDefault();
        var regForm = document.getElementById('register-form'),
        formData = new FormData( regForm );
        $.ajax({
            url : '/registering/',
            method: 'POST',
            data : formData,
            contentType: false,
            processData: false,
            success: function(response) {
                $('.collapsible_create_account').collapsible('close', 0);
                $('.collapsible').collapsible('open', 0);
                console.log(response);
            },
            error: function(response) {
                console.log(response);
            }
        })
    });

    $('#survey-form').submit(function(event) {
        event.preventDefault();
        $regform = $(event.target).serialize();
        $.ajax({
            type: 'POST',
            url: '/save_survey/',
            data: $regform,
            success: function(response) {
                console.log(response);
                // window.location.pathname = '/registered/';
            },
            error: function(response) {
                console.log(response);
            }
        });
    });
});

var survey = {
    regionTallyTotal: [],
    setTallyTotal: function() {
        $('#regional-totals').val(JSON.stringify(survey.regionTallyTotal));
    },
    setRegionValue: function(regionProps, element) {
        $('#region-name').text(regionProps.NAME);
        $('#region').val(regionProps.NAME);
        $('#regiontally').val('');
    },
    addRegionToTotals: function() {
        let $region = $('#region').val(),
        $tally = $('#regiontally').val(),
        $totals = $('.region-totals');

        for (let r of survey.regionTallyTotal) {
            if (r['region'] == $region) {
                r['total'] = $tally;
                // set tally total
                survey.setTallyTotal();
                return;
            }
        }

        let $newRegion = {
            'region': $region,
            'total': $tally
        }
        survey.regionTallyTotal.push($newRegion);
        // set tally total
        survey.setTallyTotal();
    },
    watchRegionTally: function() {
        $('#regiontally').blur(function() {
            survey.addRegionToTotals();
        });
    }
}
