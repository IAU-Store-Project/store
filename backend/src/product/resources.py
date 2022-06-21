from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter, OrderingFilter
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django_elasticsearch_dsl_drf.constants import SUGGESTER_COMPLETION
from django_elasticsearch_dsl_drf.filter_backends import (
    SearchFilterBackend,
    FilteringFilterBackend,
    SuggesterFilterBackend
)

from product.documents import ProductDocument
from product.models import Product
from product.serializers import ProductSerializer, ProductDocumentSerializer
from base.api.paginations import StandardResultsSetPagination


class ProductListAPIView(ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['title', 'brand']
    ordering_fields = ['pk', 'title', 'brand', 'category']
    pagination_class = StandardResultsSetPagination


class ProductRetrieveAPIView(RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'pk'


class ProductDocumentView(DocumentViewSet):
    document = ProductDocument
    serializer_class = ProductDocumentSerializer

    filter_backends = [
        FilteringFilterBackend,
        SearchFilterBackend,
        SuggesterFilterBackend
    ]

    search_fields = (
        'title',
    )

    filter_fields = {
        'brand': 'brand.id'
    }

    suggester_fields = {
        'title': {
            'field': 'title.suggest',
            'suggesters': [
                SUGGESTER_COMPLETION,
            ],
        },
    }
