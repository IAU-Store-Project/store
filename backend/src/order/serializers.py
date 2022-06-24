from rest_framework import serializers

from basket.serializers import BasketSerializer
from order.models import Order
from payment.serializers import PaymentOrderSerializer


class OrderSerializer(serializers.ModelSerializer):
    basket = BasketSerializer()
    payment = PaymentOrderSerializer()
    status_text = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['status_text']

    def get_status_text(self, obj):
        print(obj.status_text())
        return obj.status_text()
