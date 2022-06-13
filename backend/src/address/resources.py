from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated

from address.models import Country, State, City
from base.permissions import IsCustomerOwner
from address.serializers import AddressSerializer, CountrySerializer, StateSerializer, CitySerializer
from customer.models import Address


class AddressListCreateAPIView(ListCreateAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated, IsCustomerOwner]

    def get_queryset(self):
        return Address.objects.filter(customer=self.request.user).order_by('-pk')

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(customer=self.request.user)


class AddressRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated, IsCustomerOwner]

    def get_queryset(self):
        return Address.objects.filter(customer=self.request.user)


class CountryList(ListAPIView):
    serializer_class = CountrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Country.objects.filter()


class StateList(ListAPIView):
    serializer_class = StateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return State.objects.filter(country_id=self.kwargs.get('pk'))


class CityList(ListAPIView):
    serializer_class = CitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return City.objects.filter(state_id=self.kwargs.get('pk'))
