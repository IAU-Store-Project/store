from django.conf import settings
from django.utils.text import slugify
from rest_framework import serializers

from product.models import Product

DEFAULT_CURRENCY = getattr(settings, 'DEFAULT_CURRENCY', None)


class ProductSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api-product-read", lookup_field="pk")
    slug = serializers.SerializerMethodField()
    price = serializers.DecimalField(max_digits=18, decimal_places=2)
    currency = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['currency']
        depth = 1

    def get_slug(self, obj):
        title = slugify(obj.title)
        title = '-'.join([x.capitalize() for x in title.split('-')])
        return title

    def get_currency(self, obj):
        return DEFAULT_CURRENCY
