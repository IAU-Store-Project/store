from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.contrib import messages
from django.views import View
from django.http import HttpResponse

from product.models import Product
from django.conf import settings

User = get_user_model()


@login_required
def home(request):
    session_key = request.COOKIES[settings.SESSION_COOKIE_NAME]
    print("session_key", session_key)
    print("request.session.session_key", request.session.session_key)

    accounts_count = User.objects.filter(
        is_staff=False,
        is_superuser=False,
        is_active=True
    ).count()

    products_count = Product.objects.filter().count()

    context = {
        "title": "Dashboard",
        "accounts_count": accounts_count,
        "products_count": products_count,
    }

    return render(request, 'home.html', context=context)


def signin(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            User.objects.get(email=email)
        except User.DoesNotExist:
            messages.error(request, "Kullanıcı adı veya şifre hatalı!")
            return redirect('signin')

        user = authenticate(request, email=email, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect('home')
            else:
                messages.error(request, "Kullanıcı aktif değil!")
                return redirect('signin')
        else:
            messages.error(request, "Kullanıcı adı veya şifre hatalı!")
            return redirect('signin')

    context = {"title": "signin"}
    print("post", request.POST)
    return render(request, 'signin.html', context=context)


@login_required
def signout(request):
    logout(request)
    return redirect('signin')


class AboutView(View):
    greeting = "Selam"

    def get(self, request):
        return HttpResponse(self.greeting)
