from django.urls import path
from app.views import home, signin, signout, AboutView

urlpatterns = [
    path('', home, name='home'),
    path('signin', signin, name='signin'),
    path('signout', signout, name='signout'),
    path('about', AboutView.as_view(), name='about'),
]
