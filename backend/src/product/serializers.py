from django.conf import settings
from django.utils.text import slugify
from rest_framework import serializers
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer

from product.documents import ProductDocument
from product.models import Product

DEFAULT_CURRENCY = getattr(settings, 'DEFAULT_CURRENCY', None)
DEFAULT_CURRENCY_PREFIX = getattr(settings, 'DEFAULT_CURRENCY_PREFIX', None)


class ProductSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api-product-read", lookup_field="pk")
    slug = serializers.SerializerMethodField()
    price = serializers.DecimalField(max_digits=18, decimal_places=2)
    currency = serializers.SerializerMethodField()
    currency_prefix = serializers.SerializerMethodField()

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

    def get_currency_prefix(self, obj):
        return DEFAULT_CURRENCY_PREFIX


class ProductDocumentSerializer(DocumentSerializer):
    class Meta:
        document = ProductDocument
        fields = '__all__'
