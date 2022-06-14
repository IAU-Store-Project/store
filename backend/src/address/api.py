from django.urls import path

from address.resources import (
    AddressListCreateAPIView,
    AddressRetrieveUpdateDestroyAPIView,
    CountryList,
    StateList,
    CityList
)

urlpatterns = [
    path('', AddressListCreateAPIView.as_view(), name='api-addresses'),
    path('<int:pk>', AddressRetrieveUpdateDestroyAPIView.as_view(), name='address-crud'),
    path('countries/', CountryList.as_view(), name='countries'),
    path('<int:pk>/states/', StateList.as_view(), name='states'),
    path('<int:pk>/cities/', CityList.as_view(), name='cities'),
]
