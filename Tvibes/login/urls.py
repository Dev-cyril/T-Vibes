from django.urls import path, include
from . import views
from django.contrib import admin


urlpatterns = [
    path('', views.home, name="home"),
    path('createaccount', views.createaccount, name="createaccount"),
    path('login', views.login, name="login"),
    path('logout', views.logout, name="logout"),
]