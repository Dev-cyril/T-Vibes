from django.urls import path, include
from . import views
from django.contrib import admin


urlpatterns = [
    path('', views.home, name="home"),
    path('createaccount.html', views.createaccount, name="createaccount"),
    path('signin.html', views.signin, name="signin"),
    path('signout.html', views.signout, name="signout"),
    # path('activate/<uidb64>/<token>', views.activate, name="activate"),
]