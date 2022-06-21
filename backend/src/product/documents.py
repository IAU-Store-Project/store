from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from product.models import Product


@registry.register_document
class ProductDocument(Document):
    pk = fields.IntegerField()
    brand = fields.ObjectField(
        attr='brand',
        properties={
            'id': fields.IntegerField(),
            'name': fields.TextField(
                attr='title',
                fields={
                    'raw': fields.KeywordField(),
                }
            ),
            'is_active': fields.BooleanField()
        }
    )
    title = fields.TextField(
        attr='title',
        fields={
            'raw': fields.TextField(),
            'suggest': fields.CompletionField(),
        }
    )
    sku = fields.TextField()
    price = fields.FloatField()
    stock = fields.TextField()
    unit = fields.TextField()
    img = fields.TextField(attr='img.url')

    class Index:
        name = 'products'

    class Django:
        model = Product
