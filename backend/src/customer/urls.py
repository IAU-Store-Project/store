from django.urls import path

from customer.views import CustomerListView, CustomerDetailView

urlpatterns = [
    path('', CustomerListView.as_view(), name="customers"),
    # path('create', BrandCreateView.as_view(), name="brand-create"),
    path('<int:pk>/', CustomerDetailView.as_view(), name="customer-detail"),
    # path('<int:pk>/update', BrandUpdateView.as_view(), name="brand-edit"),
    # path('<int:pk>/delete', BrandDeleteView.as_view(), name="brand-delete"),
    # path('<int:pk>/status/<str:uri>', BrandStatusView.as_view(), name="brand-status"),
]
