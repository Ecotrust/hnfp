from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.template import loader

from django.shortcuts import render, get_object_or_404, redirect, HttpResponse, render_to_response, HttpResponseRedirect
from django.core.urlresolvers import reverse

from django.contrib.auth import authenticate, login
from accounts.actions import apply_user_permissions, send_password_reset_email,\
    send_social_auth_provider_login_email, generate_username
    
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
    if request.method == 'POST':
        if request.is_ajax():
            real_name = request.POST['real_name']
            preferred_name = request.POST['preferred_name']
            email = request.POST['email']
            password = request.POST['password']
            username = generate_username(email)

            user, created = get_user_model().objects.get_or_create(username=username)
            if not created:
                return render(request, 'accounts/registration_error.html')

            user.is_active = True
            ser.set_password(password)
            user.email = email
            user.save()

            user.userdata.real_name = real_name
            user.userdata.preferred_name = preferred_name
            user.userdata.save()

            apply_user_permissions(user)

    return get_object_or_404(username)

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
