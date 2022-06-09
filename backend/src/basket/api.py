from django.urls import path

from basket.resources import BasketListCreateAPIView

urlpatterns = [
    path('', BasketListCreateAPIView.as_view(), name='api-baskets'),
]
