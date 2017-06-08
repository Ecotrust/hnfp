from django.conf.urls import url, include

from . import views

urlpatterns = [
    url(r'^home/', views.home),
    url(r'^', views.index, name='index'),
]
