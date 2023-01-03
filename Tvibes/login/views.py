from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout

# Create your views here.

def home(request):
    return render(request, "login/index.html")

def createaccount(request):

    if request.method == 'POST':
        username = request.POST.get('username')
        fname = request.POST.get('fname')
        lname = request.POST.get('lname')
        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        myuser = User.objects.create_user(username, email, password1)
        myuser.first_name = fname
        myuser.last_name = lname

        myuser.save()

        messages.success(request, "Your account has been successfully created")

        return redirect('login')





    return render(request, "login/createaccount.html")

def login(request):

    if request.method == 'POST':
        username = request.POST.get('username')
        password1 = request.POST.get('password1')

        user = authenticate(username=username, password=password1)

        if user is not None:
            login(request, user)
            fname = user.first_name
            return render(request,"login/index.html", {'fname': fname})

        else:
            messages.error(request, "Bad connection")
            return redirect('home')
    return render(request, "login/login.html")

def signout(request):
    logout(request)
    messages.success(request, "Logged out Successfully")
    return redirect('home')