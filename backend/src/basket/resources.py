import json
import uuid

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from django.core.cache import cache

from basket.models import Basket, BasketItems
from basket.serializers import BasketSerializer, BasketItemsSerializer
from product.models import Product


class CheckoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        customer = request.user
        basket = Basket.objects.filter(customer_id=customer.pk, ordered=False).first()

        queryset = BasketItems.objects.filter(customer=customer, basket=basket)
        serializer = BasketItemsSerializer(queryset, many=True, context={'request': request})

        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data
        customer = request.user
        basket, _ = Basket.objects.get_or_create(customer=customer, ordered=False)

        BasketItems.objects.filter(customer=customer, basket=basket).delete()

        total = 0
        for item in data:
            product = Product.objects.get(pk=item.get('id'))
            quantity = item.get('quantity') or item.get('qty')
            price = product.price * quantity
            basket_item = BasketItems(
                customer=customer,
                basket=basket,
                product=product,
                price=product.price,
                total=price,
                quantity=quantity
            )
            basket_item.save()
            total += price

        basket.total = total
        basket.save()

        queryset = BasketItems.objects.filter(basket=basket)
        serializer = BasketItemsSerializer(queryset, many=True, context={'request': request})

        return Response(serializer.data)

    def put(self, request):
        data = request.data
        customer = request.user
        basket_item = BasketItems.objects.get(customer=customer, pk=data.get('id'))
        quantity = data.get('qty')
        basket_item.quantity += quantity
        basket_item.save()
        serializer = BasketItemsSerializer(basket_item, context={'request': request})
        return Response(serializer.data)

    def delete(self, request):
        data = request.data
        customer = request.user
        basket_item = BasketItems.objects.get(customer=customer, pk=data.get('id'))
        basket_item.delete()

        basket = Basket.objects.filter(customer=customer, ordered=False).first()
        queryset = BasketItems.objects.filter(customer=customer, basket=basket)
        serializer = BasketItemsSerializer(queryset, many=True, context={'request': request})

        return Response(serializer.data)
