from django.urls import path

from order.resources import OrderListAPIView

urlpatterns = [
    path('', OrderListAPIView.as_view(), name='api-orders'),
]
