from django.conf.urls import url, include
from django.views.generic import ListView, DateDetailView
from . import views
from hnfp.models import Post

urlpatterns = [
    url(r'^home/', views.home, name='home'),
    url(r'^survey/', views.survey, name='survey'),
    url(r'^login/', views.login, name='login'),
    url(r'^registering/', views.registering, name='registering'),
    url(r'^registered/', views.registered, name='registered'),
    url(r'^dashboard/', views.dashboard, name='dashboard'),
    url(r'^alert/$', views.alert, name='alert'),
    url(r'^alert/(?P<alert_id>[0-9]+)/', views.alert_detail, name='alert_detail'),
    url(r'^observation/$', views.observation, name='observation'),
    url(r'^observation/new/', views.new_observation, name='new_observation'),
    url(r'^job/$', views.job, name='job'),
    url(r'^jobopportunity/(?P<job_id>[0-9]+)/', views.job_detail, name='job_detail'),
    url(r'^observation/(?P<observation_id>[0-9]+)/', views.observation_detail, name='observation_detail'),
    url(r'^forum/$', ListView.as_view(model=Post, paginate_by=3), name='post-list'),
    url(r'^forum/(?P<year>\d{4})/(?P<month>\w{3})/(?P<day>\d{2})/(?P<slug>[-\w]+)/$', DateDetailView.as_view(date_field="publish", model=Post), name='post-detail'),
    url(r'^sw(.*.js)$', views.sw_js, name='sw_js'),
    url(r'^', views.home, name='index'),
]
