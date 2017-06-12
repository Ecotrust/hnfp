from django.conf.urls import url, include

from . import views

urlpatterns = [
    url(r'^home', views.home),
    url(r'^survey', views.survey),
    url(r'^', views.index, name='index'),
]
