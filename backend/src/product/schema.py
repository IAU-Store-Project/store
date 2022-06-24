import graphene
from graphene_django import DjangoObjectType

from category.models import Category
from brand.models import Brand
from product.models import Product


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = '__all__'


class BrandType(DjangoObjectType):
    class Meta:
        model = Brand
        fields = '__all__'


class ProductType(DjangoObjectType):
    class Meta:
        model = Product
        fields = '__all__'


class ProductQuery(graphene.ObjectType):
    products = graphene.List(ProductType)
    product_by_id = graphene.Field(ProductType, id=graphene.String())

    def resolve_products(root, info, **kwargs):
        return Product.objects.all()

    def resolve_product_by_id(root, info, id):
        return Product.objects.get(pk=id)
