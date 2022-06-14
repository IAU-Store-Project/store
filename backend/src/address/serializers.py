from rest_framework import serializers

from address.models import Country, State, City
from customer.models import Address
from django.contrib.auth import get_user_model

User = get_user_model()


class AddressSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='address-crud')
    country_name = serializers.SerializerMethodField()
    state_name = serializers.SerializerMethodField()
    city_name = serializers.SerializerMethodField()

    def get_city_name(self, obj):
        return obj.city.name

    def get_state_name(self, obj):
        return obj.state.name

    def get_country_name(self, obj):
        return obj.country.name

    class Meta:
        model = Address
        fields = (
            'pk', 'title', 'customer', 'address', 'city', 'city_name', 'state', 'state_name',
            'country', 'country_name', 'url', 'created', 'updated'
        )
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
