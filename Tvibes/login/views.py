from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
# from Tvibes import settings
# from django.core.mail import send_mail, EmailMessage
# from django.contrib.sites.shortcuts import get_current_site
# from django.template.loader import render_to_string
# from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from django.utils.encoding import force_bytes, force_str
# from . tokens import generate_token

# Create your views here.

def home(request):
    return render(request, "login/index.html")

def createaccount(request):

    if request.method == 'POST':
        username = request.POST['username']
        fname = request.POST['fname']
        lname = request.POST['lname']
        email = request.POST['email']
        password1 = request.POST['password1']
        password2 = request.POST['password2']

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
            return redirect('home')

        if not username.isalnum():
            messages.error(request, 'Username must be Alpha-Numeric')
            return redirect('home')

        myuser = User.objects.create_user(username, email, password1)
        myuser.first_name = fname
        myuser.last_name = lname
        # myuser.is_active = False

        myuser.save()

        messages.success(request, "Your account has been successfully created.")
        
         # Welcome email

        # subject = 'Welcome to T-Vibes!'
        # message = 'Hello' + myuser.first_name + '!! n/' + 'Welcome to T-Vibes n/ Thank you for choosing us.n/ We have also sent you a confirmation email, please confirm your email address in order to activate your account!.n/n/ Thank you!'
        # from_email = settings.EMAIL_HOST_USER
        # to_list = [myuser.email]
        # send_mail(subject, message, from_email, to_list, fail_silently=True)


        #Email address confirmation email
        # current_site = get_current_site(request)
        # email_subject = "Confirm your email @tvibes23"
        # message2 = render_to_string('email_confirmation.html', { 
        #     'name': myuser.first_name,
        #     'domain': current_site.domain,
        #     'uid': urlsafe_base64_encode(force_bytes(myuser.pk)),
        #     'token': generate_token.make_token(myuser),
        #     'protocol': 'htpps' if request.is_secure() else 'htpp'

        # })
        # email = EmailMessage(
        #     email_subject,
        #     message2,
        #     settings.EMAIL_HOST_USER,
        #     [myuser.email],

        # )
        # email.fail_silently = True
        # email.send()
        


        return redirect('signin')
        # r = requests.get(url, timeout=20)





    return render(request, "login/createaccount.html")

def signin(request):

    if request.method == 'POST':
        username = request.POST['username']
        password1 = request.POST['password1'] 

        user = authenticate(username=username, password=password1)

        if user is not None:
            login(request, user)
            fname = user.first_name
            return render(request, "login/index.html", {'fname': fname})

        else:
            messages.error(request, "Bad connection")
            return redirect('home')
            
    return render(request, "login/signin.html")

def signout(request):
    logout(request)
    messages.success(request, "Logged out Successfully")
    return redirect('home')


# def activate(request, uidb64, token):
#     try:
#         uid = force_str(urlsafe_base64_decode(uidb64))
#         myuser = User.objects.get(pk=uid)
#     except(TypeError, ValueError, OverflowError, User.DoesNotExist):
#         myuser = None

#     if myuser is not None and generate_token.check_token(myuser, token):
#         myuser.is_active = True
#         myuser.save()
#         login(request, myuser)

#         return redirect('home')

#     else:
#         return render(request, 'activation_failed.html')