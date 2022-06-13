from rest_framework import serializers

from basket.models import Basket, BasketItems
from product.serializers import ProductSerializer


class BasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Basket
        fields = '__all__'


class BasketItemsSerializer(serializers.ModelSerializer):
    basket = BasketSerializer()
    product = ProductSerializer()

    class Meta:
        model = BasketItems
        fields = '__all__'

#
# class ProductItemSerializer(serializers.Serializer):
#     id = serializers.CharField(max_length=20)
#     qty = serializers.CharField(max_length=20)
#
#
# class CheckoutSerializer(serializers.Serializer):
#     products = ProductItemSerializer(required=True, many=True)
