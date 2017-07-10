from django.shortcuts import render, get_object_or_404, redirect, HttpResponse, render_to_response, HttpResponseRedirect
from django.contrib.sessions.models import Session
from django.conf import settings
from django.contrib.auth import get_user_model
# Create your views here.
from django.http import HttpResponse
from django.template import loader

from django.core.urlresolvers import reverse
from django.contrib.auth import get_user_model, authenticate, login

from accounts.actions import apply_user_permissions, send_password_reset_email,\
    send_social_auth_provider_login_email, generate_username
from accounts.models import EmailVerification, UserData, PasswordDictionary
from accounts.forms import SignUpForm, ForgotPasswordForm,\
    ResetPasswordForm, SocialAccountConfirmForm, LogInForm, UserDetailForm, \
    ChangePasswordForm
from accounts.signals import user_post_save
from nursery.view_helpers import decorate_view


from accounts.widgets import BSLeftIconTextInput, BSLeftIconPasswordInput,\
    BSLeftIconEmailInput
from django.core.exceptions import ValidationError
from captcha.fields import ReCaptchaField

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
        real_name = request.POST['real_name']
        preferred_name = request.POST['preferred_name']
        email = request.POST['email']
        password = request.POST['password']
        username = generate_username(email)

        user, created = get_user_model().objects.get_or_create(username=username)
        if not created:
            return render(request, 'accounts/registration_error.html')

        user.is_active = True
        user.set_password(password)
        user.email = email
        user.save()

        user.userdata.real_name = real_name
        user.userdata.preferred_name = preferred_name
        user.userdata.save()

        login(request, user)

        apply_user_permissions(user)

        return HttpResponse(user, content_type="application/json")
    else:
        template = loader.get_template('hnfp/land_use_survey.html')
        context = {
            'page': 'survey fail',
        }
        return HttpResponse(template.render(context, request))

def survey(request):
    template = loader.get_template('hnfp/land_use_survey.html')
    context = {
        'page': 'survey',
    }
    return HttpResponse(template.render(context, request))

def registered(request):
    template = loader.get_template('hnfp/welcome_steward.html')
    context = {
        'title': 'Congratulations!',
        'subtitle': 'You are now a Hoonah Steward',
    }
    return HttpResponse(template.render(context, request))

def dashboard(request):
    template = loader.get_template('hnfp/dashboard.html')
    context = {
        'title': '',
    }
    return HttpResponse(template.render(context, request))

def alert(request, alert_id):
    return HttpResponse("You're looking at alert %s." % alert_id)

def observations(request):
    template = loader.get_template('hnfp/observations.html')
    context = {
        'title': 'My Hunt, Gather, Observe Map',
        'year': '2017',
    }
    return HttpResponse(template.render(context, request))

def new_observation(request):
    template = loader.get_template('hnfp/new_observation.html')
    context = {}
    return HttpResponse(template.render(context, request))

def sw_js(request, js):
    template = get_template('sw.js')
    html = template.render()
    return HttpResponse(html, content_type="application/x-javascript")
