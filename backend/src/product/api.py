from django.urls import path

from product.resources import ProductListAPIView, ProductRetrieveAPIView

urlpatterns = [
    path('', ProductListAPIView.as_view(), name='api-products'),
    path('<int:pk>/', ProductRetrieveAPIView.as_view(), name='api-product-read'),
]
