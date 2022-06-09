from rest_framework import serializers

from customer.models import Address
from django.contrib.auth import get_user_model

User = get_user_model()


class AddressSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='address-crud')

    class Meta:
        model = Address
        fields = ('pk', 'title', 'customer', 'url', 'created', 'updated')
        read_only_fields = ('customer', 'created', 'updated')
