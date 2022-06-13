from rest_framework import serializers

from address.models import Country, State, City
from customer.models import Address
from django.contrib.auth import get_user_model

User = get_user_model()


class AddressSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='address-crud')

    class Meta:
        model = Address
        fields = ('pk', 'title', 'customer', 'url', 'created', 'city', 'state', 'country', 'updated')
        read_only_fields = ('customer', 'created', 'updated')


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = '__all__'


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'
