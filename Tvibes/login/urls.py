from django.urls import path, include
from . import views
from django.contrib import admin


urlpatterns = [
    path('', views.home, name="home"),
    path('createaccount.html', views.createaccount, name="createaccount"),
    path('login.html', views.login, name="login"),
    path('signout.html', views.signout, name="signout"),
]