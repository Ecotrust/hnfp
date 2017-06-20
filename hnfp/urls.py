from django.conf.urls import url, include

from . import views

urlpatterns = [
    url(r'^home', views.home),
    url(r'^survey', views.survey),
    url(r'^registered', views.registered),
    url(r'^dashboard', views.dashboard),
    url(r'^observations', views.observations),
    url(r'^', views.index, name='index'),
]
