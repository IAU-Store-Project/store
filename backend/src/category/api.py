from django.urls import path

from category.resources import (
    CategoryListAPIView,
    CategoryRetrieveAPIView
)

urlpatterns = [
    path('', CategoryListAPIView.as_view(), name='api-categories'),
    path('<int:pk>/', CategoryRetrieveAPIView.as_view(), name='category-api-crud'),
]
