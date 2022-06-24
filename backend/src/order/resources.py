from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from basket.models import Basket, BasketItems
from order.models import Order
from order.serializers import OrderSerializer
from base.api.paginations import StandardResultsSetPagination


class OrderAPIView(ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user, is_paid=True).order_by('-pk')
