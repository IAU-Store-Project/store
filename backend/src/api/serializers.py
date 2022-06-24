from rest_framework import serializers


class PaySerializer(serializers.Serializer):
    success = serializers.BooleanField()
    basket = serializers.IntegerField()
    order = serializers.IntegerField()
    data = serializers.JSONField(required=False)
    error = serializers.CharField(required=False)
