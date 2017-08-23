from django.shortcuts import render, get_object_or_404, redirect, HttpResponse, render_to_response, HttpResponseRedirect
from django.contrib.sessions.models import Session
from django.conf import settings
# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.template import loader, RequestContext

from django.db import models
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.contrib.auth import get_user_model, authenticate, login

# Accouts
from accounts.actions import apply_user_permissions, send_password_reset_email, send_social_auth_provider_login_email, generate_username
from accounts.models import EmailVerification, UserData, PasswordDictionary
from accounts.forms import SignUpForm, ForgotPasswordForm, ResetPasswordForm, SocialAccountConfirmForm, LogInForm, UserDetailForm, ChangePasswordForm
from accounts.signals import user_post_save
from nursery.view_helpers import decorate_view

from accounts.widgets import BSLeftIconTextInput, BSLeftIconPasswordInput, BSLeftIconEmailInput
from django.core.exceptions import ValidationError
from captcha.fields import ReCaptchaField

# survey
from hnfp.models import Question, Survey, Category, PublicManager
from hnfp.forms import ResponseForm
# observation
from hnfp.models import Observation
from django.contrib.gis.geos import Point
#forum
from hnfp.models import Post
#jobs
from hnfp.models import JobOpportunity
import json

### VIEWS ###
def index(request):
    template = loader.get_template('hnfp/index.html')
    context = {
        'title': 'HNFP',
    }
    return HttpResponse(template.render(context, request))

def home(request):
    template = loader.get_template('hnfp/home.html')
    context = {
        'page': 'home',
        'tagline': 'community + environment + economy',
        'cta':'Become a steward',
    }
    return HttpResponse(template.render(context, request))

def registering(request):
    User = get_user_model()

    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        password = request.POST['password']
        username = email

        if get_user_model().objects.filter(username=username).exists():
            return render(request, 'accounts/registration_error.html')

        user, created = get_user_model().objects.get_or_create(username=username)
        if not created:
            return render(request, 'accounts/registration_error.html')

        user.is_active = True
        user.set_password(password)
        user.email = email
        user.save()

        user.userdata.real_name = first_name + last_name
        user.userdata.preferred_name = first_name + last_name
        user.userdata.save()

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            apply_user_permissions(user)
            return HttpResponse(user, content_type="application/json")
        else:
            return render(request, 'accounts/login.html')
    else:
        template = loader.get_template('hnfp/land_use_survey.html')
        context = {
            'page': 'survey fail',
        }
        return HttpResponse(template.render(context, request))

def survey(request):
    template = loader.get_template('hnfp/land_use_survey.html')

    if Survey.objects.all():
        survey = Survey.objects.order_by('id')[0]
    else:
        survey = 'not yet ready'

    if request.method == 'POST':
        form = ResponseForm(request.POST, survey=survey)
        if form.is_valid():
            response = form.save()
    else:
        form = ResponseForm(survey=survey)
    context = {
        'page': 'survey',
        'response_form': form,
        'survey': survey,
    }
    return HttpResponse(template.render(context, request))

def registered(request):
    template = loader.get_template('hnfp/welcome_steward.html')
    context = {
        'title': 'Congratulations!',
        'subtitle': 'You are now a Hoonah Steward',
    }
    return HttpResponse(template.render(context, request))

def login(request):
    template = loader.get_template('hnfp/login.html')
    form = LogInForm()
    context = {
        'form': form,
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
    }
    context['jobs'] = jobs
    return HttpResponse(template.render(context, request))

def alert(request):
    template = loader.get_template('hnfp/alert.html')
    context = {
        'title': 'Alerts',
    }
    return HttpResponse(template.render(context, request))

def alert_detail(request, alert_id):
    return HttpResponse("You're looking at alert %s." % alert_id)

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

def observation_detail(request, observation_id):
    return HttpResponse("You're looking at observation %s.")

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
