from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from brand.models import Brand
from brand.serializers import BrandSerializer
from base.api.paginations import StandardResultsSetPagination


class BrandListAPIView(ListAPIView):
    serializer_class = BrandSerializer
    queryset = Brand.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        return self.queryset.filter(is_active=True)


class BrandRetrieveAPIView(RetrieveAPIView):
    serializer_class = BrandSerializer
    queryset = Brand.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'pk'
