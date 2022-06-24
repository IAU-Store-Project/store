from django.urls import path

from order.views import (
    OrderListView,
    OrderDetailView
)

urlpatterns = [
    path('', OrderListView.as_view(), name="order-list"),
    # path('create/', ProductCreateView.as_view(), name="product-create"),
    path('read/<int:pk>/', OrderDetailView.as_view(), name="order-detail"),
    # path('update/<int:pk>/', ProductUpdateView.as_view(), name="product-edit"),
    # path('delete/<int:pk>/', ProductDeleteView.as_view(), name="product-delete")
]
