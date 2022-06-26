from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from product.models import Product
from django.utils.text import slugify
from django.conf import settings

DEBUG = getattr(settings, 'DEBUG', None)


@registry.register_document
class ProductDocument(Document):
    id = fields.IntegerField()
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
    slug = fields.TextField()
    sku = fields.TextField()
    price = fields.FloatField()
    stock = fields.TextField()
    unit = fields.TextField()
    img = fields.FileField()

    def prepare_img(self, instance):
        if DEBUG == True:
            return "{}{}".format(
                'http://127.0.0.1:8000',
                instance.img.url if instance.img else ''
            )

        return instance.img.url if instance.img else ''

    def prepare_slug(self, instance):
        title = slugify(instance.title)
        title = '-'.join([x.capitalize() for x in title.split('-')])
        return title

    class Index:
        name = 'products'

    class Django:
        model = Product
