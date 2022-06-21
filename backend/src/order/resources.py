from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from basket.models import Basket, BasketItems
from order.models import Order
from order.serializers import OrderSerializer
from base.api.paginations import StandardResultsSetPagination


# class OrderListAPIView(ListAPIView):
#     model = Order
#     serializer_class = OrderSerializer
#     permission_classes = [IsAuthenticated]
#
#     def get_queryset(self):
#         return Order.objects.filter(customer=self.request.user).order_by('-pk')


class OrderAPIView(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    def get(self, request):
        customer = request.user
        queryset = Order.objects.filter(customer=customer)
        serializer = OrderSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        customer = request.user

        order, _ = Order.objects.update_or_create(
            customer=customer,
            basket_id=data.get('basket'),
            is_paid=False
        )

        basket = Basket.objects.filter(pk=int(data.get('basket'))).first()
        basket_items = BasketItems.objects.filter(customer=customer, basket=basket)

        for item in basket_items:
            print("item", item)

        serializer = OrderSerializer(order, context={'request': request})
        return Response(serializer.data)
