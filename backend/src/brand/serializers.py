from rest_framework import serializers

from brand.models import Brand


class BrandSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="brand-api-crud", lookup_field="pk")

    class Meta:
        model = Brand
        fields = '__all__'
