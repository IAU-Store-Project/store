"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from django.views.generic import RedirectView


admin.site.site_header = 'Store Administrator'
admin.site.index_title = 'Management'
admin.site.site_title = 'Store Management'


def trigger_error(request):
    division_by_zero = 1 / 0


urlpatterns = [
    path('', RedirectView.as_view(pattern_name='home')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('api.urls')),
    path('admin/', admin.site.urls),
    path('app/', include('app.urls')),
    path('app/product/', include('product.urls')),
    path('app/customers/', include('customer.urls')),
    path('sentry-debug/', trigger_error),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
