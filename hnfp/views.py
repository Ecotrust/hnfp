from django.shortcuts import render, get_object_or_404, redirect, HttpResponse, render_to_response, HttpResponseRedirect
from django.contrib.sessions.models import Session
from django.conf import settings
# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.template import loader, RequestContext
from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse_lazy
# from django.core.urlresolvers import reverse
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth import login as auth_login
# Accouts
from accounts.actions import apply_user_permissions
from accounts.forms import SignUpForm, LogInForm
from accounts import views
# survey, forum, jobs, alerts, observation, landuse
from hnfp.models import Question, Survey, Category, SurveyResults, Post, JobOpportunity, Alert, Observation, LandUseProject, ProjectResourceImpact, ImpactType, Resource
from hnfp.forms import ResponseForm, HoonahLogInForm
# features and shapes
from django.contrib.gis.geos import Point, Polygon, GEOSGeometry
import json

from django.views.generic.edit import UpdateView, DeleteView

### VIEWS ###
def index(request):
    template = loader.get_template('hnfp/index.html')
    context = {
        'title': 'HNFP',
    }
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
    uses_list = SurveyResults.get_forest_uses()

    if Survey.objects.all():
        survey = Survey.objects.order_by('id')[0]
    else:
        survey = 'not yet ready'

    form = ResponseForm(survey=survey)

    context = {
        'page': 'survey',
        'response_form': form,
        'survey': survey,
        'uses_list': uses_list,
    }
    return HttpResponse(template.render(context, request))

def save_survey(request):
    if request.method == 'POST':
        forest_use = request.POST['forest_use']
        rank_hunt = request.POST['rank_hunt']
        rank_gather_herbs = request.POST['rank_gather_herbs']
        rank_fish = request.POST['rank_fish']
        rank_collect_berries = request.POST['rank_collect_berries']
        rank_gather_mushrooms = request.POST['rank_gather_mushrooms']
        rank_collect_firewood = request.POST['rank_collect_firewood']
        gender = request.POST['gender']
        employment_forest_dependent = request.POST['employment_forest_dependent']
        occupation = request.POST['occupation']
        regiontally = request.POST['regional-totals']

        newRespose = SurveyResults(
            forest_use=forest_use,
            rank_hunt=rank_hunt,
            rank_gather_herbs=rank_gather_herbs,
            rank_fish=rank_fish,
            rank_collect_berries=rank_collect_berries,
            rank_gather_mushrooms=rank_gather_mushrooms,
            rank_collect_firewood=rank_collect_firewood,
            gender=gender,
            employment_forest_dependent=employment_forest_dependent,
            occupation=occupation,
            regiontally=regiontally,
        );
        newRespose.save()

        return HttpResponse(newRespose, content_type='application/x-javascript', status=200)

def registered(request):
    template = loader.get_template('hnfp/welcome_steward.html')
    context = {
        'title': 'Congratulations!',
        'subtitle': 'You are now a Hoonah Steward',
    }
    return HttpResponse(template.render(context, request))

def login(request):
    template = loader.get_template('hnfp/login.html')
    form = HoonahLogInForm()
    context = {
        'form': form,
        'next': '/dashboard/',
        'title': 'Log in',
    }
    return HttpResponse(template.render(context, request))

def myaccount(request):
    template = loader.get_template('hnfp/account.html')
    context = {
        'title': 'Profile',
    }
    return HttpResponse(template.render(context, request))

def dashboard(request):
    template = loader.get_template('hnfp/dashboard.html')
    posts = Post.objects.get_queryset()
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
        'alerts': json.dumps(get_all_alerts()),
        'recent_alerts': json.dumps(get_recent_alerts()),
    }
    context['jobs'] = jobs
    return HttpResponse(template.render(context, request))

def get_all_alerts():
    all_alerts = []
    get_alerts = Alert.objects.filter(alert_confirmed=True)
    for a in get_alerts:
        dic = a.to_dict()
        all_alerts.append(dic)
    return all_alerts

def get_recent_alerts():
    recent_alerts = []
    get_recent = Alert.objects.filter(alert_confirmed=True).order_by('-alert_updated')[:5]
    for a in get_recent:
        dic = a.to_dict()
        recent_alerts.append(dic)
    return recent_alerts

def alert(request):
    template = loader.get_template('hnfp/alert.html')
    all_alerts = []
    get_alerts = Alert.objects.all()
    for a in get_alerts:
        if a.alert_confirmed == True:
            dic = a.to_dict()
            all_alerts.append(dic)
    context = {
        'title': 'Alerts',
        'alerts': json.dumps(all_alerts),
        'recent_alerts': json.dumps(get_recent_alerts()),
    }
    return HttpResponse(template.render(context, request))

def new_alert(request):
    template = loader.get_template('hnfp/new_alert.html')
    context = {
        'category': ''
    }
    return HttpResponse(template.render(context, request))

def alert_detail(request, alert_id):
    return HttpResponse("You're looking at alert %s." % alert_id)

def alert_create(request):
    if request.method == 'POST':
        loc = request.POST['alert_location']
        lp = loc.split(',')
        alert_location = Point([float(lp[0]),float(lp[1])])
        alert_type = request.POST['alert_type']
        alert_comment = request.POST['alert_comment']
        alert_time = request.POST['alert_time']
        alert_date = request.POST['alert_date']

        new_a = Alert(
            alert_location=alert_location,
            alert_type=alert_type,
            alert_comment=alert_comment,
            alert_time=alert_time,
            alert_date=alert_date,
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

def observation(request):
    template = loader.get_template('hnfp/observation.html')
    all_observation = []
    get_obs = Observation.get_user_observations(request.user.username)
    for x in get_obs:
        dic = x.to_dict()
        all_observation.append(dic)
    context = {
        'title': 'My Hunt, Gather, Observe Map',
        'year': '2017',
        'user_observations': json.dumps(all_observation),
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

        new_obs = Observation(
            observation_location=observation_location,
            category=observation_category,
            observation_type=observation_type,
            observation_date=observation_date,
            observation_time=observation_time,
            observation_tally=observation_tally,
            comments=comments,
            observer_username=request.user.username
        );
        new_obs.save()
        all_observation = [x.to_dict() for x in Observation.objects.filter(observer_username=request.user.username)]
        return JsonResponse(all_observation, safe=False)

class ObservationUpdate(UpdateView):
    model = Observation
    fields = ['category', 'customcategory', 'observation_type', 'observation_date', 'observation_time', 'observation_tally', 'observation_location', 'comments']
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
def landuse(request):
    template = loader.get_template('hnfp/landuse/page.html')
    # get all alerts
    all_alerts = [x.to_dict() for x in Alert.objects.all()]
    # get all observations
    all_observation = [x.to_dict() for x in Observation.objects.all()]
    # get all projects for user and public published
    all_user_projects = [x.to_dict() for x in LandUseProject.objects.filter(username=request.user.username)]
    all_public_projects = [x.to_dict() for x in LandUseProject.objects.filter(published=True)]
    context = {
        'title': 'Land Use Map',
        'alerts': json.dumps(all_alerts),
        'user_observations': json.dumps(all_observation),
        'all_projects': json.dumps(all_user_projects),
        'all_public_projects': json.dumps(all_public_projects),
    }
    return HttpResponse(template.render(context, request))

def new_project(request):
    template = loader.get_template('hnfp/landuse/new_project.html')
    cats = LandUseProject.get_categories()
    resources = Resource.get_resources()
    impactTypes = ImpactType.get_impact_types()
    context = {
        'proj_cats': cats,
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
    template_name_suffix = '_update'

class LanduseDelete(DeleteView):
    model = LandUseProject
    success_url = reverse_lazy('landuse')
    template_name_suffix = '_confirm_delete'

### offline
from django.views.decorators.cache import never_cache
@never_cache
# service worker
def sw(request, js):
    from marineplanner.settings import BASE_DIR
    import os
    service_worker = os.path.join(BASE_DIR, '..', 'apps', 'hnfp', 'hnfp', 'templates', 'sw.js')
    data = open(service_worker, 'rb')
    return HttpResponse(data, content_type='application/x-javascript', status=200)
# app manifest
def manifest(request, js):
    from marineplanner.settings import BASE_DIR
    import os
    manifest_file = os.path.join(BASE_DIR, '..', 'apps', 'hnfp', 'hnfp', 'templates', 'manifest.json')
    # manifest_file = '/usr/local/apps/marineplanner-core/apps/hnfp/hnfp/templates/manifest.json'
    data = open(manifest_file, 'rb')
    return HttpResponse(data, content_type='application/json', status=200)
