from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from category.models import Category


@registry.register_document
class CategoryDocument(Document):
    id = fields.IntegerField()

    class Index:
        name = 'categories'
        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0,
        }

    class Django:
        model = Category
        fields = [
            'name',
            'slug',
        ]
