from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from Tvibes import settings
from django.core.mail import send_mail

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

        if User.objects.filter(username=username):
            messages.error(request, 'username already exist! please try other username')
            return redirect('home')

        if User.objects.filter(email=email):
            messages.error(request, 'Email already registered')
            return redirect('home')

        if len(username)>10:
            messages.error(request, 'Username must be under 10 characters')
            # return redirect('home')

        if password1 != password2:
            messages.error(request, 'Passwords did not match')
            # return redirect('home')

        if not username.isalnum():
            messages.error(request, 'Username must be Alpha-Numeric')
            return redirect('home')

        myuser = User.objects.create_user(username, email, password1)
        myuser.first_name = fname
        myuser.last_name = lname

        myuser.save()

        messages.success(request, "Your account has been successfully created, we have sent you a confirmation email, please check and activate your account.")

        # Welcome email

        subject = 'Welcome to T-Vibes!'
        message = 'Hello' + myuser.first_name + '!! n/' + 'Welcome to T-Vibes n/ Thank you for choosing us.n/ We have also sent you a confirmation email, please confirm your email address in order to activate your account!.n/n/ Thank you!'
        from_email = settings.EMAIL_HOST_USER
        to_list = [myuser.email]
        send_mail(subject, message, from_email, to_list, fail_silently=True)

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