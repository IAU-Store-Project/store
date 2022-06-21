from django.urls import path
from rest_framework import routers

from product.resources import (
    ProductListAPIView,
    ProductRetrieveAPIView,
    ProductDocumentView
)

router = routers.SimpleRouter(trailing_slash=False)

router.register(r'search', ProductDocumentView, basename='product-search')

urlpatterns = [
    path('', ProductListAPIView.as_view(), name='api-products'),
    path('<int:pk>/', ProductRetrieveAPIView.as_view(), name='api-product-read'),
]

urlpatterns += router.urls
