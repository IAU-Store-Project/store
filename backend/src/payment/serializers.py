from rest_framework import serializers
from payment.models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


class PaymentOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        exclude = ('extras',)
