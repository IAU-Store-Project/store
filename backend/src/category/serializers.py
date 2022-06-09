from rest_framework import serializers

from category.models import Category


class CategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="category-api-crud")

    class Meta:
        model = Category
        fields = '__all__'
