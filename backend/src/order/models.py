from django.db import models
from django.contrib.auth import get_user_model

from basket.models import Basket
from base.models import BaseModel
from order.enums import ORDER_STATUS, CANCEL
from payment.models import Payment
from product.models import Product

User = get_user_model()


class Order(BaseModel):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    basket = models.ForeignKey(Basket, on_delete=models.CASCADE)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)
    amount = models.FloatField(default=0)
    is_paid = models.BooleanField(default=False)
    status = models.CharField(max_length=2, choices=ORDER_STATUS, default=CANCEL)

    def __str__(self):
        return "Order #{0}".format(self.pk)

    def status_text(self):
        status = {
            '1': 'CANCEL',
            '2': 'PENDING',
            '3': 'CONFIRMED',
            '4': 'SHIPPING',
            '5': 'COMPLETED',
        }

        print(status.get(self.status))

        return status.get(self.status)


class OrderItems(BaseModel):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='order_items')
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
