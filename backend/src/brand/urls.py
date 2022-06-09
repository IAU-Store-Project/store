from django.urls import path

from brand.views import *

urlpatterns = [
    path('', BrandListView.as_view(), name="brand-list"),
    path('create', BrandCreateView.as_view(), name="brand-create"),
    path('<int:pk>/', BrandDetailView.as_view(), name="brand-detail"),
    path('<int:pk>/update', BrandUpdateView.as_view(), name="brand-edit"),
    path('<int:pk>/delete', BrandDeleteView.as_view(), name="brand-delete"),
    path('<int:pk>/status/<str:uri>', BrandStatusView.as_view(), name="brand-status"),
]
