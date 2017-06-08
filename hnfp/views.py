from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.template import loader

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

def survey(request):
    template = loader.get_template('hnfp/land_use_survey.html')
    context = {
        'page': 'survey',
    }
    return HttpResponse(template.render(context, request))
