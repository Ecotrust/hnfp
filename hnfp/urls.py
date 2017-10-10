from django.conf.urls import url, include
from django.views.generic import ListView, DateDetailView
from . import views
from hnfp.models import Post, AOI
from features.views import form_resources
from hnfp.views import ObservationUpdate

import django.contrib.gis.forms.widgets
django.contrib.gis.forms.widgets.OpenLayersWidget.Media.js = (
    'static/hnfp/js/openlayers/ol.js'
)

django.contrib.gis.forms.widgets.OSMWidget.Media.js = (
    'static/hnfp/js/openlayers/ol.js'
)

urlpatterns = [
    url(r'^home/', views.home, name='home'),
    url(r'^sw(.*.js)$', views.sw, name='sw'),
    url(r'^manifest(.*.json)$', views.manifest, name='manifest'),
    url(r'^survey/$', views.survey, name='survey'),
    url(r'^save_survey/$', views.save_survey, name='save_survey'),
    url(r'^login/', views.login, name='login'),
    url(r'^myaccount/?', views.myaccount, name='myaccount'),
    url(r'^registering/', views.registering, name='registering'),
    url(r'^registered/', views.registered, name='registered'),
    url(r'^dashboard/', views.dashboard, name='dashboard'),
    url(r'^alert/$', views.alert, name='alert'),
    url(r'^alert/(?P<alert_id>[0-9]+)/', views.alert_detail, name='alert_detail'),
    url(r'^alert/new/', views.new_alert, name='new_alert'),
    url(r'^alert/create/', views.alert_create, name='alert_create'),
    url(r'^observation/$', views.observation, name='observation'),
    url(r'^observation/(?P<pk>[0-9]+)/update/', ObservationUpdate.as_view(), name='observation_update'),
    url(r'^observation/(?P<observation_id>[0-9]+)/$', views.observation_detail, name='observation_detail'),
    url(r'^observation/new/', views.new_observation, name='new_observation'),
    url(r'^observation/create/', views.observation_create, name='observation_create'),
    url(r'^job/$', views.job, name='job'),
    url(r'^jobopportunity/(?P<job_id>[0-9]+)/', views.job_detail, name='job_detail'),
    url(r'^forum/$', ListView.as_view(model=Post, paginate_by=3), name='post-list'),
    url(r'^forum/(?P<year>\d{4})/(?P<month>\w{3})/(?P<day>\d{2})/(?P<slug>[-\w]+)/$', DateDetailView.as_view(date_field="publish", model=Post), name='post-detail'),
    url(r'^landuse/$', views.landuse, name='landuse'),
    url(r'^landuse/new/', views.new_project, name='new_project'),
    url(r'^landuse/create/', views.project_create, name='project_create'),
    url(r'^', views.home, name='index'),
]
