from django.shortcuts import render, redirect, HttpResponseRedirect
# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.urls import reverse_lazy
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth.models import User
import json
from django.conf import settings
# Accouts
from accounts.actions import apply_user_permissions
from accounts.forms import LogInForm, SignUpForm
# survey, forum, jobs, alerts, observation, landuse
from hnfp.models import Question, Survey, Category, SurveyResults, Post, JobOpportunity, Alert, Observation, LandUseProject, ProjectResourceImpact, ImpactType, Resource, ShareObservationWithManager
from hnfp.forms import ResponseForm
# features and shapes
from django.contrib.gis.geos import Point, Polygon, MultiPolygon, GEOSGeometry
from django.views.generic.edit import UpdateView, DeleteView

################################################
###                 HELPERS                    ###
################################################
def get_json_error_response(error_msg="Error", status_code=500, context={}):
    context['success'] = False
    context['error_msg'] = error_msg
    response = JsonResponse(context)
    response.status_code = status_code
    return response

def is_in_array(item, array):
    if item in array:
        value = array[item]
    else:
        value = ''
    return value

def accounts_context():
    context = {
        'form': LogInForm(),
        'login_title': 'Login',
        'login_intro': 'Access your account',
        'registration_form': SignUpForm(),
        'registration_title': ' ', # space is needed to hide the defualt and insert a &nbsp; space
        'forgot_password_link': 'Forgot Password?',
        'register_link': ' ', # space is needed to hide the defualt and insert a &nbsp; space
        'help_link': ' ', # space is needed to hide the defualt and insert a &nbsp; space
    }
    return context

################################################
###                 VIEWS                    ###
################################################
def index(request):
    template = loader.get_template('hnfp/index.html')
    context = accounts_context()
    context['title'] = 'HNFP'
    return HttpResponse(template.render(context, request))

def home(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect('/dashboard/')
    template = loader.get_template('hnfp/home.html')
    context = {
        'page': 'home',
        'tagline': 'community + environment + economy',
        'cta':'Become a Steward',
    }
    return HttpResponse(template.render(context, request))

def registering(request):
    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        password = request.POST['password']
        phone = request.POST['phone']
        username = email

        new_user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
        )

        if not User.objects.filter(username=username).exists():

            user, created = User.objects.get_or_create(username=username)
            if not created:
                return render(request, 'dashboard.html')

            user.is_active = True
            user.set_password(password)
            user.email = email
            user.save()
            apply_user_permissions(user)

            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    auth_login(request, user)
                    return HttpResponse({}, content_type='application/x-javascript', status=200)
    else:
        template = loader.get_template('hnfp/land_use_survey.html')
        context = {
            'page': 'survey',
        }
        return HttpResponse(template.render(context, request))

def survey(request):
    template = loader.get_template('hnfp/land_use_survey.html')

    if Survey.objects.all():
        survey = Survey.objects.order_by('id')[0]
    else:
        survey = 'not yet ready'

    form = ResponseForm(survey=survey)

    context = {
        'page': 'survey',
        'response_form': form,
        'survey': survey,
        'registration_form': SignUpForm(),
    }
    return HttpResponse(template.render(context, request))

def save_survey(request):
    context = {}
    if request.method == 'POST':
        forest_use_hunt_deer = is_in_array('forest_use_hunt_deer', request.POST)
        forest_use_gather_herbs = is_in_array('forest_use_gather_herbs', request.POST)
        forest_use_fish = is_in_array('forest_use_fish', request.POST)
        forest_use_collect_berries = is_in_array('forest_use_collect_berries', request.POST)
        forest_use_gather_mushrooms = is_in_array('forest_use_gather_mushrooms', request.POST)
        forest_use_collect_firewood = is_in_array('forest_use_collect_firewood', request.POST)
        forest_use_other_activities = is_in_array('forest_use_other_activities', request.POST)
        forest_use_other = is_in_array('forest_use_other', request.POST)
        rank_hunt = is_in_array('rank_hunt', request.POST)
        rank_gather_herbs = is_in_array('rank_gather_herbs', request.POST)
        rank_fish = is_in_array('rank_fish', request.POST)
        rank_collect_berries = is_in_array('rank_collect_berries', request.POST)
        rank_gather_mushrooms = is_in_array('rank_gather_mushrooms', request.POST)
        rank_collect_firewood = is_in_array('rank_collect_firewood', request.POST)
        rank_other = is_in_array('rank_other', request.POST)
        gender = is_in_array('gender', request.POST)
        employment_forest_dependent = is_in_array('employment_forest_dependent', request.POST)
        occupation = is_in_array('occupation', request.POST)
        regiontally = is_in_array('regional-totals', request.POST)

        try:
            newRespose = SurveyResults.objects.create(
                forest_use_hunt_deer=forest_use_hunt_deer,
                forest_use_gather_herbs=forest_use_gather_herbs,
                forest_use_fish=forest_use_fish,
                forest_use_collect_berries=forest_use_collect_berries,
                forest_use_gather_mushrooms=forest_use_gather_mushrooms,
                forest_use_collect_firewood=forest_use_collect_firewood,
                forest_use_other_activities=forest_use_other_activities,
                forest_use_other=forest_use_other,
                rank_hunt=rank_hunt,
                rank_gather_herbs=rank_gather_herbs,
                rank_fish=rank_fish,
                rank_collect_berries=rank_collect_berries,
                rank_gather_mushrooms=rank_gather_mushrooms,
                rank_collect_firewood=rank_collect_firewood,
                rank_other=rank_other,
                gender=gender,
                employment_forest_dependent=employment_forest_dependent,
                occupation=occupation,
                regiontally=regiontally,
            );
        except:
            return get_json_error_response('Survey Result Failed.', 500)

        context['success'] = True
        return JsonResponse(context)

def registered(request):
    template = loader.get_template('hnfp/welcome_steward.html')
    context = {
        'title': 'Congratulations!',
        'subtitle': 'You are now a Hoonah Steward',
    }
    return HttpResponse(template.render(context, request))

def login(request):
    template = loader.get_template('hnfp/login.html')
    context = {
        'form': LogInForm(),
        'login_title': 'Login',
        'login_intro': 'Access your account',
        'registration_form': SignUpForm(),
        'registration_title': ' ', # space is needed to hide the defualt and insert a &nbsp; space
        'forgot_password_link': 'Forgot Password?',
        'register_link': ' ', # space is needed to hide the defualt and insert a &nbsp; space
        'help_link': ' ', # space is needed to hide the defualt and insert a &nbsp; space
        # 'next': 'dashboard',
    }
    return HttpResponse(template.render(context, request))


# def myaccount(request):
#     if request.user.is_anonymous(): # not logged in
#         return login(request)
#     template = loader.get_template('hnfp/account.html')
#     context = {
#         'title': 'Hoonah Steward Profile',
#     }
#     return HttpResponse(template.render(context, request))

def dashboard(request):
    template = loader.get_template('hnfp/dashboard.html')
    posts = Post.objects.filter(is_event=False)
    events = Post.objects.filter(is_event=True)
    user_alerts = [x.to_dict() for x in Alert.objects.filter(alert_username=request.user.username)]
    all_alerts = [x.to_dict() for x in Alert.objects.filter(alert_confirmed=True)]
    recent_alerts = [x.to_dict() for x in Alert.objects.filter(alert_confirmed=True).order_by('-alert_updated')]
    jobs = JobOpportunity.objects.order_by('posted')[:5]
    for job in jobs:
        try:
            if job.is_html:
                job.job_post = job.html_content
            else:
                job.job_post = job.description
        except Exception as e:
            job.job_post = "<h3>No Jobs Posted</h3>"
    context = {
        'title': '',
        'posts': posts,
        'events': events,
        'user_alerts': json.dumps(user_alerts),
        'alerts': json.dumps(all_alerts),
        'recent_alerts': json.dumps(recent_alerts),
        'jobs': jobs,
    }
    return HttpResponse(template.render(context, request))

def alert(request):
    template = loader.get_template('hnfp/alert.html')
    user_alerts = [x.to_dict() for x in Alert.objects.filter(alert_username=request.user.username)]
    all_alerts = [x.to_dict() for x in Alert.objects.filter(alert_confirmed=True)]
    recent_alerts = [x.to_dict() for x in Alert.objects.filter(alert_confirmed=True).order_by('-alert_updated')]
    context = {
        'title': 'Alerts',
        'user_alerts': json.dumps(user_alerts),
        'all_alerts': json.dumps(all_alerts),
        'recent_alerts': json.dumps(recent_alerts),
    }
    return HttpResponse(template.render(context, request))

def new_alert(request):
    template = loader.get_template('hnfp/new_alert.html')
    context = {
        'category': ''
    }
    return HttpResponse(template.render(context, request))

def alert_detail(request, pk):
    alert = [x.to_dict() for x in Alert.objects.filter(id=pk)]
    return HttpResponse("You're looking at alert %s." % pk)

def observation_detail(request, pk):
    ob = [x.to_dict() for x in Observation.objects.filter(id=pk)]
    return JsonResponse(ob, safe=False)

def alert_create(request):
    if request.method == 'POST':
        loc = request.POST['alert_location']
        lp = loc.split(',')
        alert_location = Point([float(lp[0]),float(lp[1])])
        alert_type = request.POST['alert_type']
        alert_comment = request.POST['alert_comment']
        alert_time = request.POST['alert_time']
        alert_date = request.POST['alert_date']
        alert_photo = None
        for file in request.FILES.getlist('file'):
            print(file)
            alert_photo = file

        new_a = Alert(
            alert_location=alert_location,
            alert_type=alert_type,
            alert_comment=alert_comment,
            alert_time=alert_time,
            alert_date=alert_date,
            alert_photo=alert_photo,
            alert_username=request.user.username
        );
        new_a.save()
        all_alerts = [x.to_dict() for x in Alert.objects.all()]
        # send email to admin
        from django.core.mail import send_mail
        send_mail(
            'New Report - Hoonah Stewards',
            'A new submission on https://hoonahstewards.net needs review. An admin needs to review this submission https://hoonahstewards.net/admin and act upon it.',
            'hostmaster@hoonahstewards.net',
            ['dpollard@ecotrust.org'],
            fail_silently=False,
        )
        return JsonResponse(all_alerts, safe=False)

class AlertUpdate(UpdateView):
    model = Alert
    fields = ['alert_type', 'alert_comment', 'alert_time', 'alert_date', 'alert_photo', 'alert_location']
    success_url = reverse_lazy('alert')
    template_name_suffix = '_update'

class AlertDelete(DeleteView):
    model = Alert
    success_url = reverse_lazy('alert')
    template_name_suffix = '_confirm_delete'

def observation(request):
    template = loader.get_template('hnfp/observation.html')
    all_observation = [x.to_dict() for x in Observation.objects.filter(observer_username=request.user.username)]
    share = ShareObservationWithManager.objects.filter(user=request.user.pk)
    context = {
        'title': 'My Hunt, Gather, Observe Map',
        'year': '2017',
        'user_observations': json.dumps(all_observation),
        'share': share,
    }
    return HttpResponse(template.render(context, request))

def new_observation(request):
    template = loader.get_template('hnfp/new_observation.html')
    obs_cats = Observation.get_categories()
    context = {
        'obs_cats': obs_cats,
    }
    return HttpResponse(template.render(context, request))

def observation_detail(request, pk):
    ob = [x.to_dict() for x in Observation.objects.filter(id=pk)]
    return JsonResponse(ob, safe=False)

def observation_create(request):
    if request.method == 'POST':
        loc = request.POST['observation_location']
        lp = loc.split(',')
        observation_location = Point([float(lp[0]),float(lp[1])])
        observation_category = request.POST['observation_category']
        observation_type = request.POST['observation_type']
        observation_tally = request.POST['observation_tally']
        comments = request.POST['comments']
        observation_time = request.POST['observation_time']
        observation_date = request.POST['observation_date']
        observation_photo = None
        for file in request.FILES.getlist('file'):
            observation_photo = file

        new_obs = Observation(
            observation_location=observation_location,
            category=observation_category,
            observation_type=observation_type,
            observation_date=observation_date,
            observation_time=observation_time,
            observation_tally=observation_tally,
            comments=comments,
            observation_photo=observation_photo,
            observer_username=request.user.username,
        );
        new_obs.save()
        all_observation = [x.to_dict() for x in Observation.objects.filter(observer_username=request.user.username)]
        return JsonResponse(all_observation, safe=False)

class ObservationUpdate(UpdateView):
    model = Observation
    fields = ['category', 'customcategory', 'observation_type', 'observation_date', 'observation_time', 'observation_tally', 'observation_location', 'comments', 'observation_photo']
    success_url = reverse_lazy('observation')
    template_name_suffix = '_update'

class ObservationDelete(DeleteView):
    model = Observation
    success_url = reverse_lazy('observation')
    template_name_suffix = '_confirm_delete'

def job(request):
    template = loader.get_template('hnfp/job.html')
    jobs = JobOpportunity.objects.order_by('posted')
    for job in jobs:
        try:
            if job.is_html:
                job.job_post = job.html_content
            else:
                job.job_post = job.description
        except Exception as e:
            job.job_post = "<h3>No Jobs Posted</h3>"
    context = {
        'title': 'Jobs',
    }
    context['jobs'] = jobs
    return HttpResponse(template.render(context, request))

def job_detail(request, job_id):
    return HttpResponse("You're looking at job %s." % job_id)

### LAND USE MAP
def esriIframe(request):
    template = loader.get_template('hnfp/landuse/landuse_projects.html')
    context = {}
    return HttpResponse(template.render(context, request))

def landuse(request):
    template = loader.get_template('hnfp/landuse/page.html')
    # get all alerts
    all_alerts = [x.to_dict() for x in Alert.objects.all()]
    # get all observations
    all_observation = [x.to_dict() for x in Observation.objects.all()]
    # get all projects for user and public published
    all_user_projects = [x.to_dict() for x in LandUseProject.objects.filter(username=request.user.username)]
    all_shared_projects = [x.to_dict() for x in LandUseProject.objects.filter(share_with_land_managers=True)]
    all_public_projects = [x.to_dict() for x in LandUseProject.objects.filter(published=True)]
    context = {
        'title': 'Land Use Map',
        'alerts': json.dumps(all_alerts),
        'user_observations': json.dumps(all_observation),
        'all_projects': json.dumps(all_user_projects),
        'all_shared_projects': json.dumps(all_shared_projects),
        'all_public_projects': json.dumps(all_public_projects),
    }
    return HttpResponse(template.render(context, request))

def new_project(request):
    template = loader.get_template('hnfp/landuse/new_project.html')
    resources = Resource.get_resources()
    impactTypes = ImpactType.get_impact_types()
    context = {
        'resources': resources,
        'impactTypes': impactTypes,
    }
    return HttpResponse(template.render(context, request))

def project_create(request):
    if request.method == 'POST':
        area = request.POST['area']
        areaPoly = GEOSGeometry(area)
        name = request.POST['name']
        category = request.POST['category']
        summary = request.POST['summary']
        start_date = request.POST['start_date']
        completion_date = request.POST['completion_date']
        action = request.POST['action']
        dollar_costs = request.POST['dollar_costs']
        emdollars = request.POST['emdollars']

        #resource = request.POST['resource']
        #impact_type = request.POST['impact_type']

        new_proj = LandUseProject(
            area=areaPoly,
            name=name,
            category=category,
            summary=summary,
            start_date=start_date,
            completion_date=completion_date,
            actions=action,
            dollar_costs=dollar_costs,
            emdollars=emdollars,
            username=request.user.username
        )

        new_proj.save()
        all_projects = [x.to_dict() for x in LandUseProject.objects.filter(username=request.user.username)]
        return JsonResponse(all_projects, safe=False)

def landuse_detail(request, pk):
    lup = [x.to_dict() for x in LandUseProject.objects.filter(id=pk)]
    return JsonResponse(lup, safe=False)

class LanduseUpdate(UpdateView):
    model = LandUseProject
    fields = ['name', 'category', 'summary', 'start_date', 'completion_date', 'actions', 'dollar_costs', 'emdollars', 'area']
    success_url = reverse_lazy('landuse')
    template_name_suffix = '_update'

class LanduseDelete(DeleteView):
    model = LandUseProject
    success_url = reverse_lazy('landuse')
    template_name_suffix = '_confirm_delete'

### offline
# service worker
def sw(request):
    from marineplanner.settings import BASE_DIR
    import os
    service_worker = os.path.join(BASE_DIR, '..', 'apps', 'hnfp', 'hnfp', 'static', 'sw.min.js')
    jsfile = open(service_worker, 'rb')
    return HttpResponse(jsfile, content_type='application/javascript', status=200)

    # from marineplanner.settings import BASE_DIR
    # import os
    # service_worker = os.path.join(BASE_DIR, '..', 'apps', 'hnfp', 'hnfp', 'templates', 'sw.js')
    # data = open(service_worker, 'rb')
    # return HttpResponse(data, content_type='application/javascript', status=200)

# app manifest
def manifest(request, js):
    from marineplanner.settings import BASE_DIR
    import os
    manifest_file = os.path.join(BASE_DIR, '..', 'apps', 'hnfp', 'hnfp', 'templates', 'manifest.json')
    # manifest_file = '/usr/local/apps/marineplanner-core/apps/hnfp/hnfp/templates/manifest.json'
    data = open(manifest_file, 'rb')
    return HttpResponse(data, content_type='application/json', status=200)
