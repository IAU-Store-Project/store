from django.urls import path
from api.category.resources import (
    CategoryListCreateAPIView,
    CategoryRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path('', CategoryListCreateAPIView.as_view(), name='category-api-list'),
    path('<int:pk>/', CategoryRetrieveUpdateDestroyAPIView.as_view(), name='category-api-crud'),
]
