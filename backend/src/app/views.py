#from django.shortcuts import render



# Create your views here.


from django.http import HttpResponse
import datetime


def home(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now {0}.</body></html>".format(now)
    return HttpResponse(html)
