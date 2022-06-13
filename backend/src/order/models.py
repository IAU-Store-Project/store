from django.db import models
from django.contrib.auth import get_user_model

from basket.models import Basket
from base.models import BaseModel
from product.models import Product

User = get_user_model()


class Order(BaseModel):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    basket = models.ForeignKey(Basket, on_delete=models.CASCADE)
    amount = models.FloatField(default=0)
    is_paid = models.BooleanField(default=False)


class OrderItems(BaseModel):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='order_items')
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    # product = models.ForeignKey(Product, on_delete=models.CASCADE)
