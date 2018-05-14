$(document).ready( function() {

    $('.collapsible').collapsible({
        accordion: false, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    $('.collapsible_create_account').collapsible({
        accordion: false,
    });

    $('.survey-actions .btn').on('click', function(event) {
        event.preventDefault();
        $parents = $(this).parentsUntil('ul');
        $parent = $parents[$parents.length - 1];
        var stepClass = $parent.classList.item(0);
        var i = stepClass.indexOf('step');
        var step = stepClass.slice(i + 4);
        var next = parseInt(step);
        if (event.target.classList.contains('next-step')) {
            next = next - 1;
            $('.collapsible').collapsible('close', next);
        } else if (event.target.classList.contains('previous-step')) {
            next = next - 2;
            $('.collapsible').collapsible('open', next);
        }
    });

    initMap();

    $('#btn-register').on('click', function(event) {
        event.preventDefault();
        var regForm = document.getElementById('register-form');
        if (!regForm.checkValidity()) {
            regForm.reportValidity();
        } else {
            var formData = new FormData(regForm);
            formData['X-CSRFTOKEN'] = csrftoken;
            $.ajax({
                url : '/registering/',
                method: 'POST',
                data : formData,
                contentType: false,
                processData: false,
                success: function(response) {
                    $('.collapsible_create_account').collapsible('close', 0);
                    $('.registration-response').html('<h1 style="background: rgba(0,0,0,0.8); color:#fff; padding: 10px;"><strong>You are now a steward!</strong><br /><br />Increase your impact by completing the survey.</strong></p>');
                    console.log('%csuccessly registered: %o', 'color:green;', response);
                    Materialize.toast('You are now a steward! Increase your impact by completing the survey.', 4000, 'top');
                    setTimeout(function() {
                        document.location = '/survey/';
                    }, 4000)
                },
                error: function(response) {
                    $('.registration-response').html(`<p style="background: rgba(0,0,0,0.8); color:#fff; padding: 10px;"><strong>There was an error with registration. You may already have an account. <a href="/login/">Sign in</a> to your account.</strong></p>`);
                }
            })
        }
    });

    $('#submit-form').on('click', function(event) {
        event.preventDefault();
        var surveyForm = document.getElementById('survey-form');
        var formData = new FormData(surveyForm);
        $.ajax({
            url: '/save_survey/',
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                window.location.pathname = '/registered/';
                console.log('%csuccessly submitted survey: %o', 'color:green;', response);
            },
            error: function(response) {
                window.location.pathname = '/registered/';
                console.log('%cerror with survey submission: %o', 'color:red;', response);
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
