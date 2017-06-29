from django.conf.urls import url, include

from . import views

urlpatterns = [
    url(r'^home/', views.home, name='home'),
    url(r'^survey/', views.survey, name='survey'),
    url(r'^registered/', views.registered, name='registered'),
    url(r'^dashboard/', views.dashboard, name='dashboard'),
    url(r'^observations/', views.observations, name='observations'),
    url(r'^new_observation/', views.new_observation, name='new_observation'),
    url(r'^', views.home, name='index'),
]
