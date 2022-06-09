from django.urls import path

from customer.address.resources import AddressListCreateAPIView, AddressRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', AddressListCreateAPIView.as_view(), name='api-addresses'),
    path('<int:pk>', AddressRetrieveUpdateDestroyAPIView.as_view(), name='address-crud'),
]
