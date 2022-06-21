from django.urls import path

from order.resources import OrderAPIView

urlpatterns = [
    path('', OrderAPIView.as_view(), name='api-orders'),
]
