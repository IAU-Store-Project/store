from django.urls import path, include

from product.views.product import (
    ProductCreateView,
    ProductUpdateView,
    ProductDeleteView,
    ProductListView,
    ProductDetailView
)

urlpatterns = [
    path('', ProductListView.as_view(), name="product-list"),
    path('create/', ProductCreateView.as_view(), name="product-create"),
    path('read/<int:pk>/', ProductDetailView.as_view(), name="product-detail"),
    path('update/<int:pk>/', ProductUpdateView.as_view(), name="product-edit"),
    path('delete/<int:pk>/', ProductDeleteView.as_view(), name="product-delete"),
    path('brands/', include('brand.urls')),
    path('categories/', include('category.urls')),
]
