from django.urls import path

from brand.resources import (
    BrandListAPIView,
    BrandRetrieveAPIView
)

urlpatterns = [
    path('', BrandListAPIView.as_view(), name='api-brands'),
    path('<int:pk>/', BrandRetrieveAPIView.as_view(), name='brand-api-crud'),
]
