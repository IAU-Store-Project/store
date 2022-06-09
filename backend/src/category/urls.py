from django.urls import path
from category.views import (
    CategoryListView,
    CategoryCreateView,
    CategoryDetailView,
    CategoryUpdateView,
    CategoryDeleteView,
    CategoryStatusRedirectView
)

urlpatterns = [
    path('', CategoryListView.as_view(), name="categories"),
    path('create', CategoryCreateView.as_view(), name="category-create"),
    path('<int:pk>/', CategoryDetailView.as_view(), name="category-detail"),
    path('<int:pk>/edit', CategoryUpdateView.as_view(), name="category-edit"),
    path('<int:pk>/delete', CategoryDeleteView.as_view(), name="category-delete"),
    path('<int:pk>/status/<str:uri>', CategoryStatusRedirectView.as_view(), name="category-status"),
]
