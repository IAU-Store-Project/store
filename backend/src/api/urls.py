from django.urls import path, include
from rest_framework.authtoken import views


urlpatterns = [
    path('categories/', include('api.category.urls')),
    path('auth/', views.obtain_auth_token)
]
